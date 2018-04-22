import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Вячеслав Матюхин. Прикладная рациональность: блог, коучинг, движение lesswrong.ru.' },
        { name: 'keywords', content: 'lesswrong, рациональность, кочерга, коучинг' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      className="page-container"
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
