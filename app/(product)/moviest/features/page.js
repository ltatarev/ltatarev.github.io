import Link from 'next/link';
import { APP_STORE } from '../appstore';
import {
  PAGE_URL,
  PLUS_FEATURES,
  UPDATED,
  UPDATED_ISO,
  appJsonLd,
  breadcrumbJsonLd,
} from '../facts';
import { JsonLd } from '../JsonLd';
import { LegalDoc } from '../LegalDoc';
import styles from '../legal.module.css';

const TITLE = 'Features — Moviest, the film and TV tracker for iPhone and iPad';
const DESCRIPTION =
  'Everything Moviest does: one watchlist for films and TV, episode tracking, return dates, ratings, lists, where to watch, search by mood, IMDb and Trakt import. What is free and what Moviest Plus adds.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/features/' },
  openGraph: {
    type: 'article',
    url: '/moviest/features/',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/moviest/og.png'],
  },
};

const Free = () => <span className={styles.tag}>Free</span>;
const Plus = () => <span className={`${styles.tag} ${styles.plus}`}>Plus</span>;

// A screenshot from the App Store set. The alt text says what is on screen, so
// re-read it when you replace an image (see public/moviest/README.md).
const Shot = ({ src, alt, wide }) => (
  <figure className={`${styles.shot} ${wide ? styles.wide : ''}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </figure>
);

const sections = [
  {
    id: 'watchlist',
    title: 'One watchlist for films and TV shows',
    body: (
      <>
        <p>
          <Free /> Films and series sit in the same list. Sort and filter them together, for example
          by genre or runtime, and show the list as a poster grid or as rows. You do not need one
          app for films and another for shows.
        </p>
        <Shot
          src="/moviest/library.webp"
          alt="The Library tab on the Watchlist filter, showing a grid of posters — Sinners, Severance, Dune: Part Three and Shōgun — films and series side by side."
        />
      </>
    ),
  },
  {
    id: 'episodes',
    title: 'Track every TV episode',
    body: (
      <>
        <p>
          <Free /> Mark episodes as you watch them, and Moviest shows the next one. Shows with a new
          episode waiting sit above the shows you are caught up on, so you always know where you
          left off.
        </p>
        <Shot
          src="/moviest/episodes.webp"
          alt="The Watching filter under a “Ready to watch” heading, listing Andor, Silo, Severance and The Last of Us with the next episode and a progress bar on each."
        />
      </>
    ),
  },
  {
    id: 'upcoming',
    title: 'Return dates and upcoming episodes',
    body: (
      <>
        <p>
          <Free /> Upcoming episodes and releases for the titles you follow, grouped by month. A
          returning season does not pass you by.
        </p>
        <Shot
          src="/moviest/airings.webp"
          alt="The Upcoming filter for August 2026, listing House of the Dragon, Lioness, X-Men ’97 and Silo with the episode number, the episode name and the days until it airs."
        />
      </>
    ),
  },
  {
    id: 'rate',
    title: 'Rate films and shows, and write reviews',
    body: (
      <>
        <p>
          <Free /> Give a score, write as much or as little as you want, and keep it. Your ratings
          are private: there is no feed and no follower count.
        </p>
        <Shot
          src="/moviest/rate.webp"
          alt="The rating sheet open over the Severance page: a row of stars set to eight and a half, a score of 8.5 labelled “One of the greats”, and a Save rating button."
        />
      </>
    ),
  },
  {
    id: 'where',
    title: 'Where to watch',
    body: (
      <>
        <p>
          <Free /> Each title page shows which services stream, rent or sell it in your country, and
          what it costs to rent or buy. Your own services are marked. The page also has the TMDB
          score, cast, seasons and episodes. Streaming data comes from JustWatch.
        </p>
        <Shot
          src="/moviest/providers.webp"
          alt="The Severance page scrolled to Where to watch, showing Apple TV and Apple TV on Amazon Channels for the United States, then the cast and a More like this row."
        />
      </>
    ),
  },
  {
    id: 'search',
    title: 'Search by title, by person or by mood',
    body: (
      <>
        <p>
          <Free /> Search the full TMDB catalog by title or by person. When no title comes to mind,
          browse by mood, for example “One last job”, “Quietly unsettling” or “Comfort rewatch”.
        </p>
        <Shot
          src="/moviest/search.webp"
          alt="The search screen with an empty search field, a Search movies & TV heading, and four mood tiles: One last job, Quietly unsettling, After the end and Comfort rewatch."
        />
      </>
    ),
  },
  {
    id: 'discover',
    title: 'Discover and up next',
    body: (
      <>
        <p>
          <Free /> The Discover tab shows what is trending now, and an Up next row with the next
          episode of each show you are watching.
        </p>
        <Shot
          src="/moviest/discover.webp"
          alt="The Discover tab with Klaus as the trending hero and a Watchlist button, and below it an Up next row showing Severance, season 2 episode 6, at 5 of 10."
        />
      </>
    ),
  },
  {
    id: 'lists',
    title: 'Lists you make yourself',
    body: (
      <p>
        <Free /> Make a list, give it a name and add titles in the order you want. For example, the
        ten you would recommend to a friend, the ones for October, or the comfort rewatches.
      </p>
    ),
  },
  {
    id: 'import',
    title: 'Import from IMDb and Trakt',
    body: (
      <p>
        <Free /> Bring your ratings, watch history and watchlist from IMDb or Trakt. Moviest shows
        the titles it cannot match so you can fix them. Importing again does not make duplicates.{' '}
        <Link href="/moviest/import/">How to export and import</Link>.
      </p>
    ),
  },
  {
    id: 'offline',
    title: 'Works with no signal',
    body: (
      <p>
        <Free /> Everything you save is on your device, so your library opens instantly on a plane
        or underground. Moviest has no account and no ads.
      </p>
    ),
  },
  {
    id: 'ipad',
    title: 'iPhone, iPad and iPhone Duo',
    body: (
      <>
        <p>
          <Free /> Moviest runs on iPhone and iPad with iOS 17 or later. On iPad and on the inner
          display of iPhone Duo, it uses a wider layout with more posters on screen.
        </p>
        <Shot
          wide
          src="/moviest/ipad.webp"
          alt="Moviest on iPad: the Library tab on the Watchlist filter, showing three rows of film posters including Sinners, The Substance, Nosferatu, Past Lives and Anora."
        />
      </>
    ),
  },
  {
    id: 'plus',
    title: 'Moviest Plus',
    body: (
      <>
        <p>
          <Plus /> Everything above is free. Moviest Plus is optional and adds:
        </p>
        <ul>
          {PLUS_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p>
          Plus is a monthly or yearly subscription, with a 1-week free trial on the yearly plan, or
          a one-time Lifetime purchase. Apple handles the payment, and you manage the subscription
          in your Apple ID settings.
        </p>
      </>
    ),
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${PAGE_URL}features/`,
  dateModified: UPDATED_ISO,
  about: { '@id': appJsonLd['@id'] },
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd('Features', 'features/')} />
      <JsonLd data={pageJsonLd} />
      <LegalDoc
        keyTitle="In one paragraph"
        title="Film and TV tracker for iPhone and iPad"
        lede="What Moviest does, feature by feature, and what is free and what Moviest Plus adds."
        lastUpdated={UPDATED}
        shortVersion={
          <>
            <p>
              Moviest keeps films and TV shows in one watchlist. It tracks every episode, shows
              return dates, and lets you rate what you watch and see where to stream it. All of that
              is free, with no account and no ads. Moviest Plus adds smart lists and more home
              screen widgets.
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
