import { z } from 'zod';

/**
 * Consultation request contract, shared by the React form (client-side
 * validation) and the Express API (authoritative server-side validation).
 */

export const SERVICE_INTERESTS = [
  { value: 'individual-tax', label: 'Individual Tax Filing' },
  { value: 'business-tax', label: 'Business Tax Filing' },
  { value: 'tax-planning', label: 'Tax Planning & Advisory' },
  { value: 'accounting-bookkeeping', label: 'Accounting & Bookkeeping' },
  { value: 'cfo-controller', label: 'Outsourced CFO & Controller Services' },
  { value: 'financial-modelling', label: 'Financial Modelling' },
  { value: 'business-consulting', label: 'Business Consulting' },
  { value: 'quickbooks', label: 'QuickBooks Services' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export type ServiceInterest = (typeof SERVICE_INTERESTS)[number]['value'];

const serviceValues = SERVICE_INTERESTS.map((s) => s.value) as [ServiceInterest, ...ServiceInterest[]];

export function serviceLabel(value: string): string {
  return SERVICE_INTERESTS.find((s) => s.value === value)?.label ?? value;
}

// North American numbers: 10 digits, optional leading 1, common punctuation.
const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);

// Single-line text: no line breaks or other control characters (blocks header-style injection).
const singleLine = (max: number, required: string) =>
  trimmed(max)
    .min(1, required)
    .refine((v) => !/[\u0000-\u001f\u007f]/.test(v), 'Please remove line breaks and special characters.');

/** Fields the visitor fills in. */
export const consultationFieldsSchema = z.object({
  firstName: singleLine(60, 'Please enter your first name.'),
  lastName: singleLine(60, 'Please enter your last name.'),
  email: z.string().trim().toLowerCase().pipe(z.email('Please enter a valid email address.')),
  phone: trimmed(30).refine((v) => v === '' || PHONE_RE.test(v), 'Please enter a valid 10-digit phone number.'),
  service: z.enum(serviceValues, { error: 'Please choose the service you are interested in.' }),
  message: trimmed(3000).min(10, 'Please tell us a little more (at least 10 characters).'),
  consent: z.boolean().refine((v) => v, 'Please confirm we may contact you about your request.'),
});

export type ConsultationFields = z.infer<typeof consultationFieldsSchema>;

/** Lead-source attribution captured automatically on the client. */
export const attributionSchema = z
  .object({
    landingPage: trimmed(300).optional(),
    referrer: trimmed(300).optional(),
    utmSource: trimmed(100).optional(),
    utmMedium: trimmed(100).optional(),
    utmCampaign: trimmed(100).optional(),
    utmTerm: trimmed(100).optional(),
    utmContent: trimmed(100).optional(),
    ctaSource: trimmed(100).optional(),
  })
  .strict();

export type Attribution = z.infer<typeof attributionSchema>;

/** Full request body accepted by POST /api/consultation. */
export const consultationRequestSchema = consultationFieldsSchema.extend({
  /** Specific package chosen on the pricing page, if any (e.g. "Basic 1040 Tax Return"). */
  package: trimmed(120).optional(),
  attribution: attributionSchema.optional(),
  /** Honeypot — must stay empty. Real visitors never see this field. */
  website: z.string().max(200).optional(),
  /** Epoch ms when the form was rendered; used to reject instant bot submissions. */
  startedAt: z.number().int().positive(),
});

export type ConsultationRequest = z.infer<typeof consultationRequestSchema>;

export type ConsultationResponse =
  { ok: true } | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ConsultationFields, string>> };
