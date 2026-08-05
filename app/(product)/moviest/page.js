import { Landing } from './Landing';

const TITLE = 'Moviest — one watchlist for films and shows';
const DESCRIPTION =
  'Track films and shows in one watchlist. Tick off episodes, catch return dates, rate things while they’re fresh. Yours, on your phone.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moviest/' },
  openGraph: { type: 'website', url: '/moviest/', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function MoviestPage() {
  return <Landing />;
}
