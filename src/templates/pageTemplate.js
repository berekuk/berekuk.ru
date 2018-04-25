import React from 'react';
import Helmet from "react-helmet";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const metadata = data.site.siteMetadata;

  return (
    <div>
      <Helmet title={`Блог | ${metadata.title}`} />
      {frontmatter.title && <h1>{frontmatter.title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
