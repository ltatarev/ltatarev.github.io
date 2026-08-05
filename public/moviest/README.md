# moviest artwork

Two kinds of image live here, and they're maintained differently.

## Posters — `posters/`

The ribbon on the landing page. **Never edit this folder by hand.** The list of titles
lives in `app/(product)/moviest/posters.js` and the artwork is downloaded from it:

```sh
# 1. edit the POSTERS list in app/(product)/moviest/posters.js
# 2. from the repo root:
npm run posters
```

That resolves every title on TMDB, downloads its poster, resizes it to 192×288 WebP
and deletes any file the list no longer names. Filenames come from the title, so
there's nothing to rename — add `{ title: 'Dune', type: 'movie' }` and you get
`posters/dune.webp`. `type` is `'movie'` or `'tv'`.

Adding, removing and reordering are all just edits to that list. The ribbon repeats
it to fill its width, so any number of titles works; below about fifteen the repeats
start being visible on a wide screen.

**Check the table the script prints.** It shows what each title matched:

```
title                     matched        size
Severance                 tv/95396       5.3 KB
Spiderman: Brand New Day  movie/969681   10.4 KB
```

A search takes the top result, which for a common or reused title can be a remake, a
different adaptation, or a same-named film from 1994. Open `themoviedb.org/<matched>`
if a poster looks wrong, find the right entry, and pin it:

```js
{ title: 'Shōgun', type: 'tv', tmdb: 'tv/126308' },
```

With `tmdb` set the script skips the search entirely and goes straight to that page.

No API key is needed — TMDB's own pages carry the poster in an `og:image` tag. The
script asks for `language=en-US`, otherwise TMDB serves artwork localised to wherever
it thinks you are, and you end up with German one-sheets with German taglines on them.

The posters are committed to this repo rather than hotlinked from TMDB, so loading
the page never sends a visitor's IP to a third party. TMDB is credited in the footer
of every Moviest page, which is what their terms ask for.

## Screenshots — `hero.webp`, `library.webp`, `episodes.webp`, `rate.webp`

Captures from the app, shown inside the phone frames. These are hand-made, not
generated — replace one by exporting a fresh 440×956 screenshot, resizing it to
**912px wide** and saving as WebP at quality 82 over the top of the old file. Which
image goes in which frame is set in `app/(product)/moviest/Landing.js`.

If you change a screenshot, re-read its `alt` text in `Landing.js` — it describes
what's actually on screen, down to the titles and the score.
