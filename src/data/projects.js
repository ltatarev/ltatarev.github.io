import { resolveImage } from '../common';

export const projects = [
  {
    id: 1,
    title: 'Moviest',
    description: 'Web app for browsing through TV shows and movies',
    tags: ['nextjs', 'mongodb', 'tmdb'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/206591569-ecfd781d-5404-48aa-9268-40cd80bedcc2.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/the-moviest',
    demoUrl: 'https://the-moviest.vercel.app/',
    color: 'purple',
  },
  {
    id: 2,
    title: 'Translatia',
    description: 'Web application for editing and translating .srt subtitles',
    tags: ['react', 'redux', 'vite'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/153944916-bb27c380-2bdc-496c-bdc6-3dbf8a13457f.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/translatia',
    color: 'blue',
    demoUrl: 'https://ltatarev.github.io/translatia/',
  },
  {
    id: 3,
    title: 'Knjigoteka',
    description: 'Organization landing page',
    tags: ['gatsbyjs', 'contentful cms'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/200192099-a222512e-0d7e-4cc3-945d-d82b52f57ab6.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/knjigoteka-web',
    color: 'pink',
    demoUrl: 'https://knjigoteka.club/',
  },
  {
    id: 9,
    title: 'React Native template',
    description: 'Modern template for bootstrapping your app',
    tags: ['react native', 'redux', 'react navigation'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/208326220-37928d96-5c1d-448d-b6ee-b854143add25.png',
    ),
    color: 'purple',
    sourceUrl: 'https://github.com/ltatarev/react-native-template',
  },
  {
    id: 10,
    title: 'NextJS blog',
    description: 'Clean colorful personal blog',
    tags: ['nextjs', 'i18n', 'vercel'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/208768219-3e2d1306-9c6d-4eb4-959f-09d10293f00e.png',
    ),
    color: 'purple',
    sourceUrl: 'https://github.com/ltatarev/react-native-template',
    demoUrl: 'https://nextjs-blog-pi-amber.vercel.app/',
  },
  {
    id: 4,
    title: 'React Native to do',
    description: 'Mobile app that lets you create to do lists and tasks',
    tags: ['react native', 'redux'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124808519-540da680-df5f-11eb-922d-1f5953ce514b.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/react-native-to-do',
    color: 'peach',
  },
  {
    id: 5,
    title: 'React Native news',
    description: 'App for latest news using newsapi.org',
    tags: ['react native', 'newsapi.org'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124803811-dbf0b200-df59-11eb-852f-bc36090b8ca7.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/news-app',
    color: 'blue',
  },
  {
    id: 6,
    title: 'ltatarev.github.io',
    description: 'Personal landing page',
    tags: ['gatsbyjs', 'github pages'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/206591055-5061e6f6-8620-4316-af62-25ed51a51a79.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/ltatarev.github.io',
    color: 'purple',
  },
  {
    id: 7,
    title: 'Electron to do',
    description: 'Basic to do app in Electron with electron-forge',
    tags: ['electron', 'electron store'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124805257-903f0800-df5b-11eb-85da-a1ac65eefd79.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/electron-to-do',
    color: 'purple',
  },
  {
    id: 8,
    title: '3 day weather',
    description: 'Website for browsing weather forecast',
    tags: ['html', 'css', 'javascript'],
    image: resolveImage(
      'https://camo.githubusercontent.com/4b728d0b1220e4e31c6092202fd3314541f8a049eab9a4dcab8862c11ed522c5/68747470733a2f2f692e696d6775722e636f6d2f78727a7379546f2e706e67',
    ),
    sourceUrl: 'https://github.com/ltatarev/3-day-weather',
    color: 'pink',
    demoUrl: 'https://ltatarev.github.io/3-day-weather/',
  },
];
