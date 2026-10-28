// Local SMTP catcher for development: receives real SMTP deliveries from the
// API on localhost:1025 and prints them, so the full form → server → email
// flow can be tested without production mail credentials.
import { SMTPServer } from 'smtp-server';

const PORT = Number(process.env.DEV_SMTP_PORT ?? 1025);

const server = new SMTPServer({
  authOptional: true,
  disabledCommands: ['STARTTLS'],
  onData(stream, session, callback) {
    let raw = '';
    stream.on('data', (chunk) => (raw += chunk));
    stream.on('end', () => {
      const to = session.envelope.rcptTo.map((r) => r.address).join(', ');
      const subject = /^Subject: (.*)$/im.exec(raw)?.[1] ?? '(no subject)';
      console.log(`\n────────── mail received → ${to}\nSubject: ${subject}\n${raw.length} bytes`);
      callback();
    });
  },
});

server.listen(PORT, '127.0.0.1', () => console.log(`[dev-mail] SMTP catcher listening on 127.0.0.1:${PORT}`));
