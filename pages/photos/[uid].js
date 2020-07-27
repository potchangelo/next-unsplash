import Head from 'next/head';
import { useQuery } from 'react-query';
import { getPhotos, getPhoto } from '../../api';

function PhotosUid(props) {
    // - Props, React Query
    const { cachePhoto } = props;
    const { data: fetchedPhoto } = useQuery(
        ['photo', !!cachePhoto ? cachePhoto.uid : null], 
        getPhoto
    );
    const photo = fetchedPhoto || cachePhoto;

    // - Elements
    let headTitle = `Photo | Unsplash-cloned`;
    let userElement = null, photoElement = null;
    
    if (!!photo) {
        const {
            width, height, description, 
            photoUrl: { urlLarge },
            user: { username, displayName }
        } = photo;

        headTitle = `Photo by ${displayName} | Unsplash-cloned`;
        userElement = (
            <div className="user">
                <h2 className="title">{displayName}</h2>
                <h4 className="title">@{username}</h4>
            </div>
        );
        photoElement = (
            <div className="photo">
                <img src={urlLarge} width={width} height={height} alt={description} />
            </div>
        );
    }

    return (
        <section className="section">
            <Head>
                <title>{headTitle}</title>
            </Head>
            <div className="container">
                {userElement}
                {photoElement}
            </div>
        </section>
    );
}

async function getStaticPaths() {
    let photoArray = [];
    try {
        photoArray = await getPhotos(null, 30);
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