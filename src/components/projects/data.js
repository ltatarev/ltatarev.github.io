import { resolveImage } from './service';

export default [
  {
    id: 1,
    title: 'Moviest',
    description: 'Web app for browsing through TV shows and movies',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124809471-705e1300-df60-11eb-8d6c-8d79756fdc04.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/the-moviest',
    color: 'purple',
    demoUrl: 'http://the-moviest.herokuapp.com/',
  },
  {
    id: 2,
    title: 'Translatia',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/153944916-bb27c380-2bdc-496c-bdc6-3dbf8a13457f.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/translatia',
    color: 'blue',
    demoUrl: 'https://ltatarev.github.io/translatia/',
  },
  {
    id: 3,
    title: 'React Native to do',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124808519-540da680-df5f-11eb-922d-1f5953ce514b.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/react-native-to-do',
    color: 'blue',
  },
  {
    id: 4,
    title: 'React Native news',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124803811-dbf0b200-df59-11eb-852f-bc36090b8ca7.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/news-app',
    color: 'peach',
  },

  {
    id: 6,
    title: 'Electron to do',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/124805257-903f0800-df5b-11eb-85da-a1ac65eefd79.gif',
    ),
    sourceUrl: 'https://github.com/ltatarev/electron-to-do',
    color: 'blue',
  },
  {
    id: 7,
    title: '3 day weather',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://camo.githubusercontent.com/4b728d0b1220e4e31c6092202fd3314541f8a049eab9a4dcab8862c11ed522c5/68747470733a2f2f692e696d6775722e636f6d2f78727a7379546f2e706e67',
    ),
    sourceUrl: 'https://github.com/ltatarev/3-day-weather',
    color: 'pink',
    demoUrl: 'https://threedayweather.herokuapp.com/',
  },
  {
    id: 8,
    title: 'Knjigoteka',
    tags: ['mean', 'tmbd', 'react'],
    image: resolveImage(
      'https://user-images.githubusercontent.com/38048916/200149160-47869e6a-6e59-4451-aac1-6cf01938c490.png',
    ),
    sourceUrl: 'https://github.com/ltatarev/3-day-weather',
    color: 'pink',
    demoUrl: 'https://threedayweather.herokuapp.com/',
  },
];
