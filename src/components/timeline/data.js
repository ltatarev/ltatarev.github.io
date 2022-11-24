import React from 'react';

export default [
  {
    id: 1,
    year: '2021 -',
    title: 'Shoutem',
    description: 'React Native developer',
    details: [
      <b key={2}>Shoutem platform</b>,
      <p
        key={2}
        style={{ display: 'inline', marginBlockStart: 0, marginBlockEnd: 0 }}
      >
        Developed new{' '}
        <a href="https://github.com/shoutem/extensions">extensions</a>{' '}
        (affiliate, notification journeys, e-commerce integrations). Worked on
        native integration of Shopify SDK
      </p>,

      <b key={2}>Disclose - Shoutem companion app</b>,
      'Developed mobile app used for sending push notifications and previewing Shoutem projects. Worked on native implementation of opening multiple React Native bundles inside one app. ',
      <b key={3}>Open source projects</b>,
      <p
        key={2}
        style={{ display: 'inline', marginBlockStart: 0, marginBlockEnd: 0 }}
      >
        • maintained and improved{' '}
        <a href="https://github.com/shoutem/ui">@shoutem/ui</a> component
        library
      </p>,
      <p
        key={2}
        style={{ display: 'inline', marginBlockStart: 0, marginBlockEnd: 0 }}
      >
        • worked on modernizing and improving{' '}
        <a href="https://github.com/shoutem/eslint-config">
          @shoutem/eslint-config
        </a>{' '}
        package
      </p>,
    ],
  },
  {
    id: 2,
    year: '2018 - 2021',
    title: 'Five Agency',
    description: ['React Native developer'],
    details: [
      <b key={1}>Plato Money - mobile wallet app</b>,
      '• developed fintech mobile wallet app integrated with TradeCore API',
      '• worked with project designer on improving client UX',
      <b key={2}>PuppySpot - puppy companion app</b>,
      '• maintained and bugfixed puppy travel companion app',
      "• worked on developing solutions based on client's specifications within short deadlines",
      <b key={2}>Mint House - apartment booking app</b>,
      '• implemented integration with property management platform',
      `• worked on integrations with Jumio (identity verification), 
      Stripe, Intercom (in-app messaging)`,
      <b key={3}>57hours - mountain guide booking app</b>,
      `• maintained and developed mountain guide booking app
       with NodeJS backend conforming to JSON:API spec`,
    ],
  },
  {
    id: 3,
    year: 'Aug 2018 - Sep 2018',
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
