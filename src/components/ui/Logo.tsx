import { Link } from 'react-router';
import { cn } from '../../lib/cn';

/** Horizontal lockup derived from the client's original stacked NumberX logo. */
export function Logo({ tone = 'navy', className }: { tone?: 'navy' | 'white'; className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label="NumberX Financial Services — home"
    >
      <picture>
        <source srcSet={`/images/numberx-logo-${tone}.webp`} type="image/webp" />
        <img
          src={`/images/numberx-logo-${tone}.png`}
          alt=""
          width={691}
          height={160}
          className="h-8 w-auto sm:h-9"
          decoding="async"
        />
      </picture>
    </Link>
  );
}
