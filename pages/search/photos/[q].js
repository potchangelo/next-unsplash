import Head from 'next/head';
import { searchPhotos } from '../../../api';
import { AppHeader, AppFooter, AppLoading, PhotoItem, PhotoPost } from '../../../components';
import { usePhotos } from '../../../helpers/hooks';
import { Masonry, MasonryItem, Modal, Section } from '../../../layouts';

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

export default function SearchPhotosPage(props) {
  // - Data
  // --- Search query
  const { q = '' } = props;

  // --- Photos
  const { photoArray, photo, hasNextPage, isFetching, isFetchingNextPage } = usePhotos(
    ['search-photos', q],
    pageParam => searchPhotos(q, pageParam),
    getNextPageParam,
    flatMapPhotos
  );

  // - Elements
  // --- Meta
  const title = q.charAt(0).toUpperCase() + q.slice(1);
  let headTitle = `${title} pictures | ${publicTitle}`;
  let headDescription = `Download the perfect ${q} pictures on Unsplash-Cloned`;
  let headUrl = `${process.env.NEXT_PUBLIC_HOST}/search/photos/${q}`;
  let headOgImage = null,
    headTwitterImage = null;
  if (!!photo) {
    headTitle = `Photo by ${photo.user?.displayName} | ${publicTitle}`;
    headDescription = `Download this photo by ${photo.user?.displayName} on ${publicTitle}`;
    headUrl += `/photos/${photo.uid}`;
    headOgImage = <meta property="og:image" content={photo.url?.large} key="og-image" />;
    headTwitterImage = <meta name="twitter:image" content={photo.url?.large} key="twitter-image" />;
  }

  // --- Photos
  const photoElements = photoArray.map(photo => (
    <MasonryItem key={photo.uid}>
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
      <AppHeader />
      <Section type="top">
        <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">{title}</h2>
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
  const qArray = ['on', 'from'];
  const paths = qArray.map(q => {
    return { params: { q } };
  });

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { q } = context.params;
  return { props: { q } };
}
