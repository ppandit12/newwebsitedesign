import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { cn } from '../../lib/cn';

export const inputClass = (invalid: boolean) =>
  cn(
    'block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150',
    'focus:border-navy-900 focus:shadow-[0_0_0_4px_rgb(11_31_58/0.08)] focus:outline-none focus-visible:outline-none',
    invalid
      ? 'border-red-600 focus:border-red-600 focus:shadow-[0_0_0_4px_rgb(220_38_38/0.12)]'
      : 'border-line hover:border-navy-900/30',
  );

export function Field({
  id,
  label,
  required,
  optionalHint,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalHint?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between gap-2 font-display text-sm font-semibold text-navy-900"
      >
        <span>
          {label}
          {required && (
            <span className="ml-0.5 text-red-700" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {optionalHint && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby value for a field, pointing at its error or hint. */
export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;
