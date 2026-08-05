import './photo-cleanup.css';

// The stylesheet and theme colour are pinned to this segment rather than to the
// (product) group, so Lumee's lilac tokens and this app's warm/green ones never
// share a document. See app/(product)/layout.js.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2f7a5b',
};

export default function PhotoCleanupLayout({ children }) {
  return children;
}
