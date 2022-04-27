import Head from 'next/head';
import { AppHeader, AppFooter } from 'z/components';
import { Section } from 'z/layouts';
import style from './css/about.module.scss';

export default function AboutPage() {
  const headTitle = 'About | Unsplash-cloned';
  const headDescription = 'Unsplash-Cloned built from Next.js by Zinglecode (for educational purpose only)';
  return (
    <>
      <Head>
        <meta name="description" content={headDescription} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/about`} />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_HOST}/about`} />
        <title>{headTitle}</title>
      </Head>
      <AppHeader />
      <Section>
        <div className={style.main}>
          <div className="content mt-4 mb-6">
            <h2 className="title is-size-5-mobile is-size-3-tablet">Unsplash-Cloned by Zinglecode</h2>
            <p>Made by Next.js, for educational purpose only.</p>
          </div>
          <div className="content mb-6">
            <h4 className="title is-size-6">Stack used in the project</h4>
            <ul>
              <li>
                <a href="https://nextjs.org/" target="_blank">
                  Next.js (React Framework)
                </a>
              </li>
              <li>
                <a href="https://react-query.tanstack.com/" target="_blank">
                  React Query (Data Fetching)
                </a>
              </li>
              <li>
                <a href="https://heroicons.com/" target="_blank">
                  Heroicons (Icons)
                </a>
              </li>
              <li>
                <a href="https://bulma.io/" target="_blank">
                  Bulma (CSS Frameworks)
                </a>
              </li>
              <li>
                <a href="https://github.com/potchangelo/express-unsplash" target="_blank">
                  Express Unsplash-Cloned API by Zinglecode
                </a>
              </li>
            </ul>
          </div>
          <div className="content mb-6">
            <h4 className="title is-size-6">Credits</h4>
            <ul>
              <li>
                <a href="https://unsplash.com/" target="_blank">
                  Unsplash
                </a>
              </li>
              <li>Credit for each photos are included in the photo posts.</li>
            </ul>
          </div>
          <div className="content mb-6">
            <img src="/about-close.jpg" alt="About close" />
            <span>
              Photo by{' '}
              <a
                href="https://unsplash.com/@tengyart?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                target="_blank"
              >
                Tengyart
              </a>{' '}
              on{' '}
              <a
                href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                target="_blank"
              >
                Unsplash
              </a>
            </span>
          </div>
        </div>
      </Section>
      <AppFooter />
    </>
  );
}
