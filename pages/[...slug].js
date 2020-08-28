import style from './css/user.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { getUser, getUserPhotos, getRandomUsers, getPhoto } from '../api';
import { Modal, Masonry, MasonryItem, PhotosSection } from '../layouts';
import { Navbar, PhotoItem, PhotoPost, LoadSpinner, Footer } from '../components';

export default function UserPage({ cacheUser }) {
    // - Data
    const [photo, setPhoto] = useState(null);

    const { data: fetchedUser } = useQuery(
        ['user', !!cacheUser ? cacheUser.username : null], 
        getUser
    );
    const user = fetchedUser || cacheUser;

    const { 
        data: photoGroupArray = [], 
        fetchMore, 
        canFetchMore, isFetching, isFetchingMore
    } = useInfiniteQuery(
        ['user-photos', !!cacheUser ? cacheUser.username : null], 
        getUserPhotos, 
        {
            getFetchMore: (lastGroup, allGroups) => {
                if (lastGroup.length < 12) return false;
                return lastGroup[lastGroup.length - 1].id;
        }
    });
    const photoArray = photoGroupArray.flat() || cacheUser.photos;

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
    }, [router.query, loadPhoto]);

    // - Elements
    const publicTitle = process.env.NEXT_PUBLIC_TITLE;
    let headTitle = `User | ${publicTitle}`;
    let headDescription = `Download photos on ${publicTitle}`;
    let headUrl = process.env.NEXT_PUBLIC_HOST;
    let headImageUrl = '';
    let userElement = null, photoElements = null;
    if (!!user) {
        headTitle = `${user.displayName} (@${user.username}) | ${publicTitle}`;
        headDescription = `Download photos by ${user.displayName} on ${publicTitle}`;
        headUrl += `/@${user.username}`;

        const userAvatarUrl = user.avatarUrl?.large ?? '/default-avatar.png';
        headImageUrl = userAvatarUrl;

        userElement = (
            <div className={style.main}>
                <div className="columns is-mobile is-variable is-2-mobile is-6-tablet">
                    <div className="column is-narrow py-0">
                        <img className={style.avatar} src={userAvatarUrl} />
                    </div>
                    <div className="column py-0 content">
                        <h2 className="title is-size-5-mobile is-size-2-tablet has-text-weight-bold my-4">{user.displayName}</h2>
                        <p>{user.biography}</p>
                    </div>
                </div>
            </div>
        );
    }
    if (!!photoArray) {
        photoElements = photoArray.map(photo => {
            return (
                <MasonryItem key={photo.uid}>
                    <PhotoItem photo={photo} user={user} basedPage={`/[...slug]`} />
                </MasonryItem>
            );
        });
    }

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
                <meta property="og:image" content={headImageUrl} key="og-image" />
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content={headUrl} />
                <meta name="twitter:image" content={headImageUrl} key="twitter-image" />
                <title>{headTitle}</title>
            </Head>
            <Navbar />
            <section>
                {userElement}
            </section>
            <PhotosSection>
                <Masonry>
                    {photoElements}
                </Masonry>
            </PhotosSection>
            <LoadSpinner 
                isShow={canFetchMore} 
                isSpinning={isFetching || isFetchingMore} />
            <Footer />
            {photoModal}
        </>
    );
};

export async function getStaticPaths() {
    let userArray = [];
    try {
        userArray = await getRandomUsers();
    }
    catch (error) {
        console.error(error);
    }

    const paths = userArray.map(user => {
        return { params: { slug: [`@${user.username}`] } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const username = slug[0].slice(1);

    let cacheUser = null;
    try {
        cacheUser = await getUser(null, username);
    }
    catch (error) {
        console.error(error);
    }

    return { props: { cacheUser } };
}