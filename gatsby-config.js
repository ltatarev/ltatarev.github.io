module.exports = {
  siteMetadata: {
    siteUrl: 'https://ltatarev.github.io/',
    author: 'ltatarev',
    title: "lucija's homepage",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['epilogue:500', 'open sans:300,400,400i,700'],
        display: 'swap',
      },
    },
  ],
};
