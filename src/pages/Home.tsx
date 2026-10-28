import { Seo } from '../components/layout/Seo';
import { ConsultationCta } from '../components/home/ConsultationCta';
import { Faq, faqJsonLd } from '../components/home/Faq';
import { FounderIntro } from '../components/home/FounderIntro';
import { Hero } from '../components/home/Hero';
import { Pathways } from '../components/home/Pathways';
import { Process } from '../components/home/Process';
import { ServiceHighlights } from '../components/home/ServiceHighlights';
import { WhyChoose } from '../components/home/WhyChoose';
import { pages } from '../data/seo';

export default function Home() {
  return (
    <>
      <Seo page={pages.home} jsonLd={[faqJsonLd()]} />
      <Hero />
      <ServiceHighlights />
      <WhyChoose />
      <FounderIntro />
      <Pathways />
      <Process />
      <ConsultationCta from="home-cta" />
      <Faq />
    </>
  );
}
