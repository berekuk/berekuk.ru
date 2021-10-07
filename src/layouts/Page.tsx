import Head from 'next/head';

import { Header } from '../components/Header';
import { config } from '../config';

type Props = {
  title?: string;
  header?: boolean;
};

export const Layout: React.FC<Props> = ({ children, title, header = true }) => {
  const metadata = config.siteMetadata;
  return (
    <div>
      <Head>
        <title>{title || config.siteMetadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="px-4 max-w-screen-md mx-auto">
        {header && <Header />}
        <div className="py-16">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
