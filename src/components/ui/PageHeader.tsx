import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Eyebrow } from './Primitives';

/** Navy header band for inner pages, with breadcrumbs. */
export function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumb: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div
        className="bg-ledger-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-navy-600/40 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative pt-36 pb-16 sm:pt-40 sm:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-navy-100/70">
            <li>
              <Link to="/" className="rounded transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-white">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <Eyebrow tone="dark" className="mt-10">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-4 max-w-3xl text-[2.375rem] leading-[1.08] font-bold text-white sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100/80">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
