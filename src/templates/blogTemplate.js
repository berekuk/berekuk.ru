import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Disqus from 'disqus-react';
import styled from 'styled-components';

import Time from '../components/time';

const PostFooter = styled.footer`
  font-size: 0.8em;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PostHeader = styled.header`
  margin-bottom: 30px;
`;

export default function Template({ data, pathContext }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { prev, next } = pathContext;

  const metadata = data.site.siteMetadata;

  const disqusConfig = {
    url: `${metadata.siteUrl}/${frontmatter.path}`,
    identifier: frontmatter.path,
  };

  return (
    <div>
      <Helmet title={`${frontmatter.title} | ${metadata.title}`} />

      <PostHeader>
        <h1>{frontmatter.title}</h1>
        <Time>{frontmatter.date}</Time>
      </PostHeader>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <hr />

      <PostFooter>
        {frontmatter.categories &&
          frontmatter.categories.map(e => `#${e}`).join(', ')}
        <FooterLinks>
          {prev && <Link to={prev.path}>&larr; {prev.title}</Link>}
          {next && <Link to={next.path}>{next.title} &rarr;</Link>}
        </FooterLinks>
      </PostFooter>

      <Disqus.DiscussionEmbed shortname="berekuk" config={disqusConfig} />
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
