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

  graphql(`
    {
      pages: allMarkdownRemark(filter: {fields: {type: {eq: "pages"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const pages = result.data.pages.edges;

    pages.forEach(({ node }) => {
      const path = node.frontmatter.path;

      createPage({
        path: path,
        component: pageTemplate,
      });
    });
  });

  const blogTemplate = path.resolve('src/templates/blogTemplate.js');

  return graphql(`
    {
      posts: allMarkdownRemark(
        filter: {fields: {type: {eq: "blog"}}},
        sort: { order: ASC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            html
            frontmatter {
              path
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

    const posts = result.data.posts.edges;
    posts.forEach(({ node }, index) => {
      let path = node.frontmatter.path;
      if (!path) {
        path = node.frontmatter.link.replace(
          RegExp('^https://blog.berekuk.ru/'),
          '/'
        );
        path = path.replace(RegExp('/$'), '');
      }

      createPage({
        path: path,
        component: blogTemplate,
        context: {
          prev: index === 0 ? undefined : posts[index - 1].node.frontmatter,
          next: index === posts.length - 1 ? undefined : posts[index + 1].node.frontmatter,
        },
      });
    });
  });
};
