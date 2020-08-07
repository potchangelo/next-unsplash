import './css/global.scss';
import Head from 'next/head';
import { ReactQueryConfigProvider } from 'react-query';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
                <meta name="author" content="Zinglecode" key="author" />
                <meta name="description" content="Unsplash-Cloned by Next.js (for educational purpose only)" key="description" />
                <meta name="mobile-web-app-capable" content="yes" key="mobile-web-app-capable" />
                <meta name="apple-mobile-web-app-capable" content="yes" key="apple-mobile-web-app-capable" />
                <meta name="apple-mobile-web-app-title" content="Unsplash-Cloned" key="apple-mobile-web-app-title" />
                <meta name="application-name" content="Unsplash-Cloned" key="application-name" />
                <meta name="theme-color" content="#ffffff" key="theme-color" />
                <meta property="og:type" content="website" key="og-type" />
                <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="apple-touch-icon" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon32" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon16" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" key="mask-icon" />
                <link rel="manifest" href="/manifest.json" key="menifest" />
            </Head>
            <ReactQueryConfigProvider config={{ queries: { refetchOnWindowFocus: false } }}>
                <Component {...pageProps} />
            </ReactQueryConfigProvider>
        </>
    );
}

export default App;