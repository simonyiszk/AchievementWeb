const siteMetadata = {
  name: 'Gatsby Strict Starter',
  description:
    'Demo for a Gatsby starter with strict linting and auto-formatting rules.',
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-plugin-chakra-ui`],
      },
    },
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-emotion',
    /*{
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgo: true,
        ref: true,
      },
    },*/
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        ...siteMetadata,
        short_name: `starter`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: 'src/images/favicon.png',
        lang: 'en-US',
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/group/*`, `/achievement/*`] },
    },
  ],
};
