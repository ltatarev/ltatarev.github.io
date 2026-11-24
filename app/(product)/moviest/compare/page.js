import Link from 'next/link';
import { APP_STORE } from '../appstore';
import { COMPARE_CHECKED, PAGE_URL, UPDATED, UPDATED_ISO, breadcrumbJsonLd } from '../facts';
import { JsonLd } from '../JsonLd';
import { LegalDoc, Table } from '../LegalDoc';
import styles from '../legal.module.css';

// Claims about other apps go stale. Each one here was checked on COMPARE_CHECKED. Keep them
// broad (what the product is for, account or not) and leave out prices and limits,
// which change often. Say where the other app is the better choice.

const TITLE = 'Moviest vs Letterboxd, Trakt and TV Time — film and TV trackers compared';
const DESCRIPTION =
  'How Moviest compares with Letterboxd and Trakt, and what to use now that TV Time has closed. Films and TV in one private watchlist, no account, on iPhone and iPad.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/compare/' },
  openGraph: {
    type: 'article',
    url: '/moviest/compare/',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/moviest/og.png'],
  },
};

const ROWS = [
  {
    key: 'focus',
    cells: ['Made for', 'Films and TV, equally', 'Films (some series)', 'Films and TV'],
  },
  { key: 'episodes', cells: ['Episode tracking', 'Yes', 'No', 'Yes'] },
  { key: 'account', cells: ['Account', 'None', 'Required', 'Required'] },
  { key: 'social', cells: ['Social features', 'None, private', 'Yes, at the centre', 'Yes'] },
  {
    key: 'data',
    cells: ['Where your record is kept', 'On your device', 'Their servers', 'Their servers'],
  },
  { key: 'platforms', cells: ['Platforms', 'iPhone, iPad', 'Web, iOS, Android', 'Web, many apps'] },
  { key: 'price', cells: ['Price', 'Free, optional Plus', 'Free, paid tiers', 'Free, paid VIP'] },
];

const sections = [
  {
    id: 'table',
    title: 'At a glance',
    body: (
      <>
        <Table head={['', 'Moviest', 'Letterboxd', 'Trakt']} rows={ROWS} />
        <p>Checked on {COMPARE_CHECKED}. The other apps change, so check their own sites too.</p>
      </>
    ),
  },
  {
    id: 'letterboxd',
    title: 'Moviest and Letterboxd',
    body: (
      <>
        <p>
          <b>Choose Letterboxd</b> if you want a social diary for films: reviews other people read,
          friends to follow, and a large film community. Letterboxd is the better choice for that.
        </p>
        <p>
          <b>Choose Moviest</b> if you also watch TV and want one list for both, with episode
          tracking and return dates. Moviest is private: your ratings have no audience and no
          follower count, and there is no account.
        </p>
        <p>Moviest cannot import a Letterboxd export at the moment.</p>
      </>
    ),
  },
  {
    id: 'trakt',
    title: 'Moviest and Trakt',
    body: (
      <>
        <p>
          <b>Choose Trakt</b> if you want automatic tracking from media centres and streaming
          devices, a web profile, or the same history on many devices and platforms.
        </p>
        <p>
          <b>Choose Moviest</b> if you want a native iPhone and iPad app with no account, where the
          record stays on your device and the full library works with no signal.
        </p>
        <p>
          You can use both: <Link href="/moviest/import/">import your Trakt export</Link> into
          Moviest to start with your full history.
        </p>
      </>
    ),
  },
  {
    id: 'tvtime',
    title: 'After TV Time',
    body: (
      <>
        <p>
          TV Time closed on 15 July 2026. Moviest tracks TV episodes and films in one list, which
          covers the main job TV Time did.
        </p>
        <p>
          Moviest cannot read a TV Time export. If you moved your TV Time history to Trakt, export
          it from Trakt and <Link href="/moviest/import/">import that file</Link> into Moviest.
        </p>
      </>
    ),
  },
  {
    id: 'not',
    title: 'What Moviest does not do',
    body: (
      <ul>
        <li>
          There is no Android or web version of the tracker. The web version is for browsing: film
          and show pages, where to watch and episode ratings.
        </li>
        <li>There is no social feed, no followers and no public profile.</li>
        <li>Moviest does not track automatically from streaming apps. You mark what you watch.</li>
        <li>The library does not sync between devices.</li>
      </ul>
    ),
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${PAGE_URL}compare/`,
  dateModified: UPDATED_ISO,
  about: { '@id': `${PAGE_URL}#app` },
};

export default function ComparePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('Compared', 'compare/')} />
      <JsonLd data={pageJsonLd} />
      <LegalDoc
        keyTitle="In one paragraph"
        title="Moviest compared"
        lede="How Moviest compares with Letterboxd and Trakt, and what to use after TV Time. Where another app is the better choice, this page says so."
        lastUpdated={UPDATED}
        shortVersion={
          <>
            <p>
              Moviest is a private film and TV tracker for iPhone and iPad: one watchlist for both,
              episode tracking, ratings, and no account. Letterboxd is better for a social film
              diary. Trakt is better for automatic tracking on many devices.
            </p>
            <p>
              <a className={styles.cta} href={APP_STORE} target="_blank" rel="noopener noreferrer">
                Get Moviest on the App Store
              </a>
            </p>
          </>
        }
        sections={sections}
      />
    </>
  );
}
