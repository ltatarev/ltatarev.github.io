// Downloads the poster art for the ribbon on the Moviest landing page.
// Edit the pick list in app/(product)/moviest/posters.js, then run:
//
//   npm run posters
//
// Resolving a title needs no API key: TMDB's own pages carry the poster in an
// og:image tag, and its search pages are type-scoped, so a title plus "movie" or
// "tv" is enough. The script prints what each title matched — check that column,
// because a search can land on a remake or a same-named series. Pin a wrong one
// with `tmdb: 'movie/1233413'` in the list and it skips the lookup.
//
// The posters land in the repo rather than being hotlinked, so the page loads
// without a visitor's browser ever contacting TMDB. TMDB is credited in the
// footer of every Moviest page, which is what their terms ask for.

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { POSTERS, posterSlug } from '../app/(product)/moviest/posters.js';

const OUT = 'public/moviest/posters';
// Twice the 96x144 the tiles are drawn at. They're small, masked at both ends and
// sliding, so 2x is the point past which more pixels stop being visible.
const SIZE = { width: 192, height: 288 };
const UA = 'Mozilla/5.0 (compatible; ltatarev.github.io poster fetch)';
const PAUSE = 350; // ms between requests — this is someone else's server

// TMDB localises artwork, and it geolocates to decide how. Run from Germany and
// you get German one-sheets with German taglines burnt into them. Both the header
// and the query parameter are needed: the parameter alone is enough for the title
// pages, but the search pages go by the header.
const get = async (url) => {
  const u = new URL(url);
  if (u.hostname.endsWith('themoviedb.org') && !u.hostname.startsWith('media.')) {
    u.searchParams.set('language', 'en-US');
  }
  const res = await fetch(u, {
    headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9' },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The search page lists each hit twice (poster and title both link to it), so the
// first match is the top result.
async function resolve(entry) {
  if (entry.tmdb) return entry.tmdb;
  const url = `https://www.themoviedb.org/search/${entry.type}?query=${encodeURIComponent(entry.title)}`;
  const html = await (await get(url)).text();
  const hit = html.match(/href="\/(movie|tv)\/(\d+)/);
  if (!hit) throw new Error(`no ${entry.type} result for "${entry.title}"`);
  return `${hit[1]}/${hit[2]}`;
}

// A TMDB page carries two og:image tags — the poster first, then the backdrop.
async function posterUrl(path) {
  const html = await (await get(`https://www.themoviedb.org/${path}`)).text();
  const tag = html.match(/og:image"\s+content="([^"]+)"/);
  if (!tag) throw new Error(`no og:image on /${path}`);
  return tag[1];
}

await mkdir(OUT, { recursive: true });

const rows = [];
let failed = 0;

for (const entry of POSTERS) {
  const slug = posterSlug(entry.title);
  try {
    const path = await resolve(entry);
    await sleep(PAUSE);
    const url = await posterUrl(path);
    await sleep(PAUSE);
    const src = Buffer.from(await (await get(url)).arrayBuffer());
    const out = await sharp(src)
      .resize({ ...SIZE, fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
    await writeFile(`${OUT}/${slug}.webp`, out);
    rows.push([entry.title, path, `${(out.length / 1024).toFixed(1)} KB`]);
  } catch (err) {
    failed += 1;
    rows.push([entry.title, `FAILED — ${err.message}`, '']);
  }
}

// Nothing but this script writes into that directory, so anything in it that the
// list no longer names is a poster for a title that has been swapped out. Dropping
// a title from the list should drop its artwork from the repo, not leave it to be
// noticed six commits later.
const wanted = new Set(POSTERS.map((e) => `${posterSlug(e.title)}.webp`));
for (const file of await readdir(OUT)) {
  if (file.endsWith('.webp') && !wanted.has(file)) {
    await rm(`${OUT}/${file}`);
    console.log(`removed ${file} — no longer in the list`);
  }
}

const pad = (s, n) => String(s).padEnd(n);
const w = [Math.max(...rows.map((r) => r[0].length)), Math.max(...rows.map((r) => r[1].length))];
console.log(`\n${pad('title', w[0])}  ${pad('matched', w[1])}  size`);
for (const r of rows) console.log(`${pad(r[0], w[0])}  ${pad(r[1], w[1])}  ${r[2]}`);
console.log(`\n${rows.length - failed}/${rows.length} written to ${OUT}/`);
if (failed) process.exitCode = 1;
