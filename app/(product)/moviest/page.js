import { appJsonLd, faqJsonLd } from './facts';
import { JsonLd } from './JsonLd';
import { Landing } from './Landing';

// The H1 on the page stays the brand line. The title and description carry the
// words people search for: film and TV tracker, iPhone and iPad, free.
const TITLE = 'Moviest — Film & TV Tracker for iPhone and iPad';
const SOCIAL_TITLE = 'Moviest — one watchlist for films and TV';
const DESCRIPTION =
  'Track films and TV shows in one watchlist. Tick off episodes, see return dates, rate what you watch and find where to stream it. Free, no account, no ads.';
const IMAGE = {
  url: '/moviest/og.png',
  width: 1200,
  height: 630,
  alt: 'Moviest on iPhone: one watchlist for films and shows',
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/' },
  openGraph: {
    type: 'website',
    siteName: 'Moviest',
    url: '/moviest/',
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

export default function MoviestPage() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Landing />
    </>
  );
}
