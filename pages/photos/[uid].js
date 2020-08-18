import Head from 'next/head';
import { useQuery } from 'react-query';
import { getPhotos, getPhoto } from '../../api';
import { Navbar, PhotoPost } from '../../components';

export default function PhotoPage({ cachePhoto }) {
    // - Data
    const { data: fetchedPhoto } = useQuery(
        ['photo', !!cachePhoto ? cachePhoto.uid : null], 
        getPhoto
    );
    const photo = fetchedPhoto || cachePhoto;

    // - Elements
    let headTitle = 'Photo | Unsplash-cloned';
    let headDescription = 'Download this photo on Unsplash-Cloned';
    let headUrl = 'http://localhost:3000';
    let headImageUrl = '';
    if (!!photo) {
        headTitle = `Photo by ${photo.user.displayName} | Unsplash-cloned`;
        headDescription = `Download this photo by ${photo.user.displayName} on Unsplash-Cloned`;
        headUrl += `/photos/${photo.uid}`;
        headImageUrl = photo.url.large;
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
            <Navbar />
            <section>
                <PhotoPost photo={photo} />
            </section>
        </>
    );
}

export async function getStaticPaths() {
    let photoArray = [];
    try {
        photoArray = await getPhotos(null);
    }
    catch (error) {
        console.error(error);
    }

    const paths = photoArray.map(photo => {
        return { params: { uid: photo.uid } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { uid } = context.params;

    let cachePhoto = null;
    try {
        cachePhoto = await getPhoto(null, uid);
    }
    catch (error) {
        console.error(error);
    }

    return { props: { cachePhoto } };
}