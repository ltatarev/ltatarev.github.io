import React from 'react';

export default [
  {
    id: 1,
    year: '2021 -',
    title: 'Shoutem',
    description: 'React Native developer',
    details: [
      {
        title: 'Shoutem platform',
        description: [
          <p key={1}>
            • developed new{' '}
            <a href="https://github.com/shoutem/extensions">extensions</a>{' '}
            (affiliate, notification journeys, e-commerce integrations)
          </p>,
          '• worked on native integration of Shopify SDK',
        ],
      },
      {
        title: 'Disclose',
        subtitle: '📱 Shoutem companion app',
        description: [
          '• developed mobile app used for sending push notifications and previewing Shoutem projects.',
          '• worked on native implementation of opening multiple React Native bundles inside one app.',
        ],
      },
      {
        title: 'Open source projects',
        description: [
          <p key={2}>
            • maintained and improved{' '}
            <a href="https://github.com/shoutem/ui">@shoutem/ui</a> component
            library
          </p>,
          <p key={2}>
            • worked on modernizing and improving{' '}
            <a href="https://github.com/shoutem/eslint-config">
              @shoutem/eslint-config
            </a>{' '}
            package
          </p>,
        ],
      },
    ],
  },
  {
    id: 2,
    year: '2018 - 2021',
    title: 'Five Agency',
    description: 'React Native developer',
    details: [
      {
        title: 'Plato Money',
        subtitle: '💰 mobile wallet app',
        description: [
          '• developed fintech mobile wallet app integrated with TradeCore API',
          '• worked with project designer on improving client UX',
        ],
      },
      {
        title: 'PuppySpot',
        subtitle: '🐶 puppy companion app',
        description: [
          '• maintained and bugfixed puppy travel companion app',
          "• worked on developing solutions based on client's specifications within short deadlines",
        ],
      },
      {
        title: 'Mint House',
        subtitle: '🏘 apartment booking app',
        description: [
          '• implemented integration with property management platform',
          '• worked on integrations with Jumio (identity verification), Stripe, Intercom (in-app messaging)',
        ],
      },
      {
        title: '57hours',
        subtitle: '🏔 mountain guide booking app',
        description: [
          '• maintained and developed mountain guide booking app  with NodeJS backend conforming to JSON:API spec',
        ],
      },
    ],
  },
  {
    id: 3,
    year: 'Aug 2018 - Sep 2018',
    title: 'Five Agency',
    description: 'Student intern',
    details: [
      {
        title: 'React Native Bootcamp',
        description:
          'Worked on developing simple React Native to do and news app',
      },
    ],
  },
];
