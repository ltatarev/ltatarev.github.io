// The apps on the shelf, in the order they sit in the dock.
//
// name   — tooltip text and the link's accessible name
// slug   — folder name of that app's page under app/, and of its icon file
// href   — where the icon navigates; every app gets a page at /<slug>/
// icon   — /icons/<slug>.png at 1024×1024 with SQUARE, UNROUNDED art. The dock
//          masks it into the squircle itself, so pre-rounded art rounds twice and
//          the corners go muddy. Leave it null and the entry falls back to the
//          gradient placeholder below, so the dock stays complete while art is
//          still being drawn.
// ph     — the two placeholder gradient stops, and `letter` the glyph on top.
//          Both are ignored once `icon` is set.
// badge  — optional. { text: 'Soon' } is rose, { text: 'Live', live: true } green.
export const apps = [
  {
    name: 'Lumee',
    slug: 'lumee',
    href: '/lumee/',
    icon: '/icons/lumee.png',
    ph: ['#f3c6e0', '#b06aa0'],
    letter: '✨',
    badge: { text: 'Soon' },
  },
  {
    name: 'Plotted',
    slug: 'plotted',
    href: '/plotted/',
    icon: null,
    ph: ['#ff9db0', '#c85f7e'],
    letter: 'P',
    badge: { text: 'Soon' },
  },
  {
    name: 'Photo Cleanup',
    slug: 'photo-cleanup',
    href: '/photo-cleanup/',
    icon: '/icons/photo-cleanup.png',
    ph: ['#a6d6a0', '#4f9b66'],
    letter: '❋',
    badge: { text: 'Soon' },
  },
  {
    name: 'Keepsake',
    slug: 'keepsake',
    href: '/keepsake/',
    icon: null,
    ph: ['#f5ce8a', '#d98f4a'],
    letter: 'K',
    badge: { text: 'Soon' },
  },
  {
    name: 'Moviest',
    slug: 'moviest',
    href: '/moviest/',
    icon: null,
    ph: ['#8fb8f0', '#3f6bc1'],
    letter: 'M',
    badge: { text: 'Live', live: true },
  },
];

// Stand-in icon for apps whose art isn't drawn yet: a gradient tile with the
// app's initial on it, inlined as a data URI so it costs no request. Deterministic,
// so the server and client markup match.
export function placeholderIcon({ ph, letter }) {
  const [from, to] = ph;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/>` +
    `</linearGradient></defs>` +
    `<rect width='100' height='100' fill='url(#g)'/>` +
    `<text x='50' y='52' font-family='Archivo,sans-serif' font-size='44' font-weight='800' ` +
    `fill='rgba(255,255,255,.92)' text-anchor='middle' dominant-baseline='central'>${letter}</text>` +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// The src an entry should render — its real icon once there is one.
export const iconSrc = (app) => app.icon || placeholderIcon(app);
