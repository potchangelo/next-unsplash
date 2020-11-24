import style from './css/app_not_found.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppHeader, AppFooter } from '.';
import { Section } from '../layouts';

function AppNotFound() {
    const { asPath } = useRouter()
    const headTitle = 'Page not found | Unsplash-cloned';
    const headDescription = 'Unsplash-Cloned built from Next.js by Zinglecode (for educational purpose only)';
    return (
        <>
            <Head>
                <meta name="description" content={headDescription} />
                <meta property="og:title" content={headTitle} />
                <meta property="og:description" content={headDescription} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}${asPath}`} />
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_HOST}${asPath}`} />
                <title>{headTitle}</title>
            </Head>
            <AppHeader />
            <Section>
                <div className={`${style.main} content`}>
                    <h2 className="title is-2">404</h2>
                    <p>Hm, the page you were looking for doesn't seem to exist anymore.</p>
                    <p className="mt-6">
                        <Link href="/">
                            <a className="button">Go to Homepage</a>
                        </Link>
                    </p>
                </div>
            </Section>
            <AppFooter />
        </>
    );
}

export default AppNotFound;