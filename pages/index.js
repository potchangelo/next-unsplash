import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

async function fetcher(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
}

function Home() {
    // const [photoArray, setPhotoArray] = useState([]);

    // const getPhotos = useCallback(async (beforeId) => {
    //     try {
    //         const res = await fetch('http://localhost:8080/photos');
    //         const resJson = await res.json();
    //         setPhotoArray(resJson);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    // useEffect(() => { getPhotos(); }, [getPhotos]);

    const { 
        data: photoArray, error 
    } = useSWR('http://localhost:8080/photos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    let photoElements = null;
    if (!!photoArray) {
        photoElements = photoArray.map(photo => {
            const {
                uid, width, height, description, 
                photoUrl: { urlLarge }
            } = photo;
            return (
                <div key={uid} className="column is-6-mobile is-4-tablet">
                    <Link href="/photos/[uid]" as={`/photos/${uid}`}>
                        <a>
                            <img src={urlLarge} width={width} height={height} alt={description} />
                        </a>
                    </Link>
                </div>
            );
        });
    }

    return (
        <section className="section">
            <Head>
                <title>Unsplash-cloned</title>
            </Head>
            <div className="container">
                <h2 className="title">Unsplash</h2>
                <div className="columns is-multiline is-mobile">
                    {photoElements}
                </div>
            </div>
        </section>
    );
}

export default Home;
