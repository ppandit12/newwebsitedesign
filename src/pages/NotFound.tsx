import { Seo } from '../components/layout/Seo';
import { ButtonLink } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { pages } from '../data/seo';

export default function NotFound() {
  return (
    <>
      <Seo page={pages.notFound} />
      <PageHeader
        breadcrumb="Page not found"
        eyebrow="Error 404"
        title="We couldn’t find that page"
        intro="The page may have moved or no longer exists. Try one of these instead."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" variant="gold" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink to="/services/" variant="outline-light" size="lg">
            Services & pricing
          </ButtonLink>
          <ButtonLink to="/contact/" variant="outline-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </PageHeader>
    </>
  );
}
