import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { useQuery, usePaginatedQuery, useInfiniteQuery } from 'react-query';

// async function fetcher(url) {
//     const res = await fetch(url);
//     const resJson = await res.json();
//     return resJson;
// }

// async function fetchPhotos() {
//     const res = await fetch('http://localhost:8080/photos');
//     return await res.json();
// }

// async function fetchPhotos(key, beforeId) {
//     let url = 'http://localhost:8080/photos';
//     if (!!beforeId) url += `?beforeId=${beforeId}`;
//     const res = await fetch(url);
//     return await res.json();
// }

async function fetchPhotos(key, beforeId = null) {
    let url = 'http://localhost:8080/photos';
    if (!!beforeId) url += `?beforeId=${beforeId}`;
    console.log(url)
    const res = await fetch(url);
    return await res.json();
}

function Home({query}) {
    // SWR
    // const [asd, setAsd] = useState('loading');

    // const srwres = useSWR('http://localhost:8080/photos', fetcher, {
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false,
    //     onSuccess: (data, key, config) => {
    //         // console.log('on success ' + data.length)
    //         // if (data.length >= 12) setAsd('loadable')
    //     }
    // });

    // console.log(srwres);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAsd('loading')
    //         mutate('http://localhost:8080/photos', async (photoArray) => {
    //             const newPhotoArray = await fetcher('http://localhost:8080/photos?beforeId=30')
                
    //             return [...photoArray, ...newPhotoArray]
    //         }, false)
    //     }, 2000)
    // }, []);

    // console.log(photoArray.length)

    // --- Normal react-query fetch
    // const { data: photoArray = [], isLoading, isSuccess, isStale, isFetching } = useQuery('photos', fetchPhotos)

    // --- Pagination react-query fetch
    // const router = useRouter();
    // const { 
    //     resolvedData, latestData, 
    //     isLoading, isSuccess, isStale, isFetching 
    // } = usePaginatedQuery(['photos', router.query.beforeId], fetchPhotos);
    // console.log(resolvedData);
    // const photoArray = resolvedData;

    // Infinite react-query fetch
    const { 
        data: photoGroupArray = [], 
        fetchMore, canFetchMore 
    } = useInfiniteQuery('photos', fetchPhotos, {
        getFetchMore: (lastGroup, allGroups) => {
            console.log(lastGroup)
            if (lastGroup.length < 12) return false;
            return lastGroup[lastGroup.length - 1].id;
        }
    });
    const photoArray = photoGroupArray.flat();

    useEffect(() => {
        setTimeout(() => {
            fetchMore();
        }, 2000)
    }, []);
    
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
                            <img src={urlLarge} alt={description} width={width} height={height} />
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
                <Link href="/?beforeId=30"><a>Next page</a></Link>
                <div className="columns is-multiline is-mobile">
                    {photoElements}
                </div>
            </div>
        </section>
    );
}

export default Home;
