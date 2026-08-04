import './product.css';

// Product pages opt out of the desktop chrome entirely — no wallpaper, menu bar,
// dock or charm cursor — so each one reads as its own little product site sitting
// at a subpath. See product.css for why this is a route group.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2f7a5b',
};

export default function ProductLayout({ children }) {
  return children;
}
