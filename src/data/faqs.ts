import { company } from './company';

export interface Faq {
  question: string;
  answer: string;
}

// Answers restate facts published on mynumberx.com; nothing here is new policy.
export const faqs: Faq[] = [
  {
    question: 'What services does NumberX provide?',
    answer:
      'NumberX offers accounting and bookkeeping, individual and business tax preparation, tax planning and advisory (including IRS audit assistance), outsourced CFO and controller services, financial modelling, business consulting, and QuickBooks services.',
  },
  {
    question: 'Does NumberX work with small businesses?',
    answer:
      'Yes. We work with sole proprietors, single-member LLCs, S-Corps, C-Corps and partnerships, and offer CFO and outsourced accounting services to businesses and non-profit organizations. Small business owners can start with a free initial consultation.',
  },
  {
    question: 'Can I get assistance with tax planning?',
    answer:
      'Yes. We offer quarterly tax planning sessions ($200 per session) for business owners and high earners, and year-end tax strategy ($300) to help optimize deductions and credits.',
  },
  {
    question: 'Do you provide bookkeeping services?',
    answer:
      'Yes. Bookkeeping includes monthly transaction entry, reconciliations, clean financials and standard reports, starting at $100 per month.',
  },
  {
    question: 'How do I request a consultation?',
    answer: `Fill in the consultation form on our Contact page, call us at ${company.phone.display}, or email ${company.email.display}. Tell us a little about your situation and we will be in touch.`,
  },
  {
    question: 'Do you offer virtual accounting services?',
    answer: `Yes. NumberX is operated virtually from the ${company.serviceArea}, so we can work with you remotely by phone, email and video.`,
  },
];
