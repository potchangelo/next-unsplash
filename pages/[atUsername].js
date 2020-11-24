import style from './css/user.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getUser, getRandomUsers, getPhoto } from '../api';
import { AppHeader, AppFooter, AppNotFound, AppLoading, PhotoItem, PhotoPost } from '../components';
import { Modal, Masonry, MasonryItem, Section } from '../layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function UserPage(props) {
    // - Data
    // --- User
    const { user } = props;

    // --- Photos
    const {
        data: photoGroupArray = [], fetchMore,
        canFetchMore, isFetching, isFetchingMore
    } = useInfiniteQuery(
        ['user-photos', user?.username, true],
        getUser, {
        getFetchMore: (lastGroup = {}, allGroups) => {
            const { user: theUser = {} } = lastGroup;
            const { photos: lastPhotoArray = [] } = theUser;
            const count = lastPhotoArray.length;
            if (count < 12) return false;
            return lastPhotoArray[count - 1].id;
        }
    });
    const photoArray = photoGroupArray.flatMap(group => {
        const { user: theUser = {} } = group;
        const { photos: groupPhotoArray = [] } = theUser;
        return groupPhotoArray;
    });

    // --- Modal photo
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    // - Callback
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

    // - Checking
    if (!user) return <AppNotFound />
    const { username, displayName, biography, avatarUrl } = user;

    // - Elements
    // --- Meta
    const headTitle = `${displayName} (@${username}) | ${publicTitle}`;
    const headDescription = `Download photos by ${displayName} on ${publicTitle}`;
    const headUrl = `${process.env.NEXT_PUBLIC_HOST}/@${username}`;
    const headImageUrl = avatarUrl?.large ?? '/default-avatar.png';

    // --- User
    const userElement = (
        <div className={style.main}>
            <div className="columns is-variable is-2-mobile is-6-tablet">
                <div className="column is-narrow py-0">
                    <img
                        className={style.avatar}
                        src={avatarUrl?.large ?? '/default-avatar.png'}
                        alt="Avatar"
                    />
                </div>
                <div className="column py-0 content">
                    <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold my-4">
                        {displayName}
                    </h2>
                    <p>{biography}</p>
                </div>
            </div>
        </div>
    );

    // --- Photos
    const photoElements = photoArray.map(photo => (
        <MasonryItem key={photo.uid}><PhotoItem photo={photo} user={user} /></MasonryItem>
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
                <meta property="og:image" content={headImageUrl} key="og-image" />
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content={headUrl} />
                <meta name="twitter:image" content={headImageUrl} key="twitter-image" />
                <title>{headTitle}</title>
            </Head>
            <AppHeader />
            <Section type="top">
                {userElement}
            </Section>
            <Section type="photos">
                <Masonry>
                    {photoElements}
                </Masonry>
            </Section>
            <AppLoading
                isShow={canFetchMore}
                isSpinning={isFetching || isFetchingMore}
            />
            <AppFooter />
            {photoModal}
        </>
    );
};

export async function getStaticPaths() {
    let resJson = {};
    try {
        resJson = await getRandomUsers();
    }
    catch (error) {
        console.error(error);
    }

    const { users: userArray = [] } = resJson;
    const paths = userArray.map(user => {
        return { params: { atUsername: `@${user.username}` } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { atUsername } = context.params;
    const username = atUsername?.slice(1);

    let userJson = {};
    try {
        userJson = await getUser(null, username);
    }
    catch (error) {
        console.error(error);
    }

    const { user = null, errorCode = null } = userJson;
    return { props: { user, errorCode } };
}