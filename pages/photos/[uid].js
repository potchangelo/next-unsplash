import Head from 'next/head';
import { useQuery } from 'react-query';
import { getPhotos, getPhoto } from '../../api';
import { AppHeader, AppFooter, PhotoPost } from '../../components';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function PhotoPage({ cachePhoto }) {
    // - Data
    const { data: photoResponse = {} } = useQuery(
        ['photo', cachePhoto?.uid], getPhoto
    );
    const photo = photoResponse.photo || cachePhoto;

    // - Elements
    let headTitle = `Photo | ${publicTitle}`;
    let headDescription = `Download this photo on ${publicTitle}`;
    let headUrl = process.env.NEXT_PUBLIC_HOST;
    let headImageUrl = '';
    if (!!photo) {
        headTitle = `Photo by ${photo.user?.displayName} | ${publicTitle}`;
        headDescription = `Download this photo by ${photo.user?.displayName} on Unsplash-Cloned`;
        headUrl += `/photos/${photo.uid}`;
        headImageUrl = photo.url?.large;
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
            <AppHeader />
            <section>
                <PhotoPost photo={photo} />
            </section>
            <AppFooter />
        </>
    );
}

export async function getStaticPaths() {
    let resJson = {};
    try {
        resJson = await getPhotos(null);
    }
    catch (error) {
        console.error(error);
    }

    const { photos: photoArray = [] } = resJson;
    const paths = photoArray.map(photo => {
        return { params: { uid: photo.uid } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { uid } = context.params;

    let resJson = {};
    try {
        resJson = await getPhoto(null, uid);
    }
    catch (error) {
        console.error(error);
    }

    const { photo: cachePhoto = null, errorCode = null } = resJson;
    return { props: { cachePhoto, errorCode } };
}