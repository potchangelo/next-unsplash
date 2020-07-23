import './css/global.scss';
import Head from 'next/head';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
                <link rel="icon" href="/favicon.ico" key="icon" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;