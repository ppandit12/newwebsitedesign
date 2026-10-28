import { Seo } from '../components/layout/Seo';
import { PageHeader } from '../components/ui/PageHeader';
import { company } from '../data/company';
import { pages } from '../data/seo';

// CLIENT-APPROVE / LEGAL REVIEW: draft notice describing what this website actually does.
// It must be reviewed by the client (and ideally counsel) before launch.
export const PRIVACY_LAST_UPDATED = 'October 28, 2026';

export default function Privacy() {
  return (
    <>
      <Seo page={pages.privacy} />
      <PageHeader
        breadcrumb="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Last updated ${PRIVACY_LAST_UPDATED}`}
      />
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl space-y-10 text-[1.0625rem] leading-relaxed text-ink/85 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            <div>
              <p>
                This policy explains how {company.legalName} (“NumberX”, “we”, “us”) handles information you share
                through this website.
              </p>
            </div>
            <div>
              <h2>Information we collect</h2>
              <p>When you submit the consultation form, we collect:</p>
              <ul className="mt-3">
                <li>Your first and last name, email address and (optionally) phone number</li>
                <li>The service you are interested in and the message you write</li>
                <li>
                  How you arrived at the site — the page you landed on, the referring website and any campaign (UTM)
                  tags in the link — and the CTA you clicked
                </li>
                <li>Your IP address and browser user agent, used to prevent spam and abuse</li>
              </ul>
            </div>
            <div>
              <h2>How we use it</h2>
              <p>
                We use this information only to respond to your enquiry, provide the services you request, and
                understand which pages and campaigns bring people to us. We do not sell your personal information.
              </p>
            </div>
            <div>
              <h2>How it is stored</h2>
              <p>
                Form submissions are sent to our business email inbox through a secure email service. This website does
                not set advertising cookies. Arrival information is kept in your browser’s session storage until you
                close the tab.
              </p>
            </div>
            <div>
              <h2>Your choices</h2>
              <p>
                You can ask us to access, correct or delete the information you have sent us by emailing{' '}
                <a href={company.email.href} className="font-semibold text-navy-900 underline underline-offset-2">
                  {company.email.display}
                </a>{' '}
                or calling{' '}
                <a href={company.phone.href} className="font-semibold text-navy-900">
                  {company.phone.display}
                </a>
                .
              </p>
            </div>
            <div>
              <h2>Changes</h2>
              <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
