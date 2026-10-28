import { DM_Mono, Instrument_Sans, Outfit } from 'next/font/google';
import './paper.css';
import styles from './paper.module.css';

// The "paper" theme: an alternate look for the whole portfolio — cream paper,
// chunky Outfit headlines, butter and blush surface cards, tilted cut-outs held
// on with paper clips and tape. It reads the same data as the desktop theme
// (lib/projects.js, lib/apps.js, lib/experience.js …) so the two never drift apart;
// only the presentation differs.
//
// It lives in a route group of its own for the same reason the product pages do:
// its tokens and body paint must never share a cascade with app/globals.css. Links
// between "/" and "/paper/" are plain <a> tags (a real document load). See
// lib/routes.js.
//
// As with Moviest, a nested layout can't put a class on <html>, so the font
// variables hang off the wrapper and inherit down.
const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-isans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dmmono',
  display: 'swap',
});

export const metadata = {
  title: 'lucija tatarevic — paper',
  alternates: { canonical: 'https://ltatarev.github.io/paper/' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFCF6' },
    { media: '(prefers-color-scheme: dark)', color: '#141216' },
  ],
};

export default function PaperLayout({ children }) {
  return (
    <div className={`${outfit.variable} ${instrumentSans.variable} ${dmMono.variable} ${styles.root}`}>
      {children}
    </div>
  );
}
