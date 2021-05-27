import Head from 'next/head';

import { Header } from '../components/Header';
import { config } from '../config';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({
  title = config.siteMetadata.title,
  children,
}) => {
  const metadata = config.siteMetadata;
  return (
    <div>
      <Head>
        <title>{title}</title>
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
      <Header />
      <div className="px-4 py-16 max-w-screen-md mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
