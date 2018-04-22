/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const match = node.fileAbsolutePath.match(RegExp('([^/]+)/[^/]*$'));
    const type = match[1];

    createNodeField({
      node,
      name: 'type',
      value: type,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve('src/templates/pageTemplate.js');
  const blogTemplate = path.resolve('src/templates/blogTemplate.js');

  return graphql(`
    {
      pages: allMarkdownRemark {
        edges {
          node {
            html
            fields {
              type
            }
            frontmatter {
              path
              link
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.pages.edges.forEach(({ node }) => {
      let path = node.frontmatter.path;
      if (!path) {
        path = node.frontmatter.link.replace(
          RegExp('^https://blog.berekuk.ru/'),
          '/'
        );
        path = path.replace(RegExp('/$'), '');
      }

      const template = {
        blog: blogTemplate,
        pages: pageTemplate,
      }[node.fields.type];

      createPage({
        path: path,
        component: template,
        context: {}, // additional data can be passed via context
      });
    });
  });
};
