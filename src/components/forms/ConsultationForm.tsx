import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Link, useSearchParams } from 'react-router';
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Send, Tag, X } from 'lucide-react';
import {
  SERVICE_INTERESTS,
  consultationFieldsSchema,
  type ConsultationRequest,
  type ConsultationResponse,
  type ServiceInterest,
} from '../../../shared/consultation';
import { company } from '../../data/company';
import { readAttribution } from '../../lib/attribution';
import { Button } from '../ui/Button';
import { Field, describedBy, inputClass } from './Field';

type FormInput = z.input<typeof consultationFieldsSchema>;
type FormOutput = z.output<typeof consultationFieldsSchema>;

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');
const isService = (v: string | null): v is ServiceInterest => SERVICE_INTERESTS.some((s) => s.value === v);

type Status = { state: 'idle' } | { state: 'success' } | { state: 'error'; message: string };

export function ConsultationForm() {
  const [params] = useSearchParams();
  const initialService = params.get('service');
  const [pkg, setPkg] = useState(() => params.get('package')?.slice(0, 120) || '');
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(consultationFieldsSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: (isService(initialService) ? initialService : '') as FormInput['service'],
      message: '',
      consent: false,
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Keep the selection in sync if the visitor follows another service CTA while on this page.
  useEffect(() => {
    if (isService(initialService)) setValue('service', initialService);
    const p = params.get('package');
    if (p) setPkg(p.slice(0, 120));
  }, [initialService, params, setValue]);

  useEffect(() => {
    if (status.state === 'success') successRef.current?.focus();
    if (status.state === 'error') errorRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: FormOutput) => {
    setStatus({ state: 'idle' });
    const body: ConsultationRequest = {
      ...values,
      package: pkg || undefined,
      attribution: { ...readAttribution(), ctaSource: params.get('from')?.slice(0, 100) || undefined },
      website: honeypotRef.current?.value || undefined,
      startedAt: startedAt.current || Date.now(),
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(`${API_URL}/api/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as ConsultationResponse | null;
      if (res.ok && data?.ok) {
        setStatus({ state: 'success' });
        return;
      }
      if (data && !data.ok && data.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) {
          setError(field as keyof FormInput, { message }, { shouldFocus: true });
        }
      }
      setStatus({
        state: 'error',
        message: (data && !data.ok && data.error) || 'Something went wrong while sending your request.',
      });
    } catch {
      setStatus({
        state: 'error',
        message: 'We couldn’t reach our server. Please check your connection and try again.',
      });
    } finally {
      clearTimeout(timer);
    }
  };

  if (status.state === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-card border border-line bg-white p-8 text-center outline-none sm:p-12"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy-900 text-gold-400">
          <CircleCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Thank you — your request has been sent.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          We’ve received your message and will be in touch soon. If your matter is time-sensitive, call us at{' '}
          <a href={company.phone.href} className="font-semibold text-navy-900">
            {company.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (k: keyof FormInput) => errors[k]?.message as string | undefined;
  const aria = (k: keyof FormInput, hint?: string) => ({
    'aria-invalid': Boolean(errors[k]) || undefined,
    'aria-describedby': describedBy(k, err(k), hint),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby="form-required-note"
      className="relative grid gap-5"
    >
      <p id="form-required-note" className="text-sm text-muted">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>

      {status.state === 'error' && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none"
        >
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            {status.message} You can also reach us at{' '}
            <a href={company.phone.href} className="font-semibold underline">
              {company.phone.display}
            </a>{' '}
            or{' '}
            <a href={company.email.href} className="font-semibold underline">
              {company.email.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={err('firstName')}>
          <input
            id="firstName"
            autoComplete="given-name"
            className={inputClass(!!errors.firstName)}
            {...aria('firstName')}
            {...register('firstName')}
          />
        </Field>
        <Field id="lastName" label="Last name" required error={err('lastName')}>
          <input
            id="lastName"
            autoComplete="family-name"
            className={inputClass(!!errors.lastName)}
            {...aria('lastName')}
            {...register('lastName')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" required error={err('email')}>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            {...aria('email')}
            {...register('email')}
          />
        </Field>
        <Field id="phone" label="Phone" optionalHint error={err('phone')}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(804) 555-0123"
            className={inputClass(!!errors.phone)}
            {...aria('phone')}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field id="service" label="Service interested in" required error={err('service')}>
        <div className="relative">
          <select
            id="service"
            className={`${inputClass(!!errors.service)} appearance-none pr-11`}
            {...aria('service')}
            {...register('service')}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_INTERESTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        </div>
      </Field>

      {pkg && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-3 text-sm">
          <p className="flex items-center gap-2 text-navy-900">
            <Tag className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
            <span>
              Selected package: <strong className="font-semibold">{pkg}</strong>
            </span>
          </p>
          <button
            type="button"
            onClick={() => setPkg('')}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-navy-900 hover:bg-white"
            aria-label="Remove selected package"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <Field
        id="message"
        label="How can we help?"
        required
        error={err('message')}
        hint="A few sentences about your situation is plenty."
      >
        <textarea
          id="message"
          rows={5}
          className={`${inputClass(!!errors.message)} resize-y`}
          {...aria('message', 'A few sentences about your situation is plenty.')}
          {...register('message')}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-navy-900"
            {...aria('consent')}
            {...register('consent')}
          />
          <span>
            I agree that NumberX may contact me about this request. See our{' '}
            <Link to="/privacy-policy/" className="font-semibold text-navy-900 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
            <span className="text-red-700" aria-hidden="true">
              {' '}
              *
            </span>
          </span>
        </label>
        {err('consent') && (
          <p id="consent-error" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {err('consent')}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full sm:w-auto sm:justify-self-start">
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Request Free Consultation
            <Send className="h-4.5 w-4.5" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="sr-only" aria-live="polite">
        {isSubmitting ? 'Sending your request…' : ''}
      </p>
    </form>
  );
}
