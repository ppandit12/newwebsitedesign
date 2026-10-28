import 'dotenv/config';

function bool(value: string | undefined, fallback = false): boolean {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function list(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface ServerConfig {
  port: number;
  isProduction: boolean;
  /** Origins allowed to call the API cross-origin (only needed when the site is hosted separately). */
  allowedOrigins: string[];
  /** Number of reverse proxies in front of the app, for correct client IPs in rate limiting. */
  trustProxy: number;
  /** Serve the prerendered site from ./dist as well as the API. */
  serveStatic: boolean;
  /** Minimum time (ms) between rendering the form and submitting it. */
  minFillMs: number;
  smtp: {
    host?: string;
    port: number;
    secure: boolean;
    user?: string;
    pass?: string;
  };
  mail: {
    from?: string;
    to?: string;
    sendConfirmation: boolean;
  };
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  return {
    port: Number(env.PORT ?? 8787),
    isProduction: env.NODE_ENV === 'production',
    allowedOrigins: list(env.ALLOWED_ORIGINS),
    trustProxy: Number(env.TRUST_PROXY ?? 0),
    serveStatic: bool(env.SERVE_STATIC),
    minFillMs: Number(env.MIN_FILL_MS ?? 3000),
    smtp: {
      host: env.SMTP_HOST || undefined,
      port: Number(env.SMTP_PORT ?? 587),
      secure: bool(env.SMTP_SECURE),
      user: env.SMTP_USER || undefined,
      pass: env.SMTP_PASS || undefined,
    },
    mail: {
      from: env.MAIL_FROM || undefined,
      to: env.CONTACT_TO || undefined,
      sendConfirmation: bool(env.SEND_CONFIRMATION_EMAIL),
    },
  };
}

/** Email delivery is only possible once SMTP host, sender and recipient are all configured. */
export function isMailConfigured(config: ServerConfig): boolean {
  return Boolean(config.smtp.host && config.mail.from && config.mail.to);
}
