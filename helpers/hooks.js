import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { superStopPropagation } from './functions';
import { getPhoto } from '../api';

/**
 * @param {(string|array)} key
 * @param {function} fetcher
 * @param {function} getNextPageParam
 * @param {function} flatMapPhotos
 */
function usePhotos(key, fetcher, getNextPageParam, flatMapPhotos) {
  // - New data infinite
  const {
    data = {},
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    key,
    ({ pageParam = null }) => fetcher(pageParam),
    { getNextPageParam }
  );
  console.log(data)
  const photoGroupArray = data.pages;
  const photoArray = photoGroupArray?.flatMap(flatMapPhotos) ?? [];

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
    const canFetch = hasNextPage && !isFetching && !isFetchingNextPage && !isFetchSuspendedRef.current;
    const isScrollReached = scrollBottom > docBottom - 700;

    // --- Fetch
    if (canFetch && isScrollReached) {
      isFetchSuspendedRef.current = true;
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, isFetchingNextPage]);

  const loadPhoto = useCallback(async uid => {
    try {
      const { photo, errorCode } = await getPhoto(uid);
      if (!!errorCode) throw new Error(errorCode);
      setPhoto(photo);
    } catch (error) {
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
        isFetchSuspendedRef.current = false;
      }, 600);
    }
  }, [photoGroupArray]);

  return { photoArray, photo, hasNextPage, isFetching, isFetchingNextPage };
}

/**
 * Hook for toggle dropdown components
 * @returns {{ isDropdownActive: boolean, toggleDropdown: function }} Object of state and function
 */
function useDropdown() {
  // - Data
  const [isActive, setActive] = useState(false);

  // - Functions
  function toggleDropdown(event) {
    superStopPropagation(event);
    setActive(prev => !prev);
  }

  function onClickDocument() {
    setActive(false);
  }

  // - Effects
  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', onClickDocument);
    } else {
      document.removeEventListener('click', onClickDocument);
    }
    return () => {
      document.removeEventListener('click', onClickDocument);
    };
  }, [isActive]);

  return { isDropdownActive: isActive, toggleDropdown };
}

export { usePhotos, useDropdown };
