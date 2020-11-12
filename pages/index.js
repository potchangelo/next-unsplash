import style from './css/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { Search } from 'react-feather';
import { getPhotos, getPhoto, getRandomPhoto } from '../api';
import { Modal, Masonry, MasonryItem, PhotosSection } from '../layouts/';
import { Navbar, PhotoItem, PhotoPost, LoadSpinner, Footer } from '../components';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function HomePage() {
    // - Data
    // --- Photos
    const {
        data: photoGroupArray = [], fetchMore,
        canFetchMore, isFetching, isFetchingMore
    } = useInfiniteQuery('photos', getPhotos, {
        getFetchMore: (lastGroup = {}, allGroups) => {
            const { photos: lastPhotoArray = [] } = lastGroup;
            const count = lastPhotoArray.length;
            if (count < 12) return false;
            return lastPhotoArray[count - 1].id;
        }
    });
    const photoArray = photoGroupArray.flatMap(group => {
        const { photos: groupPhotoArray = [] } = group;
        return groupPhotoArray;
    });

    // --- Random photo
    const { data: randomPhotoResponse = {} } = useQuery(
        'random-photo', getRandomPhoto
    );
    const { photo: randomPhoto } = randomPhotoResponse;

    // --- Modal photo
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    // - Callbacks
    const onScroll = useCallback(() => {
        // --- Position
        const scrollBottom = window.scrollY + window.innerHeight;
        const docBottom = document.body.offsetHeight;

        // --- Condition
        const canFetch = canFetchMore && !isFetching && !isFetchingMore;
        const isScrollReached = scrollBottom > docBottom - 700;

        // --- Fetch
        if (canFetch && isScrollReached) fetchMore();
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

    // - Elements
    // --- Meta
    let headTitle = publicTitle;
    let headDescription = `${publicTitle} built from Next.js by Zinglecode (for educational purpose only)`;
    let headUrl = process.env.NEXT_PUBLIC_HOST;
    let headOgImage = null, headTwitterImage = null;
    if (!!photo) {
        headTitle = `Photo by ${photo.user?.displayName} | ${publicTitle}`;
        headDescription = `Download this photo by ${photo.user?.displayName} on ${publicTitle}`;
        headUrl += `/photos/${photo.uid}`;
        headOgImage = <meta property="og:image" content={photo.url?.large} key="og-image" />;
        headTwitterImage = <meta name="twitter:image" content={photo.url?.large} key="twitter-image" />;
    }

    // --- Random photo
    let randomPhotoElement = null, randomUserElement = null;
    if (!!randomPhoto) {
        const { uid, url, user } = randomPhoto;
        randomPhotoElement = (
            <div className={style.hero_back}>
                <img src={url?.medium} alt="Random photo" />
            </div>
        );
        randomUserElement = (
            <p>
                <Link
                    href={`/?photoUid=${uid}`}
                    as={`/photos/${uid}`}
                    shallow={true}
                    scroll={false}
                >
                    <a className="has-text-white">Random photo</a>
                </Link>
                <span className="has-text-grey-light"> by </span>
                <Link href={'/[...slug]'} as={`/@${user?.username}`}>
                    <a className="has-text-white">{user?.displayName}</a>
                </Link>
            </p>
        );
    }

    // --- Photos
    const photoElements = photoArray.map(photo => (
        <MasonryItem key={photo.uid}>
            <PhotoItem photo={photo} />
        </MasonryItem>
    ));

    // --- Modal
    let photoModal = null;
    if (!!photo) {
        photoModal = <Modal><PhotoPost photo={photo} isModal={true} /></Modal>;
    }

    return (
        <>
            <Head>
                <meta name="description" content={headDescription} />
                <meta property="og:title" content={headTitle} />
                <meta property="og:description" content={headDescription} />
                <meta property="og:url" content={headUrl} />
                {headOgImage}
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content={headUrl} />
                {headTwitterImage}
                <title>{headTitle}</title>
            </Head>
            <Navbar />
            <section className={`hero is-dark is-large ${style.hero}`}>
                {randomPhotoElement}
                <div className={style.hero_main}>
                    <div className={style.hero_body}>
                        <div className={`content ${style.hero_content}`}>
                            <h1 className="title is-size-4-mobile is-size-1-tablet has-text-weight-bold">
                                Unsplash-Cloned
                            </h1>
                            <p className="is-size-6-mobile is-size-5-tablet has-text-weight-medium">
                                Built by Next.js, for educational purpose only
                            </p>
                            <div className="control has-icons-left is-hidden-mobile">
                                <input
                                    className="input is-medium"
                                    type="text"
                                    placeholder="Search photos (coming soon...)"
                                />
                                <span className="icon is-left">
                                    <Search size={18} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.hero_footer}>
                        <div className={`${style.hero_footer_item} is-size-7-mobile`}>
                            {randomUserElement}
                        </div>
                        <div className={`${style.hero_footer_item} is-size-7-mobile`}>
                            <a
                                className="has-text-white"
                                href="https://github.com/potchangelo/next-unsplash"
                                target="_blank"
                            >
                                Project code on Github
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <PhotosSection>
                <Masonry>
                    {photoElements}
                </Masonry>
            </PhotosSection>
            <LoadSpinner
                isShow={canFetchMore}
                isSpinning={isFetching || isFetchingMore}
            />
            <Footer />
            {photoModal}
        </>
    );
}