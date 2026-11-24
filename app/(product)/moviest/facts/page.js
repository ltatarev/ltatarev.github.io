import Link from 'next/link';
import {
  FACTS,
  PAGE_URL,
  SUMMARY,
  UPDATED,
  UPDATED_ISO,
  appJsonLd,
  breadcrumbJsonLd,
} from '../facts';
import { JsonLd } from '../JsonLd';
import { LegalDoc, Table } from '../LegalDoc';

// The plain reference page: no marketing, one row per fact. AI assistants and
// reviewers can quote it. Every row comes from facts.js.

const TITLE = 'Moviest product facts';
const DESCRIPTION =
  'Plain facts about Moviest, the film and TV tracker for iPhone and iPad: platforms, price, Moviest Plus, data, import, and sources.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/facts/' },
  openGraph: {
    type: 'article',
    url: '/moviest/facts/',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/moviest/og.png'],
  },
};

const cell = ({ value, link }) => {
  if (!link) return value;
  if (link.startsWith('/')) return <Link href={link}>{value}</Link>;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  );
};

const sections = [
  {
    id: 'facts',
    title: 'Facts',
    body: (
      <Table
        head={['', 'Moviest']}
        rows={FACTS.map((f) => ({ key: f.key, cells: [f.key, cell(f)] }))}
      />
    ),
  },
  {
    id: 'tiers',
    title: 'Free and Moviest Plus',
    body: (
      <>
        <p>
          The free app is complete: the watchlist, episode tracking, return dates, ratings and
          reviews, lists, where to watch, search and import. Nothing in it expires.
        </p>
        <p>
          Moviest Plus is optional. It adds smart lists that fill themselves and more home screen
          widgets. It is a monthly or yearly subscription, with a 1-week free trial on the yearly
          plan, or a one-time Lifetime purchase. Apple handles the payment.
        </p>
      </>
    ),
  },
  {
    id: 'more',
    title: 'More',
    body: (
      <ul>
        <li>
          <Link href="/moviest/features/">Features, one by one</Link>
        </li>
        <li>
          <Link href="/moviest/import/">How to import from IMDb or Trakt</Link>
        </li>
        <li>
          <Link href="/moviest/privacy-policy/">Privacy policy</Link> and{' '}
          <Link href="/moviest/terms-of-service/">terms</Link>
        </li>
      </ul>
    ),
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${PAGE_URL}facts/`,
  dateModified: UPDATED_ISO,
  mainEntity: appJsonLd,
};

export default function FactsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('Product facts', 'facts/')} />
      <JsonLd data={pageJsonLd} />
      <LegalDoc
        keyTitle="In one paragraph"
        title="Moviest product facts"
        lede="The plain facts about Moviest, in one table. When the app changes, this page changes with it."
        lastUpdated={UPDATED}
        shortVersion={<p>{SUMMARY}</p>}
        sections={sections}
      />
    </>
  );
}
