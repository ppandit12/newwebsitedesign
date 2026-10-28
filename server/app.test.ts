import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { SMTPServer } from 'smtp-server';
import type { AddressInfo } from 'node:net';
import { createApp } from './app';
import { loadConfig, type ServerConfig } from './config';
import { createMailer } from './mailer';

/**
 * End-to-end: HTTP request → validation → Nodemailer → a real SMTP server
 * running locally, so delivery is genuinely exercised (no mocked transport).
 */
interface Received {
  from: string;
  to: string[];
  raw: string;
}
let inbox: Received[] = [];
let smtp: SMTPServer;
let smtpPort = 0;

beforeAll(async () => {
  smtp = new SMTPServer({
    authOptional: true,
    disabledCommands: ['STARTTLS'],
    logger: false,
    onData(stream, session, cb) {
      let raw = '';
      stream.on('data', (c) => (raw += c));
      stream.on('end', () => {
        inbox.push({
          from: (session.envelope.mailFrom as { address: string }).address,
          to: session.envelope.rcptTo.map((r) => r.address),
          raw,
        });
        cb();
      });
    },
  });
  await new Promise<void>((resolve) => smtp.listen(0, '127.0.0.1', resolve));
  smtpPort = (smtp.server.address() as AddressInfo).port;
});

afterAll(() => new Promise<void>((resolve) => smtp.close(() => resolve())));
beforeEach(() => {
  inbox = [];
});

function config(overrides: Record<string, string> = {}): ServerConfig {
  return loadConfig({
    NODE_ENV: 'test',
    SMTP_HOST: '127.0.0.1',
    SMTP_PORT: String(smtpPort),
    MAIL_FROM: 'NumberX Website <no-reply@mynumberx.com>',
    CONTACT_TO: 'info@mynumberx.com',
    MIN_FILL_MS: '3000',
    ...overrides,
  });
}

const appWith = (c = config()) => createApp(c, createMailer(c));

const body = (overrides: Record<string, unknown> = {}) => ({
  firstName: 'Jordan',
  lastName: 'Lee',
  email: 'jordan@example.com',
  phone: '804-555-0123',
  service: 'business-tax',
  package: 'S-Corp Tax Filing (Form 1120-S)',
  message: 'We need help with our S-Corp return this year.',
  consent: true,
  startedAt: Date.now() - 10_000,
  attribution: { landingPage: '/services/', utmSource: 'google', ctaSource: 'pricing:business-tax' },
  ...overrides,
});

describe('POST /api/consultation', () => {
  it('validates, then delivers a notification email over SMTP', async () => {
    const res = await request(appWith()).post('/api/consultation').send(body());
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(inbox).toHaveLength(1);
    const mail = inbox[0];
    expect(mail.to).toEqual(['info@mynumberx.com']);
    expect(mail.raw).toMatch(/Reply-To: "?Jordan Lee"? <jordan@example\.com>/);
    expect(mail.raw).toContain('Business Tax Filing');
    expect(mail.raw).toContain('S-Corp Tax Filing');
    expect(mail.raw).toContain('pricing:business-tax');
  });

  it('sends a confirmation email only when enabled', async () => {
    await request(appWith(config({ SEND_CONFIRMATION_EMAIL: 'true' })))
      .post('/api/consultation')
      .send(body());
    expect(inbox.map((m) => m.to[0])).toEqual(['info@mynumberx.com', 'jordan@example.com']);
  });

  it('rejects line breaks in names (header-injection attempts)', async () => {
    const res = await request(appWith())
      .post('/api/consultation')
      .send(body({ firstName: 'Eve\r\nBcc: victim@example.com' }));
    expect(res.status).toBe(400);
    expect(res.body.fieldErrors.firstName).toBeTruthy();
    expect(inbox).toHaveLength(0);
  });

  it('escapes HTML in visitor input', async () => {
    await request(appWith())
      .post('/api/consultation')
      .send(body({ message: '<script>alert(1)</script> hello there' }));
    expect(inbox).toHaveLength(1);
    // The plain-text part may contain the raw text; the HTML part must be escaped.
    // Undo quoted-printable soft line breaks before inspecting the content.
    const htmlPart = inbox[0].raw.split('text/html')[1].replace(/=\r?\n/g, '');
    expect(htmlPart).not.toContain('<script>alert(1)</script>');
    expect(htmlPart).toContain('&lt;script&gt;');
  });

  it('returns field errors for invalid input and sends nothing', async () => {
    const res = await request(appWith())
      .post('/api/consultation')
      .send(body({ email: 'nope', consent: false, service: 'other' }));
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(Object.keys(res.body.fieldErrors).sort()).toEqual(['consent', 'email', 'service']);
    expect(inbox).toHaveLength(0);
  });

  it('silently drops honeypot and too-fast submissions', async () => {
    const app = appWith();
    const a = await request(app)
      .post('/api/consultation')
      .send(body({ website: 'http://spam.example' }));
    const b = await request(app)
      .post('/api/consultation')
      .send(body({ startedAt: Date.now() }));
    expect(a.body).toEqual({ ok: true });
    expect(b.body).toEqual({ ok: true });
    expect(inbox).toHaveLength(0);
  });

  it('returns 503 (not a fake success) when email is not configured', async () => {
    const c = config({ SMTP_HOST: '' });
    const res = await request(createApp(c, null)).post('/api/consultation').send(body());
    expect(res.status).toBe(503);
    expect(res.body.ok).toBe(false);
  });

  it('returns 502 when the SMTP server is unreachable', async () => {
    const res = await request(appWith(config({ SMTP_PORT: '1' })))
      .post('/api/consultation')
      .send(body());
    expect(res.status).toBe(502);
    expect(res.body.ok).toBe(false);
  });

  it('rate-limits repeated submissions', async () => {
    const app = appWith();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await request(app).post('/api/consultation').send(body())).status);
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses[5]).toBe(429);
  });

  it('rejects malformed JSON', async () => {
    const res = await request(appWith()).post('/api/consultation').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
  });
});

describe('CORS', () => {
  it('only allows configured origins', async () => {
    const app = appWith(config({ ALLOWED_ORIGINS: 'https://mynumberx.com' }));
    const ok = await request(app).options('/api/consultation').set('Origin', 'https://mynumberx.com');
    const bad = await request(app).options('/api/consultation').set('Origin', 'https://evil.example');
    expect(ok.headers['access-control-allow-origin']).toBe('https://mynumberx.com');
    expect(bad.headers['access-control-allow-origin']).toBeUndefined();
  });
});
