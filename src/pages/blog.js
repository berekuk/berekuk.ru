import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import Time from '../components/time';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <div style={{color: 'gray' }}>
        <p>
          Новая версия блога (которую вы видите ниже) на движке Gatsby.js пока в разработке. Старая версия блога — на <a href="https://blog.berekuk.ru">blog.berekuk.ru</a>.
        </p><p>
          TODO: перенести комментарии, перенести теги, настроить редиректы, перенести картинки, допилить стили.
        </p>
      </div>
      <div className="blog-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <article className="blog-post-preview" key={post.id}>
                <h2>
                  <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h2>
                <Time>{post.frontmatter.date}</Time>
                <p>{post.excerpt}</p>
              </article>
            );
          })}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "D MMMM YYYY", locale: "ru")
            path
          }
        }
      }
    }
  }
`;
