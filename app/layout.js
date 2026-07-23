import { Archivo, Instrument_Serif, Silkscreen } from 'next/font/google';
import Script from 'next/script';
import { Dock } from '@/components/Dock';
import { Footer } from '@/components/Footer';
import { MenuBar } from '@/components/MenuBar';
import './globals.css';

// Carried over from the Gatsby setup (gatsby-plugin-google-tagmanager), which also
// loaded it in production only.
const GTM_ID = 'GTM-P7LZB6D';
const isProd = process.env.NODE_ENV === 'production';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-silkscreen',
  display: 'swap',
});

const SITE = 'https://ltatarev.github.io';
const DESCRIPTION =
  'lucija tatarević — software developer. full-stack & cross-platform mobile, everything javascript.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'lucija tatarević',
  description: DESCRIPTION,
  keywords: ['lucija', 'tatarević', 'software developer', 'react native', 'javascript'],
  authors: [{ name: 'Lucija Tatarević' }],
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
  verification: { google: 'FLPcfobSwhV5Sr-unIaVcYbTHyv1nvUpiJuU1z9z8Kk' },
  icons: { icon: '/icon.png', apple: '/icon.png' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: SITE,
    title: 'lucija tatarević',
    description: DESCRIPTION,
    images: [
      'https://user-images.githubusercontent.com/38048916/200418641-5b4c86bb-d495-4367-8515-1bbe758b73d4.png',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'lucija tatarević',
    description: DESCRIPTION,
    images: [
      'https://user-images.githubusercontent.com/38048916/200418641-5b4c86bb-d495-4367-8515-1bbe758b73d4.png',
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ca718d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${silkscreen.variable}`}>
      <body>
        {isProd && (
          <Script id="gtm" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({platform:'next'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <div className="wallpaper" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <MenuBar />
        <main>{children}</main>
        <Footer />
        <Dock />
      </body>
    </html>
  );
}
