import './css/global.scss';
import Head from 'next/head';
import { ReactQueryConfigProvider } from 'react-query';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
                <link rel="icon" href="/favicon.ico" key="icon" />
            </Head>
            <ReactQueryConfigProvider config={{ queries: { refetchOnWindowFocus: false } }}>
                <Component {...pageProps} />
            </ReactQueryConfigProvider>
        </>
    );
}

export default App;