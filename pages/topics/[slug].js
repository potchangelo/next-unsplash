import Head from 'next/head';
import { getTopic, getTopics } from '../../api';
import { AppHeader, AppFooter, AppLoading, AppNotFound, PhotoItem, PhotoPost } from '../../components';
import { usePhotos } from '../../helpers/hooks';
import { Masonry, MasonryItem, Modal, Section } from '../../layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

function getNextPageParam(lastPage = {}, _) {
    const { topic = {} } = lastPage;
    const { photos = [] } = topic;
    const count = photos.length;
    if (count < 12) return false;
    return photos[count - 1].id;
}

function flatMapPhotos(page) {
    const { topic = {} } = page;
    const { photos = [] } = topic;
    return photos;
}

export default function TopicPage(props) {
    // - Data
    // --- Topic
    const { topic, topicArray } = props;
    
    // --- Photos
    const {
        photoArray, photo, hasNextPage, isFetching, isFetchingNextPage
    } = usePhotos(
        ['topic-photos', topic?.slug, true],
        (pageParam) => getTopic(topic?.slug, true, pageParam), 
        getNextPageParam, flatMapPhotos
    );

    // - Extract
    if (!topic) return <AppNotFound />;
    const { slug, title, description, coverUrl } = topic;

    // - Elements
    // --- Meta
    const headTitle = `${title} | ${publicTitle}`;
    const headDescription = `See the high resolution photos of ${title} on Unsplash-Cloned`;
    const headUrl = `${process.env.NEXT_PUBLIC_HOST}/topics/${slug}`;
    const headImageUrl = coverUrl?.large;

    // --- Photos
    const photoElements = photoArray.map(photo => (
        <MasonryItem key={photo.uid}><PhotoItem photo={photo} user={photo.user} /></MasonryItem>
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
            <AppHeader topicArray={topicArray} />
            <Section type="top">
                <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">{title}</h2>
                <p className="subtitle is-size-6-mobile is-size-5-tablet">{description}</p>
            </Section>
            <Section type="photos">
                <Masonry>
                    {photoElements}
                </Masonry>
            </Section>
            <AppLoading
                isShow={hasNextPage}
                isSpinning={isFetching || isFetchingNextPage}
            />
            <AppFooter />
            {photoModal}
        </>
    );
}

export async function getStaticPaths() {
    let topicsJson = {};
    try {
        topicsJson = await getTopics();
    }
    catch (error) {
        console.error(error);
    }

    const { topics: topicArray = [] } = topicsJson;
    const paths = topicArray.map(topic => {
        return { params: { slug: topic.slug } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    let topicJson = {}, allTopicsJson = {};
    try {
        topicJson = await getTopic(slug);
        allTopicsJson = await getTopics();
    }
    catch (error) {
        console.error(error);
    }

    const { topic = null, errorCode = null } = topicJson;
    const { topics: topicArray = [] } = allTopicsJson;
    return { props: { topic, topicArray, errorCode } };
}