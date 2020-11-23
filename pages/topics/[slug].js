import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPhoto, getTopic } from '../../api';
import { AppHeader, AppFooter, AppLoading, PhotoItem, PhotoPost } from '../../components';
import { Masonry, MasonryItem, Modal, Section } from '../../layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function TopicPage(props) {
    // - Data
    const { topic } = props;
    
    // --- Photos
    const {
        data: photoGroupArray = [], fetchMore,
        canFetchMore, isFetching, isFetchingMore
    } = useInfiniteQuery(
        ['topic-photos', topic?.slug, true],
        getTopic, {
        getFetchMore: (lastGroup = {}, allGroups) => {
            const { topic: theTopic = {} } = lastGroup;
            const { photos: lastPhotoArray = [] } = theTopic;
            const count = lastPhotoArray.length;
            if (count < 12) return false;
            return lastPhotoArray[count - 1].id;
        }
    });
    const photoArray = photoGroupArray.flatMap(group => {
        const { topic: theTopic = {} } = group;
        const { photos: groupPhotoArray = [] } = theTopic;
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

    // - Elements
    // --- Meta
    let headTitle = `Topic | ${publicTitle}`;
    let headDescription = `Download photos on ${publicTitle}`;
    let headUrl = process.env.NEXT_PUBLIC_HOST;
    let headImageUrl = '';
    if (!!topic) {
        headTitle = `${topic.title} | ${publicTitle}`;
        headDescription = `See the high resolution photos of ${topic.title} on Unsplash-Cloned`;
        headUrl += `/topics/${topic.slug}`;
        headImageUrl = topic.coverUrl?.large;
    }

    // --- Photos
    const photoElements = photoArray.map(photo => {
        return (
            <MasonryItem key={photo.uid}>
                <PhotoItem photo={photo} user={photo.user} basedPage={`/topics/[slug]`} />
            </MasonryItem>
        );
    });

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
                <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">{topic?.title}</h2>
                <p className="subtitle is-size-6-mobile is-size-5-tablet">{topic?.description}</p>
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
}

export async function getStaticPaths() {
    let resJson = {};
    try {
        resJson = await getTopics(null);
    }
    catch (error) {
        console.error(error);
    }

    const { topics: topicArray = [] } = resJson;
    const paths = topicArray.map(topic => {
        return { params: { slug: topic.slug } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    let resJson = {};
    try {
        resJson = await getTopic(null, slug);
    }
    catch (error) {
        console.error(error);
    }

    const { topic = null, errorCode = null } = resJson;
    return { props: { topic, errorCode } };
}