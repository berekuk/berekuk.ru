module.exports = {
  siteMetadata: {
    title: 'Вячеслав Матюхин',
    siteUrl: 'https://berekuk.ru',
    description:
      'Вячеслав Матюхин. Прикладная рациональность: блог, коучинг, движение lesswrong.ru.',
    keywords: 'lesswrong, рациональность, кочерга, коучинг',
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
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
    'gatsby-plugin-typography',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  description: edge.node.excerpt,
                  title: edge.node.frontmatter.title,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                };
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 20,
                filter: { fields: { type: { eq: "blog" } } },
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      path
                      title
                      date
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
};
