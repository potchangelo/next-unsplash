import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppHeader, AppFooter, AppNotFound, PhotoPost } from 'z/components';
import { getPhotos, getPhoto } from 'z/fetchers/photos';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Photo} props.photo
 */
export default function PhotoPage(props) {
  // - Data
  const { photo } = props;
  const router = useRouter();

  // - Fallback
  if (router.isFallback) return <div>fallback ...</div>;
  if (!photo) return <AppNotFound />;
  const { uid, url, user } = photo;

  // - Elements
  const headTitle = `Photo by ${user?.displayName} | ${publicTitle}`;
  const headDescription = `Download this photo by ${user?.displayName} on Unsplash-Cloned`;
  const headUrl = `${process.env.NEXT_PUBLIC_HOST}/photos/${uid}`;
  const headImageUrl = url?.large;

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
      <AppHeader />
      <PhotoPost photo={photo} />
      <AppFooter />
    </>
  );
}

export async function getStaticPaths() {
  let photosJson = {};
  try {
    photosJson = await getPhotos();
  } catch (error) {
    console.error(error);
  }

  const { photos = [] } = photosJson;
  const paths = photos.map(photo => {
    return { params: { uid: photo.uid } };
  });

  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { uid } = context.params;

  let photoJson = {};
  try {
    photoJson = await getPhoto(uid);
  } catch (error) {
    console.error(error);
  }

  const { photo = null } = photoJson;
  return { props: { photo } };
}
