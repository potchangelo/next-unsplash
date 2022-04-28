import Head from 'next/head';
import { AppHeader, AppFooter, TopicItem } from 'z/components';
import { getTopics } from 'z/fetchers/topics';
import { Section } from 'z/layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function TopicsPage(props) {
  // - Data
  const { topics } = props;

  // - Elements
  // --- Meta
  const headTitle = `Topics | ${publicTitle}`;
  const headDescription =
    'Discover beautiful free pictures by topic. Curated by the Unsplash community. All images are free to download and free to use.';
  const headUrl = `${process.env.NEXT_PUBLIC_HOST}/about`;

  // --- Topics
  const topicElements = topics.map(topic => (
    <div key={topic.uid} className="column is-4">
      <TopicItem topic={topic} />
    </div>
  ));

  return (
    <>
      <Head>
        <meta name="description" content={headDescription} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta property="og:url" content={headUrl} />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:url" content={headUrl} />
        <title>{headTitle}</title>
      </Head>
      <AppHeader topics={topics} />
      <Section type="top">
        <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">Topics</h2>
        <p className="subtitle is-size-6-mobile is-size-5-tablet">
          Explore the world through topics of beautiful photos
        </p>
      </Section>
      <Section>
        <h4 className="title is-size-5-mobile is-size-4-tablet has-text-weight-bold">All topics</h4>
        <div className="columns is-multiline">{topicElements}</div>
      </Section>
      <AppFooter />
    </>
  );
}

export async function getStaticProps() {
  let topicsJson = {};
  try {
    topicsJson = await getTopics();
  } catch (error) {
    console.error(error);
  }
  const { topics = [] } = topicsJson;
  return { props: { topics } };
}
