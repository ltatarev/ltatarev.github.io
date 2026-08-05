import { Poppins, Source_Serif_4 } from 'next/font/google';
import './keepsake.css';
import styles from './shell.module.css';

// Both faces are on Google Fonts, so like Moviest's and unlike Lumee's Satoshi they
// come through next/font and are self-hosted — no third-party request on the critical
// path and no swap once they land. A nested layout can't put a class on <html>, where
// the root layout hangs its own font variables, so they go on a wrapper here instead;
// shell.module.css turns them into --serif and --sans on the same element. See the
// note at the top of keepsake.css.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-source-serif',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
  display: 'swap',
});

// Pinned to this segment rather than the (product) group so the paper palette never
// shares a document with Photo Cleanup's warm/green one, Lumee's lilac or Moviest's
// aubergine. See app/(product)/layout.js.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#efebe3',
};

export default function KeepsakeLayout({ children }) {
  return (
    <div className={`${sourceSerif.variable} ${poppins.variable} ${styles.root}`}>{children}</div>
  );
}
