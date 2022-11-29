module.exports = {
  siteMetadata: {
    siteUrl: 'https://ltatarev.github.io/',
    author: 'Lucija Tatarević',
    title: 'Lucija Tatarević',
    description: 'personal landing page built with gatsbyjs',
    image:
      'https://user-images.githubusercontent.com/38048916/200418641-5b4c86bb-d495-4367-8515-1bbe758b73d4.png',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'blurred',
          quality: 100,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: 'transparent',
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        theme_color: '#ca718d',
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-P7LZB6D',

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },

      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['DM Sans:300,400,400i,600,700,800'],
        display: 'swap',
      },
    },
  ],
};
