import { SearchIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { AppHeader, AppFooter, AppLoading, PhotoItem, PhotoPost } from 'z/components';
import { getPhotos, getRandomPhoto } from 'z/fetchers/photos';
import { getTopics } from 'z/fetchers/topics';
import { usePhotos } from 'z/helpers/hooks';
import { onSearchSubmit } from 'z/helpers/functions';
import { MasonryItem, Modal, Section } from 'z/layouts';
import style from './css/home.module.scss';

const Masonry = dynamic(() => import('z/layouts').then(l => l.Masonry), { ssr: false });

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

function getNextPageParam(lastPage = {}, _) {
  const { photos = [] } = lastPage;
  const count = photos.length;
  if (count < 12) return false;
  return photos[count - 1].id;
}

function flatMapPhotos(page) {
  const { photos = [] } = page;
  return photos;
}

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Photo} props.randomPhoto
 * @param {import('jsdocs/typedefs').Topic[]} props.topics
 */
export default function HomePage(props) {
  // - Data
  const { randomPhoto, topics } = props;
  const { photos, photo, hasNextPage, isFetching, isFetchingNextPage } = usePhotos(
    'photos',
    getPhotos,
    getNextPageParam,
    flatMapPhotos
  );
  const [qValue, setQValue] = useState('');
  const router = useRouter();

  // - Elements
  // --- Meta
  let headTitle = publicTitle;
  let headDescription = `${publicTitle} built from Next.js by Zinglecode (for educational purpose only)`;
  let headUrl = process.env.NEXT_PUBLIC_HOST;
  let headOgImage = null;
  let headTwitterImage = null;
  if (!!photo) {
    headTitle = `Photo by ${photo.user?.displayName} | ${publicTitle}`;
    headDescription = `Download this photo by ${photo.user?.displayName} on ${publicTitle}`;
    headUrl += `/photos/${photo.uid}`;
    headOgImage = <meta property="og:image" content={photo.src?.large} key="og-image" />;
    headTwitterImage = <meta name="twitter:image" content={photo.src?.large} key="twitter-image" />;
  }

  // --- Random photo
  let randomPhotoElement = null;
  let randomUserElement = null;
  if (!!randomPhoto) {
    const { pathname, query } = router;
    const { uid, src, user } = randomPhoto;
    randomPhotoElement = (
      <div className={style.heroBack}>
        <img src={src?.medium} alt="Random photo" />
      </div>
    );
    randomUserElement = (
      <p>
        <Link
          href={{ pathname, query: { ...query, photoUid: uid } }}
          as={`/photos/${uid}`}
          shallow={true}
          scroll={false}
        >
          <a className="has-text-white">Random photo</a>
        </Link>
        <span className="has-text-grey-light"> by </span>
        <Link href={`/@${user?.username}`}>
          <a className="has-text-white">{user?.displayName}</a>
        </Link>
      </p>
    );
  }

  // --- Photos
  const photoElements = photos.map(photo => (
    <MasonryItem key={photo.uid} height={photo.height}>
      <PhotoItem photo={photo} />
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
        {headOgImage}
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:url" content={headUrl} />
        {headTwitterImage}
        <title>{headTitle}</title>
      </Head>
      <AppHeader topics={topics} />
      <section className={`hero is-dark is-large ${style.hero}`}>
        {randomPhotoElement}
        <div className={style.heroMain}>
          <div className={style.heroBody}>
            <div className={`content ${style.heroContent}`}>
              <h1 className="title is-size-4-mobile is-size-1-tablet has-text-weight-bold">Unsplash-Cloned</h1>
              <p className="is-size-6-mobile is-size-5-tablet has-text-weight-medium">
                Built by Next.js, for educational purpose only
              </p>
              <form action="#" onSubmit={event => onSearchSubmit(event, router, qValue)}>
                <div className="control is-hidden-mobile">
                  <input
                    className={`input is-medium ${style.heroSearchInput}`}
                    type="search"
                    placeholder="Search free high-resolution photos"
                    value={qValue}
                    onClick={event => {
                      console.log(event);
                    }}
                    onChange={event => setQValue(event.target.value)}
                  />
                  <button className={`button is-ghost ${style.heroSearchButton}`} type="submit">
                    <span className="icon is-left">
                      <SearchIcon width={24} height={24} />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={style.heroFooter}>
            <div className={`${style.heroFooterItem} is-size-7-mobile`}>{randomUserElement}</div>
            <div className={`${style.heroFooterItem} is-size-7-mobile`}>
              <a
                className="has-text-white"
                href="https://github.com/potchangelo/next-unsplash"
                target="_blank"
                rel="noreferrer"
              >
                Project code on Github
              </a>
            </div>
          </div>
        </div>
      </section>
      <Section type="photos">
        <Masonry>{photoElements}</Masonry>
      </Section>
      <AppLoading isShow={hasNextPage} isSpinning={isFetching || isFetchingNextPage} />
      <AppFooter />
      {photoModal}
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let randomPhotoJson = {};
  let topicsJson = {};

  try {
    await queryClient.prefetchInfiniteQuery('photos', _ => getPhotos());
    randomPhotoJson = await getRandomPhoto();
    topicsJson = await getTopics();
  } catch (error) {
    console.error(error);
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
  const { photo: randomPhoto = null } = randomPhotoJson;
  const { topics = [] } = topicsJson;
  return { props: { dehydratedState, randomPhoto, topics } };
}
