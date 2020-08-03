import Head from 'next/head';
import { useQuery } from 'react-query';
import { getPhotos, getPhoto } from '../../api';
import { Navbar, PhotoPost } from '../../components';

function PhotosUid({ cachePhoto }) {
    // - Data
    const { data: fetchedPhoto } = useQuery(
        ['photo', !!cachePhoto ? cachePhoto.uid : null], 
        getPhoto
    );
    const photo = fetchedPhoto || cachePhoto;

    // - Elements
    let headTitle = `Photo | Unsplash-cloned`;
    if (!!photo) {
        headTitle = `Photo by ${photo.user.displayName} | Unsplash-cloned`;
    }

    return (
        <>
            <Head>
                <title>{headTitle}</title>
            </Head>
            <Navbar />
            <section>
                <PhotoPost photo={photo} />
            </section>
        </>
    );
}

async function getStaticPaths() {
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

async function getStaticProps(context) {
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

export default PhotosUid;
export { getStaticPaths, getStaticProps };