import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { SMART_BANNER } from './appstore';
import './moviest.css';
import styles from './shell.module.css';

// Both faces are on Google Fonts, so unlike Lumee's Satoshi they can come through
// next/font and be self-hosted — no third-party request on the critical path and no
// swap once it lands. The catch is that a nested layout can't put a class on <html>,
// where the root layout hangs its own font variables, so they go on a wrapper here
// instead. Custom properties inherit, so --font-outfit and --font-jakarta reach
// everything on the page; shell.module.css turns them into --font/--font-display on
// the same element. See the note at the top of moviest.css.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

// The Smart App Banner Safari draws on iOS. It sits on the layout rather than on
// page.js so the legal pages carry it too — someone who lands on the privacy policy
// from the App Store listing gets the same way back. Next merges `other` from here
// with each page's own title and description, which none of them redefine.
export const metadata = {
  other: { 'apple-itunes-app': SMART_BANNER },
};

// Pinned to this segment rather than the (product) group so the aubergine palette
// never shares a document with Photo Cleanup's warm/green one or Lumee's lilac.
// See app/(product)/layout.js.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e0a16',
};

export default function MoviestLayout({ children }) {
  return <div className={`${outfit.variable} ${jakarta.variable} ${styles.root}`}>{children}</div>;
}
