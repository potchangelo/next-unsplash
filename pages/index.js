import style from './css/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { Search } from 'react-feather';
import { getPhotos, getPhoto, getRandomPhoto } from '../api';
import { Modal, Masonry, MasonryItem, PhotosSection } from '../layouts/';
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

    const { data: randomPhoto } = useQuery('random-photo', getRandomPhoto)

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
    let randomPhotoElement = null, randomUserElement = null;
    if (!!randomPhoto) {
        const { uid, url, user } = randomPhoto;
        randomPhotoElement = (
            <div className={style.hero_back}>
                <img src={url.medium} />
            </div>
        );
        randomUserElement = (
            <p>
                <Link href={`/?photoUid=${uid}`} as={`/photos/${uid}`} shallow={true} scroll={false}>
                    <a className="has-text-white">Random photo</a>
                </Link>
                <span className="has-text-grey-light"> by </span>
                <Link href={`/@${user.username}`}>
                    <a className="has-text-white">{user.displayName}</a>
                </Link>
            </p>
        );
    }

    const photoElements = photoArray.map(photo => {
        return (
            <MasonryItem key={photo.uid}>
                <PhotoItem photo={photo} />
            </MasonryItem>
        );
    });

    let headTitle = 'Unsplash-Cloned', photoModal = null;
    const headDescription = 'Unsplash-Cloned built from Next.js by Zinglecode (for educational purpose only)'
	if (!!photo) {
        headTitle = `Photo by ${photo.user.displayName} | Unsplash-Cloned`;
        photoModal = <Modal><PhotoPost photo={photo} isModal={true} /></Modal>;
	}

    return (
        <>
            <Head>
                <meta name="description" content={headDescription} />
                <meta property="og:title" content={headTitle} />
                <meta property="og:description" content={headDescription} />
                <meta property="og:url" content="http://localhost:3000/" />
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content="http://localhost:3000/" />
                <title>{headTitle}</title>
            </Head>
            <Navbar />
            <section className={`hero is-dark is-large ${style.hero}`}>
                {randomPhotoElement}
                <div className={style.hero_main}>
                    <div className={style.hero_body}>
                        <div className={`content ${style.hero_content}`}>
                            <h1 className="title is-1 has-text-weight-bold">Unsplash-Cloned</h1>
                            <p className="is-size-5">Built by Next.js, for educational purpose only</p>
                            <div className="control has-icons-left">
                                <input className="input is-medium" type="text" placeholder="Search photos (coming soon...)" />
                                <span className="icon is-left">
                                    <Search size={18} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.hero_footer}>
                        <div className={style.hero_footer_item}>
                            {randomUserElement}
                        </div>
                        <div className={style.hero_footer_item}>
                            <a className="has-text-white" href="https://github.com/potchangelo/next-unsplash" target="_blank">Project code on Github</a>
                        </div>
                    </div>
                </div>
            </section>
            <PhotosSection>
                <Masonry>
                    {photoElements}
                </Masonry>
            </PhotosSection>
            {photoModal}
        </>
    );
}

export default Home;
