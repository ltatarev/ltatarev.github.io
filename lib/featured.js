import { projects } from './projects';

// The pinned cards reuse the Finder entries for links, kind and tags, and add a
// preview mockup plus slightly longer copy than the folder view shows.
const find = (name) => projects.find((p) => p.name === name);

const moviest = find('Moviest');
const translatia = find('Translatia');
const rnTemplate = find('RN Template');

export const featured = [
  {
    name: moviest.name,
    // titlebar text, which is not always the project name
    window: 'Moviest',
    kind: moviest.kind,
    tags: moviest.tags,
    desc: 'Browse films and shows through a fast, poster-forward interface built on the TMDB API.',
    preview: 'moviest',
    url: 'the-moviest.vercel.app',
    links: [
      { label: 'Open demo ↗', href: moviest.demo },
      { label: 'Code', href: moviest.code, muted: true },
    ],
  },
  {
    name: translatia.name,
    window: 'Translatia',
    kind: translatia.kind,
    tags: translatia.tags,
    desc: 'Edit and translate .srt subtitle files entirely in the browser — nothing ever leaves your machine.',
    preview: 'translatia',
    url: 'ltatarev.github.io/translatia',
    links: [
      { label: 'Open demo ↗', href: translatia.demo },
      { label: 'Code', href: translatia.code, muted: true },
    ],
  },
  {
    name: rnTemplate.name,
    window: 'react-native-template — zsh',
    kind: rnTemplate.kind,
    tags: rnTemplate.tags,
    desc: 'An opinionated React Native starter so a new app is running — properly wired — in minutes.',
    preview: 'terminal',
    links: [
      { label: 'View repo ↗', href: rnTemplate.code },
      { label: 'More work', href: '/#work', muted: true, internal: true },
    ],
  },
];

// poster tiles for the Moviest preview
export const posters = [
  'linear-gradient(160deg,#f6a6a6,#c85f6b)',
  'linear-gradient(160deg,#8fc0f0,#4a7fc1)',
  'linear-gradient(160deg,#f5ce8a,#d09a4a)',
  'linear-gradient(160deg,#b0adf2,#6f6bd0)',
  'linear-gradient(160deg,#a6d6a0,#5f9b66)',
  'linear-gradient(160deg,#f2aec8,#b8607f)',
  'linear-gradient(160deg,#97d8e8,#4f9db3)',
  'linear-gradient(160deg,#c9c6be,#8f8a7e)',
];

// subtitle rows for the Translatia preview
export const subtitles = [
  { at: '00:04' },
  { at: '00:09', active: true },
  { at: '00:13', w: '88%' },
  { at: '00:18', w: '66%' },
  { at: '00:22', w: '92%' },
];
