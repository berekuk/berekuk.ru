module.exports = {
  siteMetadata: {
    title: 'Вячеслав Матюхин',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-35747472-4',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'berekuk.ru',
        short_name: 'berekuk.ru',
        start_url: '/',
        background_color: 'white',
        theme_color: 'white',
        display: 'browser',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
