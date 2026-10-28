import path from 'node:path';
import { createApp } from './app.js';
import { isMailConfigured, loadConfig } from './config.js';
import { createMailer } from './mailer.js';

const config = loadConfig();
const mailReady = isMailConfigured(config);

if (!mailReady) {
  const msg = '[server] Email delivery is not configured. Set SMTP_HOST, MAIL_FROM and CONTACT_TO (see .env.example).';
  if (config.isProduction) {
    console.error(msg);
    process.exit(1);
  }
  console.warn(
    `${msg}\n         The consultation form will return a 503 until this is set. For local testing run "npm run mail:dev".`,
  );
}

const app = createApp(config, mailReady ? createMailer(config) : null, {
  staticDir: config.serveStatic ? path.resolve('dist') : undefined,
});

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}${config.serveStatic ? ' (serving ./dist)' : ''}`);
});
