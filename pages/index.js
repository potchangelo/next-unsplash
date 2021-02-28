import style from './css/home.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'react-feather';
import { useQuery } from 'react-query';
import { getPhotos, getRandomPhoto, getTopics } from '../api';
import { AppHeader, AppFooter, AppLoading, PhotoItem, PhotoPost } from '../components';
import { Modal, Masonry, MasonryItem, Section } from '../layouts/';
import { usePhotos } from '../helpers/hooks';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

function getFetchMore(lastGroup = {}, _) {
    const { photos = [] } = lastGroup;
    const count = photos.length;
    if (count < 12) return false;
    return photos[count - 1].id;
}

function flatMapPhotos(group) {
    const { photos = [] } = group;
    return photos;
}

export default function HomePage(props) {
    // - Data
    // --- Topics
    const { topicArray } = props;

    // --- Photos
    const {
        photoArray, photo,
        canFetchMore, isFetching, isFetchingMore
    } = usePhotos('photos', getPhotos, getFetchMore, flatMapPhotos);

    // --- Random photo
    const { data: randomPhotoResponse = {} } = useQuery(
        'random-photo', getRandomPhoto
    );
    const { photo: randomPhoto } = randomPhotoResponse;

    const router = useRouter();

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
        const { pathname, query } = router;
        const { uid, url, user } = randomPhoto;
        randomPhotoElement = (
            <div className={style.heroBack}>
                <img src={url?.medium} alt="Random photo" />
            </div>
        );
        randomUserElement = (
            <p>
                <Link
                    href={{ pathname, query: { ...query, photoUid: uid } }}
                    as={`/photos/${uid}`}
                    shallow={true}
                    scroll={false}
                >
                    <a className="has-text-white">Random photo</a>
                </Link>
                <span className="has-text-grey-light"> by </span>
                <Link href={`/@${user?.username}`}>
                    <a className="has-text-white">{user?.displayName}</a>
                </Link>
            </p>
        );
    }

    // --- Photos
    const photoElements = photoArray.map(photo => (
        <MasonryItem key={photo.uid}><PhotoItem photo={photo} /></MasonryItem>
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
            <AppHeader topicArray={topicArray} />
            <section className={`hero is-dark is-large ${style.hero}`}>
                {randomPhotoElement}
                <div className={style.heroMain}>
                    <div className={style.heroBody}>
                        <div className={`content ${style.heroContent}`}>
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
                    <div className={style.heroFooter}>
                        <div className={`${style.heroFooterItem} is-size-7-mobile`}>
                            {randomUserElement}
                        </div>
                        <div className={`${style.heroFooterItem} is-size-7-mobile`}>
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

export async function getStaticProps() {
    let topicsJson = {};
    try {
        topicsJson = await getTopics(null);
    }
    catch (error) {
        console.error(error);
    }

    const { topics: topicArray = [], errorCode = null } = topicsJson;
    return { props: { topicArray, errorCode } };
}