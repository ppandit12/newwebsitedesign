import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'gold' | 'outline' | 'outline-light' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white shadow-[0_8px_20px_-10px_rgb(11_31_58/0.6)] hover:bg-navy-800 hover:shadow-[0_12px_28px_-12px_rgb(11_31_58/0.7)]',
  gold: 'bg-gold-500 text-navy-950 hover:bg-gold-400',
  outline: 'border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/40 hover:bg-navy-50',
  'outline-light': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
  ghost: 'text-navy-900 hover:bg-navy-50',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export const buttonClass = ({ variant = 'primary', size = 'md', className }: Omit<StyleProps, 'children'>) =>
  cn(base, variants[variant], sizes[size], className);

/** Internal navigation styled as a button. */
export function ButtonLink({
  to,
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <Link to={to} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

/** External / tel: / mailto: links styled as a button. */
export function ButtonAnchor({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
