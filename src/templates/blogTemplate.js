import Link from 'gatsby-link';
import React from 'react';

export default function Template({ data, pathContext }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { prev, next } = pathContext;

  const metadata = data.site.siteMetadata;

  return (
    <div>
      <hr />

      <footer className="text-sm">
        {frontmatter.categories &&
          frontmatter.categories.map(e => `#${e}`).join(', ')}
        <div className="flex justify-between">
          {prev && <Link to={prev.path}>&larr; {prev.title}</Link>}
          {next && <Link to={next.path}>{next.title} &rarr;</Link>}
        </div>
      </footer>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogByPath($path: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
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
