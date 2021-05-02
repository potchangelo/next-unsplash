import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { superStopPropagation } from './functions';
import { getPhoto } from '../api';

function usePhotos(key, fetcher, getFetchMore, flatMapPhotos) {
    // - New data infinite
    const {
        data: testte = {}, fetchNextPage: fetchMore,
        hasNextPage: canFetchMore, isFetching, isFetchingNextPage: isFetchingMore
    } = useInfiniteQuery(key, ({ pageParam = null }) => fetcher(pageParam), {
        getNextPageParam: getFetchMore
    });
    // console.log(testte);
    const photoGroupArray = testte.pages;
    const photoArray = testte.pages?.flatMap(flatMapPhotos) ?? [];

    // - Old Data
    // --- Photos
    // const {
    //     data: photoGroupArray = [], fetchMore,
    //     canFetchMore, isFetching, isFetchingMore
    // } = useInfiniteQuery(key, fetcher, { getFetchMore });
    
    // const photoArray = photoGroupArray.flatMap(flatMapPhotos);

    // --- Photo
    const [photo, setPhoto] = useState(null);

    // --- Pause
    const isFetchSuspendedRef = useRef(false);

    // --- Router
    const router = useRouter();

    // - Callbacks
    const onScroll = useCallback(() => {
        // --- Position
        const scrollBottom = window.scrollY + window.innerHeight;
        const docBottom = document.body.offsetHeight;

        // --- Condition
        const canFetch = (
            canFetchMore && !isFetching && 
            !isFetchingMore && !isFetchSuspendedRef.current
        );
        const isScrollReached = scrollBottom > docBottom - 700;

        // --- Fetch
        if (canFetch && isScrollReached) {
            isFetchSuspendedRef.current = true;
            fetchMore()
        };
    }, [canFetchMore, isFetching, isFetchingMore]);

    const loadPhoto = useCallback(async (uid) => {
        try {
            const { photo, errorCode } = await getPhoto(null, uid);
            if (!!errorCode) throw new Error(errorCode);
            setPhoto(photo);
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
        if (!!photoUid) loadPhoto(photoUid);
        else setPhoto(null);
    }, [router.query, loadPhoto]);

    useEffect(() => {
        if (!!isFetchSuspendedRef.current) {
            setTimeout(() => {
                isFetchSuspendedRef.current = false
            }, 600);
        }
    }, [photoGroupArray]);

    return { photoArray, photo, canFetchMore, isFetching, isFetchingMore };
}

function useDropdown() {
    // - Data
    const [active, setActive] = useState(false);

    // - Functions
    function toggleDropdown(e) {
        superStopPropagation(e);
        setActive(prev => !prev);
    }

    function onClickDocument() {
        setActive(false);
    }

    // - Effects
    useEffect(() => {
        if (active) {
            document.addEventListener('click', onClickDocument);
        }
        else {
            document.removeEventListener('click', onClickDocument);
        }
        return () => {
            document.removeEventListener('click', onClickDocument);
        }
    }, [active]);

    return { dropdownActive: active, toggleDropdown };
}

export { usePhotos, useDropdown };