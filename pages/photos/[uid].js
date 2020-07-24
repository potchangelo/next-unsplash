import Head from 'next/head';
import { useState, useEffect, useCallback } from "react";
import useSWR from 'swr';

async function fetcher(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
}

function PhotosUid(props) {
    const { uid = null } = props;
    // const [photo, setPhoto] = useState(null);

    // const getPhoto = useCallback(async (photoUid) => {
    //     if (!photoUid) return;
    //     try {
    //         const res = await fetch(`http://localhost:8080/photos/${photoUid}`)
    //         const resJson = await res.json();
    //         setPhoto(resJson);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    // useEffect(() => { getPhoto(uid); }, [getPhoto, uid]);

    const { 
        data: photo, error 
    } = useSWR(!!uid ? `http://localhost:8080/photos/${uid}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    let headTitle = `${uid} - Unsplash-cloned`;
    let userElement = null;
    let photoElement = null;
    
    if (!!photo) {
        const {
            width, height, description, 
            photoUrl: { urlLarge },
            user: { username, displayName }
        } = photo;

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
        const res = await fetch('http://localhost:8080/photos?beforeId=30');
        photoArray = await res.json();
    }
    catch (error) {
        console.log(error);
    }

    const paths = photoArray.map(photo => {
        return { params: { uid: photo.uid } }
    });

    return { paths, fallback: true };
}

async function getStaticProps(context) {
    const { uid } = context.params;
    return { props: { uid } };
}

export default PhotosUid;
export { getStaticPaths, getStaticProps };