import React from 'react';
import Link from 'gatsby-link';

import Time from '../components/time';

import styled from 'styled-components';

const PostFooter = styled.footer`
  font-size: 0.8em;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Template({ data, pathContext }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { prev, next } = pathContext;
  console.log(pathContext);

  return (
    <div>
      {frontmatter.title && <h1>{frontmatter.title}</h1>}
      <Time>{frontmatter.date}</Time>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <hr />
      <PostFooter>
        {frontmatter.categories && frontmatter.categories.map(e => `#${e}`).join(', ')}
        <FooterLinks>
          {prev && <Link to={prev.path}>&larr; {prev.title}</Link>}
          {next && <Link to={next.path}>{next.title} &rarr;</Link>}
        </FooterLinks>
      </PostFooter>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "D MMMM YYYY", locale: "ru")
        title
        categories
      }
    }
  }
`;
