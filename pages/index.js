import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPhotos } from '../api';
import { Navbar } from '../components';

function Home() {
    // - React Query
    const { 
        data: photoGroupArray = [], 
        fetchMore, 
        canFetchMore, isFetching, isFetchingMore
    } = useInfiniteQuery('photos', getPhotos, {
        getFetchMore: (lastGroup, allGroups) => {
            if (lastGroup.length < 12) return false;
            return lastGroup[lastGroup.length - 1].id;
        }
    });
    const photoArray = photoGroupArray.flat();

    // - Callback
    const onScroll = useCallback(() => {
        // Position
        const scrollBottom = window.scrollY + window.innerHeight;
        const docBottom = document.body.offsetHeight;

        // Condition
        const canFetch = canFetchMore && !isFetching && !isFetchingMore;
        const isScrollReached = scrollBottom > docBottom - 700;

        // Fetch
        if (canFetch && isScrollReached) fetchMore();
    }, [canFetchMore, isFetching, isFetchingMore])

    // - Effects
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);
    
    // - Elements
    let photoElements = photoArray.map(photo => {
        const {
            uid, width, height, description, 
            photoUrl: { urlSmall }
        } = photo;
        return (
            <div key={uid} className="column is-6-mobile is-4-tablet">
                <Link href="/photos/[uid]" as={`/photos/${uid}`}>
                    <a>
                        <img src={urlSmall} alt={description} />
                    </a>
                </Link>
            </div>
        );
    });

    return (
        <>
            <Head>
                <title>Unsplash-cloned</title>
            </Head>
            <Navbar />
            <section className="section">
                <div className="container">
                    <div className="columns is-multiline is-mobile">
                        {photoElements}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
