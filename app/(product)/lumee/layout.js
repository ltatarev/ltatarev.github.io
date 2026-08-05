import './lumee.css';

// Satoshi is a Fontshare face, so it can't come from next/font/google like the
// desktop's Archivo does. React hoists a <link> carrying `precedence` into <head>
// and dedupes it across the two Lumee routes, which is enough here — the stack in
// lumee.css falls back cleanly if the request never lands.
const FONTSHARE = 'https://api.fontshare.com/v2/css?f%5B%5D=satoshi@400,500,700,900&display=swap';

// Pinned to this segment rather than the (product) group so the lilac palette and
// Photo Cleanup's warm/green one never share a document. See app/(product)/layout.js.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3e7fb',
};

export default function LumeeLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTSHARE} precedence="default" />
      {children}
    </>
  );
}
