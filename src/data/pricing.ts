import type { ServiceInterest } from '../../shared/consultation';

/**
 * Published pricing — single source of truth for the Services page.
 * Verified against https://mynumberx.com/services/ (Oct 2026).
 * Do not change amounts without written client approval.
 */

export interface PriceItem {
  name: string;
  description: string;
  /** e.g. "Starting at", "From" — shown above the amount. */
  qualifier?: string;
  amount: string;
  /** e.g. "/month", "/session" */
  unit?: string;
  /** Optional second price option, e.g. hourly rate. */
  alternative?: string;
  /** Service to preselect in the form when it differs from the category's. */
  interest?: ServiceInterest;
}

export interface PricingCategory {
  id: string;
  label: string;
  heading: string;
  intro: string;
  interest: ServiceInterest;
  items: PriceItem[];
  note?: string;
}

export const pricing: PricingCategory[] = [
  {
    id: 'individual-tax',
    label: 'Individual Tax Filing',
    heading: 'Stress-Free Individual Tax Filing',
    intro: 'We simplify tax preparation so you can file with confidence.',
    interest: 'individual-tax',
    items: [
      {
        name: 'Basic 1040 Tax Return',
        description: 'Perfect for W-2 employees with straightforward filings.',
        qualifier: 'Starting at',
        amount: '$100',
      },
      {
        name: 'Standard 1040 Tax Return',
        description: 'Includes dependents, credits, and basic deductions.',
        qualifier: 'Starting at',
        amount: '$200',
      },
      {
        name: 'Self-Employed / Freelancer',
        description: 'Schedule C for freelancers, gig workers, and small business owners.',
        qualifier: 'Starting at',
        amount: '$500',
      },
    ],
  },
  {
    id: 'business-tax',
    label: 'Business Tax Filing',
    heading: 'Comprehensive Business Tax Filing',
    intro: 'Keep your business compliant while maximizing tax efficiency.',
    interest: 'business-tax',
    items: [
      {
        name: 'LLC & Sole Proprietor',
        description: 'Schedule C for single-member LLCs and independent owners.',
        qualifier: 'Starting at',
        amount: '$600',
      },
      {
        name: 'S-Corp Tax Filing (Form 1120-S)',
        description: 'For small businesses electing S-Corp status.',
        qualifier: 'Starting at',
        amount: '$800',
      },
      {
        name: 'C-Corp Tax Filing (Form 1120)',
        description: 'For corporations filing separate business returns.',
        qualifier: 'Starting at',
        amount: '$800',
      },
      {
        name: 'Partnership Tax Filing (Form 1065)',
        description: 'For multi-partner businesses, big or small.',
        qualifier: 'Starting at',
        amount: '$600',
      },
    ],
  },
  {
    id: 'tax-planning',
    label: 'Tax Planning & Advisory',
    heading: 'Strategic Tax Planning & Advisory',
    intro: 'Proactive strategies to help minimize tax liability.',
    interest: 'tax-planning',
    items: [
      {
        name: 'Quarterly Tax Planning',
        description: 'For business owners and high earners looking to reduce liability.',
        amount: '$200',
        unit: '/session',
      },
      {
        name: 'Year-End Tax Strategy',
        description: 'Proactive planning to optimize deductions and credits.',
        amount: '$300',
      },
      {
        name: 'IRS Audit Assistance',
        description: 'Professional support in the event of an IRS audit.',
        qualifier: 'From',
        amount: '$350',
        unit: '/hour',
      },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    heading: 'Accounting',
    intro: 'Traditional bookkeeping done right, with forward-looking financial leadership when you’re ready to scale.',
    interest: 'accounting-bookkeeping',
    items: [
      {
        name: 'Bookkeeping',
        description: 'Monthly transaction entry, reconciliations, clean financials, and standard reports.',
        qualifier: 'Starting at',
        amount: '$100',
        unit: '/month',
      },
      {
        name: 'CFO & Controller Services',
        interest: 'cfo-controller',
        description:
          'Cash flow oversight, budgets and forecasts, KPI dashboards, board-ready reporting, and strategic guidance.',
        qualifier: 'From',
        amount: '$1,000',
        unit: '/month',
        alternative: 'or $200/hour',
      },
      {
        name: 'Consulting Calls',
        interest: 'business-consulting',
        description: 'One-on-one time with a CPA for specific questions and decisions.',
        amount: '$200',
        unit: '/hour',
      },
    ],
  },
];

// CLIENT-APPROVE: clarifying note implied by the "Starting at" pricing.
export const pricingDisclaimer =
  'Prices shown are starting rates. Your final fee depends on the complexity of your return or engagement.';
