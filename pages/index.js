import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPhotos, getPhoto } from '../api';
import { Modal } from '../layouts/';
import { Navbar, PhotoItem, PhotoPost } from '../components';

function Home() {
    // - Data
    const [photo, setPhoto] = useState(null);
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
    const router = useRouter();

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
    }, [canFetchMore, isFetching, isFetchingMore]);

    const loadPhoto = useCallback(async (uid) => {
        console.log(uid)
		try {
            const resJson = await getPhoto(null, uid);
		    setPhoto(resJson);
        }
        catch (error) {
            console.log(error);
            setPhoto(null);
        }
	}, []);

    // - Effects
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    useEffect(() => {
        const { photoUid } = router.query;
		if (!!photoUid) {
			loadPhoto(photoUid);
		}
		else {
			setPhoto(null);
		}
    }, [router.query, loadPhoto])
    
    // - Elements
    let photoElements = photoArray.map(photo => {
        return (
            <div key={photo.uid} className="column is-6-mobile is-4-tablet">
                <PhotoItem photo={photo} />
            </div>
        );
    });

    let photoModal = null;
	if (!!photo) {
        photoModal = <Modal><PhotoPost photo={photo} /></Modal>;
	}

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
            {photoModal}
        </>
    );
}

export default Home;
