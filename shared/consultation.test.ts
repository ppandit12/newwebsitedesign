import { describe, expect, it } from 'vitest';
import { consultationFieldsSchema, consultationRequestSchema } from './consultation';

const valid = {
  firstName: 'Jordan',
  lastName: 'Lee',
  email: 'Jordan.Lee@Example.com ',
  phone: '(804) 555-0123',
  service: 'individual-tax',
  message: 'I would like help filing my 2025 return.',
  consent: true,
};

describe('consultationFieldsSchema', () => {
  it('accepts a valid submission and normalises email', () => {
    const r = consultationFieldsSchema.parse(valid);
    expect(r.email).toBe('jordan.lee@example.com');
  });

  it.each(['804-555-0123', '8045550123', '+1 804 555 0123', '1-804-555-0123', '804.555.0123', ''])(
    'accepts phone %s',
    (phone) => {
      expect(consultationFieldsSchema.safeParse({ ...valid, phone }).success).toBe(true);
    },
  );

  it.each(['12345', 'call me', '804-555-012', '+44 20 7946 0958'])('rejects phone %s', (phone) => {
    expect(consultationFieldsSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it('requires names, a valid email, a known service, a message and consent', () => {
    const r = consultationFieldsSchema.safeParse({
      firstName: ' ',
      lastName: '',
      email: 'not-an-email',
      phone: '',
      service: 'crypto-trading',
      message: 'hi',
      consent: false,
    });
    expect(r.success).toBe(false);
    const fields = new Set(r.error!.issues.map((i) => i.path[0]));
    expect(fields).toEqual(new Set(['firstName', 'lastName', 'email', 'service', 'message', 'consent']));
  });
});

describe('consultationRequestSchema', () => {
  it('rejects unknown attribution keys', () => {
    const r = consultationRequestSchema.safeParse({ ...valid, startedAt: 1, attribution: { evil: 'x' } });
    expect(r.success).toBe(false);
  });
});
