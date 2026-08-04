// Where the two design systems meet.
//
// app/(site) loads globals.css and app/(product) loads product.css, and the two
// are meant to be mutually exclusive — one paints the paper desktop, the other a
// warm-neutral product page. The route groups keep them apart on a fresh request,
// but they do NOT keep them apart on a client-side navigation: Next leaves a
// route's stylesheet in the document after you navigate away from it, so hopping
// from the desktop to a product page leaves both cascades live at once. The
// desktop's `body { background: var(--paper) }` and its `overflow-x: hidden`
// come along for the ride, and that overflow makes body a scroll container, which
// silently kills every `position: sticky` on the product page — the scroll-scrubbed
// phone and the sticky nav both stop working until you reload.
//
// So crossing the boundary has to be a real document load: the old stylesheet is
// dropped with the old document, and each side starts from a clean cascade.
// Anything linking across it uses a plain <a> rather than next/link, and anything
// navigating in JS uses location.assign rather than router.push.
const PRODUCT_ROUTES = ['/photo-cleanup/'];

export const isProductRoute = (href) => PRODUCT_ROUTES.some((route) => href.startsWith(route));
