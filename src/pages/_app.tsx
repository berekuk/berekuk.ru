import '../styles/globals.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { config } from '../config';

const pageview = (url: string) => {
  if (!window || !(window as any).gtag) {
    return;
  }
  (window as any)?.gtag('config', config.googleAnalyticsId, {
    page_path: url,
  });
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // via https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
