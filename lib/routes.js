// Where the design systems meet.
//
// app/(site) loads globals.css and each product under app/(product) loads its own
// stylesheet, and they are meant to be mutually exclusive — one paints the paper
// desktop, the others their own product page. The route groups keep them apart on
// a fresh request, but they do NOT keep them apart on a client-side navigation:
// Next leaves a route's stylesheet in the document after you navigate away from it,
// so hopping from the desktop to a product page leaves both cascades live at once.
// The desktop's `body { background: var(--paper) }` and its `overflow-x: hidden`
// come along for the ride, and that overflow makes body a scroll container, which
// silently kills every `position: sticky` on the product page — Photo Cleanup's
// scroll-scrubbed phone and sticky nav both stop working until you reload.
//
// The same applies between two products: Photo Cleanup and Lumee both define
// --bg, --text, --accent and --font, so whichever stylesheet stayed behind wins
// wherever the other doesn't set the same property, and the page comes out in a
// mix of both palettes.
//
// So crossing the boundary has to be a real document load: the old stylesheet is
// dropped with the old document, and each side starts from a clean cascade.
// Anything linking across it uses a plain <a> rather than next/link, and anything
// navigating in JS uses location.assign rather than router.push. Links *within*
// one product are ordinary next/link — that side of the boundary is one cascade.
const PRODUCT_ROUTES = ['/photo-cleanup/', '/lumee/', '/moviest/'];

export const isProductRoute = (href) => PRODUCT_ROUTES.some((route) => href.startsWith(route));
