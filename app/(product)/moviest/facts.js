import { APP_ID, APP_STORE } from './appstore';

// The product facts every Moviest page states, in one place. The landing FAQ, the
// facts page, the JSON-LD and /llms.txt all read from here, so a search engine or
// an AI assistant that compares them finds the same answer each time.
//
// The source of truth is the App Store listing, not PRODUCT.md in the app repo.
// PRODUCT.md also describes planned work. Check a claim against the listing before
// you add it here: Letterboxd import and iCloud sync of the library are NOT shipped.

export const SITE = 'https://ltatarev.github.io';
export const PAGE_URL = `${SITE}/moviest/`;

export const NAME = 'Moviest';
export const STORE_NAME = 'Moviest: Film & TV Tracker';
export const SUBTITLE = 'One watchlist for films and TV';
export const DEVELOPER = 'Lucija Tatarević';
export const GITHUB = 'https://github.com/ltatarev';

// Change both when a fact on this page changes.
export const UPDATED = '4 November 2026';
export const UPDATED_ISO = '2026-11-04';

export const SUMMARY =
  'Moviest is a free film and TV tracker for iPhone and iPad. It keeps films and shows in one watchlist, tracks every episode, shows return dates, and lets you rate what you watch and see where to stream it. No account, no ads, no tracking.';

export const PLUS_FEATURES = ['Smart lists that fill themselves', 'More home screen widgets'];

export const FEATURES = [
  'One watchlist for films and TV shows',
  'Episode tracking for every show',
  'Upcoming episodes and release dates, grouped by month',
  'Ratings and reviews',
  'Lists you make yourself',
  'Where to watch: stream, rent and buy, by country',
  'Search by title, by person or by mood',
  'Import from IMDb and Trakt',
  'Works offline',
  'Home screen widgets',
];

// Rows for the facts page and /llms.txt. `link` is optional.
export const FACTS = [
  { key: 'Product', value: NAME },
  { key: 'App Store name', value: STORE_NAME },
  {
    key: 'What it does',
    value: 'Tracks films and TV shows in one watchlist, with episode progress, ratings and reviews',
  },
  { key: 'Developer', value: DEVELOPER },
  { key: 'Category', value: 'Entertainment' },
  {
    key: 'Platforms',
    value: 'iPhone and iPad, optimized for iPhone Duo (outer and inner display)',
  },
  { key: 'Minimum OS', value: 'iOS 17 and iPadOS 17' },
  { key: 'Android', value: 'No Android version' },
  { key: 'Price', value: 'Free to download and use' },
  { key: 'Paid tier', value: `Moviest Plus, optional: ${PLUS_FEATURES.join(', ').toLowerCase()}` },
  {
    key: 'Plus billing',
    value:
      'Monthly or yearly subscription (1-week free trial on yearly), or a one-time Lifetime purchase',
  },
  { key: 'Account', value: 'None. There is no sign-up and no login' },
  { key: 'Where data is kept', value: 'On your device. It is included in your device backup' },
  { key: 'Ads and tracking', value: 'No ads, no tracking, no algorithmic feed' },
  { key: 'Social features', value: 'None. There is no feed and no follower count' },
  { key: 'Offline', value: 'Your saved library opens with no connection' },
  { key: 'Import', value: 'IMDb (CSV export) and Trakt (JSON export)', link: '/moviest/import/' },
  {
    key: 'Catalog data',
    value: 'TMDB. Moviest uses the TMDB API but is not endorsed or certified by TMDB',
  },
  { key: 'Streaming availability', value: 'JustWatch' },
  {
    key: 'Web version',
    value: 'the-moviest.vercel.app, for browsing only. The watchlist and ratings are in the app',
  },
  { key: 'Download', value: 'App Store', link: APP_STORE },
];

// The FAQ on the landing page and its FAQPage JSON-LD. Answers are plain strings so
// the visible text and the structured data are the same words.
export const FAQ = [
  {
    q: 'Is Moviest free?',
    a: 'Yes. Moviest is free to download, and the watchlist, episode tracking, ratings, lists, search and import are all free. Moviest Plus is optional. It adds smart lists that fill themselves and more home screen widgets. Plus is a monthly or yearly subscription, with a 1-week free trial on the yearly plan, or a one-time Lifetime purchase.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Moviest has no sign-up and no login. You open the app and start adding films and shows.',
  },
  {
    q: 'Where is my data kept?',
    a: 'On your device. Your watchlist, episode progress, ratings and lists stay on your iPhone or iPad and are part of your device backup. There are no ads, no tracking and no algorithmic feed.',
  },
  {
    q: 'Can I import my history from IMDb or Trakt?',
    a: 'Yes. Moviest imports your IMDb ratings and watchlist from the CSV export, and your Trakt history, ratings and watchlist from the JSON export. Importing again does not make duplicates.',
  },
  {
    q: 'Does Moviest work on iPad and iPhone Duo?',
    a: 'Yes. Moviest runs on iPhone and iPad with iOS 17 or later, and has layouts for both displays of iPhone Duo. There is no Android version.',
  },
  {
    q: 'Does Moviest work offline?',
    a: 'Yes. Everything you saved is on your device, so your library opens instantly with no signal. Search, new title pages and where-to-watch data need a connection.',
  },
  {
    q: 'Can I see where a film or show is streaming?',
    a: 'Yes. Each title page shows which services stream, rent or sell it in your country, with your own services marked. The streaming data comes from JustWatch.',
  },
  {
    q: 'Where does the film and TV data come from?',
    a: 'From TMDB, The Movie Database. Moviest uses the TMDB API but is not endorsed or certified by TMDB.',
  },
];

const author = { '@type': 'Person', name: DEVELOPER, url: SITE, sameAs: [GITHUB] };

export const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${PAGE_URL}#app`,
  name: NAME,
  alternateName: STORE_NAME,
  description: SUMMARY,
  url: PAGE_URL,
  image: `${PAGE_URL}og.png`,
  screenshot: ['library', 'episodes', 'rate', 'providers'].map((s) => `${SITE}/moviest/${s}.webp`),
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'iOS 17.0 or later, iPadOS 17.0 or later',
  installUrl: APP_STORE,
  downloadUrl: APP_STORE,
  sameAs: [`https://apps.apple.com/app/id${APP_ID}`],
  // The download price. Moviest Plus is an optional in-app purchase on top.
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: FEATURES,
  author,
  publisher: author,
  dateModified: UPDATED_ISO,
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
