import React from 'react';

import Time from '../components/time';

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      {frontmatter.title && <h1>{frontmatter.title}</h1>}
      <Time>{frontmatter.date}</Time>
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
      }
    }
  }
`;
