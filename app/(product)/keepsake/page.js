import { Landing } from './Landing';

const TITLE = 'Keepsake Journal — a month is a puzzle, a day is a piece';
const DESCRIPTION =
  'One question each evening. Write an answer and the day’s piece drops into place. No account, no server — everything stays on your phone.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/keepsake/' },
  openGraph: { type: 'website', url: '/keepsake/', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function KeepsakePage() {
  return <Landing />;
}
