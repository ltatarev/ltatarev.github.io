import { Landing } from './Landing';

const TITLE = 'Photo Cleanup — tidy your camera roll, keep your photos yours';
const DESCRIPTION =
  'An honest, on-device photo cleaner for iPhone. Finds duplicates, near-identical shots, blurry photos and screenshots. Nothing uploads. One-time purchase.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/photo-cleanup/' },
  openGraph: { type: 'website', url: '/photo-cleanup/', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function PhotoCleanupPage() {
  return <Landing />;
}
