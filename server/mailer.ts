import nodemailer, { type Transporter } from 'nodemailer';
import { serviceLabel, type ConsultationRequest } from '../shared/consultation.js';
import type { ServerConfig } from './config.js';

export interface Mailer {
  sendConsultation(request: ConsultationRequest, meta: { ip?: string; userAgent?: string }): Promise<void>;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Strip CR/LF so visitor input can never inject extra mail headers via the subject line.
const singleLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

function rows(request: ConsultationRequest, meta: { ip?: string; userAgent?: string }): [string, string][] {
  const a = request.attribution ?? {};
  const out: [string, string][] = [
    ['Name', `${request.firstName} ${request.lastName}`],
    ['Email', request.email],
    ['Phone', request.phone || '—'],
    ['Service', serviceLabel(request.service)],
  ];
  if (request.package) out.push(['Package', request.package]);
  out.push(['Message', request.message]);
  const source: [string, string | undefined][] = [
    ['CTA clicked', a.ctaSource],
    ['Landing page', a.landingPage],
    ['Referrer', a.referrer],
    ['UTM source', a.utmSource],
    ['UTM medium', a.utmMedium],
    ['UTM campaign', a.utmCampaign],
    ['UTM term', a.utmTerm],
    ['UTM content', a.utmContent],
    ['IP address', meta.ip],
    ['User agent', meta.userAgent],
  ];
  for (const [k, v] of source) if (v) out.push([k, v]);
  return out;
}

export function buildNotification(request: ConsultationRequest, meta: { ip?: string; userAgent?: string }) {
  const r = rows(request, meta);
  const subject = singleLine(
    `New consultation request — ${request.firstName} ${request.lastName} (${serviceLabel(request.service)})`,
  );
  const text = r.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#17243A">
<h2 style="color:#0B1F3A;margin:0 0 16px">New consultation request</h2>
<table cellpadding="8" style="border-collapse:collapse;font-size:14px">
${r
  .map(
    ([k, v]) =>
      `<tr><td style="border-bottom:1px solid #E4EAF1;color:#64748B;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="border-bottom:1px solid #E4EAF1;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
  )
  .join('\n')}
</table></body></html>`;
  return { subject, text, html };
}

export function buildConfirmation(request: ConsultationRequest) {
  const name = singleLine(request.firstName);
  const subject = 'We received your consultation request — NumberX Financial Services';
  const text = `Hi ${name},

Thank you for contacting NumberX Financial Services. We have received your request about ${serviceLabel(
    request.service,
  )} and will be in touch soon.

If your matter is time-sensitive, you can call us at 804-630-1091.

NumberX Financial Services
info@mynumberx.com`;
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#17243A;line-height:1.6">
<p>Hi ${escapeHtml(name)},</p>
<p>Thank you for contacting NumberX Financial Services. We have received your request about <strong>${escapeHtml(
    serviceLabel(request.service),
  )}</strong> and will be in touch soon.</p>
<p>If your matter is time-sensitive, you can call us at <a href="tel:+18046301091">804-630-1091</a>.</p>
<p>NumberX Financial Services<br><a href="mailto:info@mynumberx.com">info@mynumberx.com</a></p>
</body></html>`;
  return { subject, text, html };
}

export function createMailer(config: ServerConfig, transporter?: Transporter): Mailer {
  const transport =
    transporter ??
    nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });

  return {
    async sendConsultation(request, meta) {
      const n = buildNotification(request, meta);
      await transport.sendMail({
        from: config.mail.from,
        to: config.mail.to,
        replyTo: { name: singleLine(`${request.firstName} ${request.lastName}`), address: request.email },
        subject: n.subject,
        text: n.text,
        html: n.html,
      });

      if (config.mail.sendConfirmation) {
        const c = buildConfirmation(request);
        try {
          await transport.sendMail({
            from: config.mail.from,
            to: request.email,
            subject: c.subject,
            text: c.text,
            html: c.html,
          });
        } catch (err) {
          // The enquiry itself was delivered; a failed courtesy email should not fail the request.
          console.error('[mailer] confirmation email failed:', err);
        }
      }
    },
  };
}
