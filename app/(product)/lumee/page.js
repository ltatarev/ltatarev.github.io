import { Landing } from './Landing';

const TITLE = 'Lumee — see your feed before you post';
const DESCRIPTION =
  'Lumee is a quiet little planner for your Instagram grid. Rearrange posts, drop in placeholders, write captions ahead of time. iPhone and iPad.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/lumee/' },
  openGraph: { type: 'website', url: '/lumee/', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function LumeePage() {
  return <Landing />;
}
