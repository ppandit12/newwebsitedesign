import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, ChartColumnIncreasing, Handshake, Landmark, MonitorCog, ReceiptText } from 'lucide-react';
import type { ServiceInterest } from '../../shared/consultation';

export interface Service {
  id: string;
  /** Matches a value in SERVICE_INTERESTS so CTAs can preselect it in the form. */
  interest: ServiceInterest;
  icon: LucideIcon;
  title: string;
  /** One-line summary for cards. */
  summary: string;
  /** Longer copy for the Services page. */
  description: string[];
  highlights: string[];
  /** Pricing tab to link to, if this service has published pricing. */
  pricingTab?: string;
}

/**
 * Service descriptions are drawn from the live site's homepage and services page.
 * "Financial Modelling" is listed on the live site without a description; its copy
 * below is new and marked for client approval.
 */
export const services: Service[] = [
  {
    id: 'accounting-bookkeeping',
    interest: 'accounting-bookkeeping',
    icon: BookOpenCheck,
    title: 'Accounting & Bookkeeping',
    summary:
      "While you focus on turning your vision into reality, we'll make the accounting easy and ensure that your finances are maintained.",
    description: [
      'Simplify your finances by outsourcing your accounting needs to trusted experts. Gain accurate bookkeeping, timely reports, and expert advice — all tailored to your business.',
      'Save time, reduce costs, and focus on growth with reliable outsourced accounting services.',
    ],
    highlights: [
      'Monthly transaction entry',
      'Account reconciliations',
      'Clean financial statements',
      'Standard reports',
    ],
    pricingTab: 'accounting',
  },
  {
    id: 'tax-planning-preparation',
    interest: 'tax-planning',
    icon: ReceiptText,
    title: 'Tax Planning & Preparation',
    summary: 'Our firm provides individual and business clients with taxation expertise and knowledge year-round.',
    description: [
      'Individual tax services: expert tax preparation and planning tailored to your unique financial situation, with the aim of maximizing your refund and minimizing your liability.',
      'Corporate & partnership tax services: comprehensive tax solutions that keep your business or partnership compliant and tax-efficient.',
    ],
    highlights: [
      'Individual returns (Form 1040)',
      'S-Corp, C-Corp & partnership returns',
      'Quarterly & year-end planning',
      'IRS audit assistance',
    ],
    pricingTab: 'individual-tax',
  },
  {
    id: 'cfo-controller',
    interest: 'cfo-controller',
    icon: Landmark,
    title: 'Outsourced CFO & Controller Services',
    summary: 'CFO services and outsourced accounting for businesses and non-profit organizations.',
    description: [
      'Forward-looking financial leadership when you are ready to scale — without the cost of a full-time hire.',
      'Available to businesses and non-profit organizations on a monthly or hourly basis.',
    ],
    highlights: [
      'Cash flow oversight',
      'Budgets & forecasts',
      'KPI dashboards',
      'Board-ready reporting',
      'Strategic guidance',
    ],
    pricingTab: 'accounting',
  },
  {
    id: 'financial-modelling',
    interest: 'financial-modelling',
    icon: ChartColumnIncreasing,
    title: 'Financial Modelling',
    // CLIENT-APPROVE: new copy — the live site lists this service without a description.
    summary: 'Financial models that turn your numbers into a clear view of where your business is heading.',
    description: [
      'A well-built financial model helps you plan, test assumptions, and make confident, data-driven decisions.',
      'We build models around your business so you can see beyond the numbers.',
    ],
    highlights: ['Planning & forecasting', 'Scenario analysis', 'Decision support'],
  },
  {
    id: 'business-consulting',
    interest: 'business-consulting',
    icon: Handshake,
    title: 'Business Consulting',
    summary:
      'Business consulting including financial analysis, financial feasibility, operational support, and strategic planning.',
    description: [
      'Practical advice for owners who want to grow with confidence — from evaluating a new opportunity to strengthening day-to-day operations.',
      'Consulting calls are available at $200 per hour.',
    ],
    highlights: ['Financial analysis', 'Financial feasibility', 'Operational support', 'Strategic planning'],
  },
  {
    id: 'quickbooks',
    interest: 'quickbooks',
    icon: MonitorCog,
    title: 'QuickBooks Services',
    summary:
      'Guidance on everything from complex accounting questions to mastering your QuickBooks accounting software.',
    description: [
      'Get more out of QuickBooks with guidance from a CPA — whether you are setting up, cleaning up, or answering a complex accounting question.',
    ],
    highlights: ['Software guidance', 'Complex accounting questions', 'Cleaner books in QuickBooks'],
  },
];
