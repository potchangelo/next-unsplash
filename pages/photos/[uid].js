import Head from 'next/head';
import { getPhotos, getPhoto } from '../../api';
import { AppHeader, AppFooter, AppNotFound, PhotoPost } from '../../components';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function PhotoPage(props) {
    // - Data
    const { photo } = props;

    // - Checking
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

    const { photo = null, errorCode = null } = resJson;
    return { props: { photo, errorCode } };
}