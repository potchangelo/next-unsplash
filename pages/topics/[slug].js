import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import { AppHeader, AppFooter, AppLoading, AppNotFound, PhotoItem, PhotoPost } from 'z/components';
import { getTopic, getTopics } from 'z/fetchers/topics';
import { usePhotos } from 'z/helpers/hooks';
import { MasonryItem, Modal, Section } from 'z/layouts';

const Masonry = dynamic(
  () => import('z/layouts').then(l => l.Masonry),
  { ssr: false }
);

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

function getNextPageParam(lastPage = {}, _) {
  const { topic = {} } = lastPage;
  const { photos = [] } = topic;
  const count = photos.length;
  if (count < 12) return false;
  return photos[count - 1].id;
}

function flatMapPhotos(page) {
  const { topic = {} } = page;
  const { photos = [] } = topic;
  return photos;
}

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Topic} props.topic
 * @param {import('jsdocs/typedefs').Topic[]} props.topics
 */
export default function TopicPage(props) {
  // - Data
  const { topic, topics } = props;
  const { photos, photo, hasNextPage, isFetching, isFetchingNextPage } = usePhotos(
    ['topic-photos', topic?.slug, true],
    pageParam => getTopic(topic?.slug, true, pageParam),
    getNextPageParam,
    flatMapPhotos
  );
  const router = useRouter();

  // - Fallback
  if (router.isFallback) return <div>This is fallback ...</div>;
  if (!topic) return <AppNotFound />;
  const { slug, title, description, coverUrl } = topic;

  // - Elements
  // --- Meta
  const headTitle = `${title} | ${publicTitle}`;
  const headDescription = `See the high resolution photos of ${title} on Unsplash-Cloned`;
  const headUrl = `${process.env.NEXT_PUBLIC_HOST}/topics/${slug}`;
  const headImageUrl = coverUrl?.large;

  // --- Photos
  const photoElements = photos.map(photo => (
    <MasonryItem key={photo.uid} height={photo.height}>
      <PhotoItem photo={photo} user={photo.user} />
    </MasonryItem>
  ));

  // --- Modal
  let photoModal = null;
  if (!!photo) {
    photoModal = (
      <Modal>
        <PhotoPost photo={photo} isModal={true} />
      </Modal>
    );
  }

  return (
    <>
      <Head>
        <meta name="description" content={headDescription} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta property="og:url" content={headUrl} />
        <meta property="og:image" content={headImageUrl} key="og-image" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:url" content={headUrl} />
        <meta name="twitter:image" content={headImageUrl} key="twitter-image" />
        <title>{headTitle}</title>
      </Head>
      <AppHeader topics={topics} />
      <Section type="top">
        <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">{title}</h2>
        <p className="subtitle is-size-6-mobile is-size-5-tablet">{description}</p>
      </Section>
      <Section type="photos">
        <Masonry>{photoElements}</Masonry>
      </Section>
      <AppLoading isShow={hasNextPage} isSpinning={isFetching || isFetchingNextPage} />
      <AppFooter />
      {photoModal}
    </>
  );
}

export async function getStaticPaths() {
  let topicsJson = {};
  try {
    topicsJson = await getTopics();
  } catch (error) {
    console.error(error);
  }

  const { topics = [] } = topicsJson;
  const paths = topics.map(topic => {
    return { params: { slug: topic.slug } };
  });
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const queryClient = new QueryClient();
  let topicJson = {};
  let allTopicsJson = {};

  try {
    await queryClient.prefetchInfiniteQuery(
      ['topic-photos', slug, true],
      _ => getTopic(slug, true)
    );
    topicJson = await getTopic(slug);
    allTopicsJson = await getTopics();
  } catch (error) {
    console.error(error);
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
  const { topic = null } = topicJson;
  const { topics = [] } = allTopicsJson;
  return { props: { dehydratedState, topic, topics } };
}
