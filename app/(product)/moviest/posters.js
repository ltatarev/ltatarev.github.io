// The films and shows in the landing page's poster ribbon. This list is the only
// place to edit them; after changing it run
//
//   node scripts/moviest-posters.mjs
//
// which resolves each entry on TMDB, downloads the poster and writes it into
// public/moviest/posters/. The artwork is served from this repo rather than
// hotlinked, so a visitor's browser never has to talk to TMDB to load the page.
//
// `type` picks which TMDB search to run — films and series share titles often
// enough that guessing gets it wrong. If a search still lands on the wrong entry,
// pin it with `tmdb: 'movie/1233413'` and the script skips the lookup.
//
// The ribbon repeats the list to fill its width, so any number of titles works.
export const POSTERS = [
  // The seven the screenshots on this page are actually showing.
  // pinned: an unqualified search finds the 1980 miniseries, not the 2024 one
  { title: 'Shōgun', type: 'tv', tmdb: 'tv/126308' },
  { title: 'Andor', type: 'tv' },
  { title: 'Silo', type: 'tv' },
  { title: 'The Last of Us', type: 'tv' },
  { title: 'Severance', type: 'tv' },
  { title: 'Sinners', type: 'movie' },
  { title: 'Spiderman: Brand New Day', type: 'movie' },
  // The rest of the titles the drafts named.
  { title: 'Sheep Detectives', type: 'movie' },
  { title: 'The Office', type: 'tv' },
  { title: 'Past Lives', type: 'movie' },
  { title: 'Project Hail Mary', type: 'movie' },
  { title: 'Obsession', type: 'movie' },
  { title: 'The Substance', type: 'movie' },
  { title: 'The Bear', type: 'tv' },
  { title: 'Shrinking', type: 'tv' },
];

// Filenames are derived from the title so the list above stays the single source
// of truth — there is no second place to keep in sync. Shared by the page and the
// download script.
export const posterSlug = (title) =>
  title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const posterSrc = (entry) => `/moviest/posters/${posterSlug(entry.title)}.webp`;
