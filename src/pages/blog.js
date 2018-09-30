import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Time from '../components/time';

import styled from 'styled-components';

const Preface = styled.div`
  color: gray;
`;

const RssLink = () => (
  <em>
    <Link to="/rss.xml">RSS</Link>
  </em>
);

const Article = ({ post }) => (
  <article key={post.id}>
    <h2>
      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
    </h2>
    <Time>{post.frontmatter.date}</Time>
    <p>{post.excerpt}</p>
  </article>
);

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Preface>
        <p>
          Новая версия блога (которую вы видите ниже) на движке Gatsby.js пока в
          разработке. Старая версия блога — на{' '}
          <a href="https://blog.berekuk.ru">blog.berekuk.ru</a>.
        </p>
        <p>
          TODO: перенести комментарии, настроить редиректы, перенести картинки.
        </p>
        <p>
          <RssLink />
        </p>
        <hr />
      </Preface>
      <div>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node }) => <Article post={node} />)}
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
