import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

const Layout = ({ children, data }) => {
  const metadata = data.site.siteMetadata;
  return (
    <div>
      <Helmet
        title={metadata.title}
        meta={[
          { name: 'description', content: metadata.description },
          { name: 'keywords', content: metadata.keywords },
        ]}
      />
      <Header siteTitle={metadata.title} />
      <div
        className="page-container"
      >
        {children()}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`
