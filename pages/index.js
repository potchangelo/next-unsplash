import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
    const [photoArray, setPhotoArray] = useState([]);

    const getPhotos = useCallback(async (beforeId) => {
        try {
            const res = await fetch('http://localhost:8080/photos');
            const resJson = await res.json();
            setPhotoArray(resJson);
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => { getPhotos(); }, [getPhotos]);

    const photoElements = photoArray.map(photo => {
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

    return (
        <section className="section">
            <Head>
                <title>Unsplash</title>
                <link rel="icon" href="/favicon.ico" />
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
