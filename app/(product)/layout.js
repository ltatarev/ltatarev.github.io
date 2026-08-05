// Product pages opt out of the desktop chrome entirely — no wallpaper, menu bar,
// dock or charm cursor — so each one reads as its own little product site sitting
// at a subpath.
//
// This layout deliberately loads no stylesheet. Each product brings its own design
// system and its own <body> paint — Photo Cleanup is warm neutrals and green on the
// iOS type ramp, Lumee is lilac and Satoshi — and both write the same token names
// (--bg, --text, --accent, --font). A shared stylesheet here would put one product's
// palette on the other's page, so the CSS import and the theme colour live in each
// product's own layout instead. See lib/routes.js for why crossing between two of
// these route groups has to be a real document load.
export default function ProductLayout({ children }) {
  return children;
}
