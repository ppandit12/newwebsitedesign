import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import {
  consultationRequestSchema,
  type ConsultationFields,
  type ConsultationResponse,
} from '../shared/consultation.js';
import { isMailConfigured, type ServerConfig } from './config.js';
import type { Mailer } from './mailer.js';

export function createApp(config: ServerConfig, mailer: Mailer | null, options: { staticDir?: string } = {}) {
  const app = express();
  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', config.trustProxy);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          // Allow an approved scheduling provider to be embedded later, if configured.
          'frame-src': ["'self'", ...(process.env.BOOKING_FRAME_ORIGINS?.split(',').filter(Boolean) ?? [])],
        },
      },
    }),
  );

  // CORS — only needed when the static site and the API are on different origins.
  app.use('/api', (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && config.allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (req.method === 'OPTIONS') return void res.sendStatus(204);
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, mailConfigured: isMailConfigured(config) });
  });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({
        ok: false,
        error: 'Too many requests. Please wait a few minutes, or call us at 804-630-1091.',
      } satisfies ConsultationResponse),
  });

  app.post('/api/consultation', limiter, express.json({ limit: '20kb' }), async (req, res) => {
    const parsed = consultationRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ConsultationFields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ConsultationFields;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return void res
        .status(400)
        .json({
          ok: false,
          error: 'Please correct the highlighted fields.',
          fieldErrors,
        } satisfies ConsultationResponse);
    }

    const data = parsed.data;

    // Spam checks. Respond with a generic success so bots learn nothing, but send no email.
    const tooFast = Date.now() - data.startedAt < config.minFillMs;
    if (data.website || tooFast) {
      console.warn(`[consultation] dropped likely spam (honeypot=${Boolean(data.website)}, tooFast=${tooFast})`);
      return void res.json({ ok: true } satisfies ConsultationResponse);
    }

    if (!mailer || !isMailConfigured(config)) {
      console.error('[consultation] email delivery is not configured (SMTP_HOST, MAIL_FROM, CONTACT_TO).');
      return void res.status(503).json({
        ok: false,
        error: 'Our online form is temporarily unavailable. Please call 804-630-1091 or email info@mynumberx.com.',
      } satisfies ConsultationResponse);
    }

    try {
      await mailer.sendConsultation(data, { ip: req.ip, userAgent: req.get('user-agent') ?? undefined });
      res.json({ ok: true } satisfies ConsultationResponse);
    } catch (err) {
      console.error('[consultation] failed to send notification:', err);
      res.status(502).json({
        ok: false,
        error: 'We could not send your request just now. Please try again, or call 804-630-1091.',
      } satisfies ConsultationResponse);
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
  });

  // Optional: serve the prerendered site from the same process.
  if (options.staticDir && fs.existsSync(options.staticDir)) {
    const dir = options.staticDir;
    app.use('/assets', express.static(path.join(dir, 'assets'), { immutable: true, maxAge: '1y', index: false }));
    app.use(express.static(dir, { extensions: ['html'], maxAge: '1h' }));
    app.use((_req, res) => {
      res.status(404).sendFile(path.join(dir, '404.html'));
    });
  }

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    // Malformed JSON, oversized bodies, etc.
    const status = typeof err === 'object' && err && 'status' in err ? Number((err as { status: number }).status) : 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ ok: false, error: status === 413 ? 'Request too large.' : 'Invalid request.' });
  });

  return app;
}
