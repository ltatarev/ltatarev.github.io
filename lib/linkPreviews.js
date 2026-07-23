// Hover-card copy for the outbound links in the experience list, keyed by the
// exact href. components/ui/LinkPreview.js looks each one up on hover and floats
// a preview card — an App Store / GitHub "rich link" in the site's own card
// language (eyebrow + serif title + sparkle + dotted tether).
export const linkPreviews = {
  'https://apps.apple.com/us/app/celebrate-share-photo-video/id1453163913': {
    eyebrow: 'App Store',
    title: 'Celebrate',
    sub: 'Share photos & videos and turn them into printed keepsakes.',
    accent: '#e8799b',
  },
  'https://apps.apple.com/us/app/kartenmacherei/id6466997065': {
    eyebrow: 'App Store',
    title: 'Kartenmacherei',
    sub: 'Personalised cards & photo products for every occasion.',
    accent: '#4b9fd6',
  },
  'https://apps.apple.com/us/app/rosemood-photo-books-prints/id1313272123': {
    eyebrow: 'App Store',
    title: 'Rosemood',
    sub: 'Elegant photo books, cards & prints.',
    accent: '#c98aa0',
  },
  'https://apps.apple.com/us/app/disclose/id1591921539': {
    eyebrow: 'App Store',
    title: 'Disclose',
    sub: 'Push notifications & live project previews for Shoutem.',
    accent: '#b0adf2',
  },
  'https://github.com/shoutem/platform': {
    eyebrow: 'GitHub',
    title: 'shoutem/platform',
    sub: 'The core of the Shoutem app-building platform.',
    accent: '#8b83e0',
  },
  'https://github.com/ltatarev/react-native-shopify': {
    eyebrow: 'GitHub',
    title: 'react-native-shopify',
    sub: 'A native Shopify SDK bridged into React Native.',
    accent: '#7ab55c',
  },
  'https://github.com/shoutem/ui': {
    eyebrow: 'GitHub',
    title: '@shoutem/ui',
    sub: 'Styleable React Native UI component toolkit.',
    accent: '#8b83e0',
  },
  'https://github.com/shoutem/eslint-config': {
    eyebrow: 'GitHub',
    title: '@shoutem/eslint-config',
    sub: 'Shared ESLint rules across Shoutem projects.',
    accent: '#8b83e0',
  },
};
