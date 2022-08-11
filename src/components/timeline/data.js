import React from 'react';

export default [
  {
    id: 1,
    year: '2021 -',
    title: 'Shoutem',
    description: 'React Native developer',
  },
  {
    id: 2,
    year: '2019 - 2021',
    title: 'Five Agency',
    description: ['React Native developer'],
    details: [
      <b key={1}>Plato Money - mobile wallet app</b>,
      'React Native, Redux, backend conforming to JSON:API spec',
      <b key={2}>Mint House - apartment booking app</b>,
      `React Native, Redux, Jumio (identity verification), 
       Stripe (payments), Intercom (in-app messaging)`,
      <b key={3}>57hours - mountain guide booking app</b>,
      `React Native, Redux, backend conforming to 
       JSON:API spec, backend in NodeJS`,
    ],
  },
  {
    id: 3,
    year: 'Aug 2019 - Sep 2019',
    title: 'Five Agency',
    description: 'Student intern - React Native Bootcamp',
  },
  {
    id: 4,
    year: '2014 - 2018',
    title: 'Department of Mathematics',
    description: [
      'J. J. Strossmayer University of Osijek',
      'Undergraduate university study programme in mathematics',
    ],
  },
];
