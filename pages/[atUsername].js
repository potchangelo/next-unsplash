import Head from 'next/head';
import style from './css/user.module.scss';
import { getUser, getRandomUsers } from '../api';
import { AppHeader, AppFooter, AppNotFound, AppLoading, PhotoItem, PhotoPost, Credit } from '../components';
import { usePhotos } from '../helpers/hooks';
import { Modal, Masonry, MasonryItem, Section } from '../layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

function getNextPageParam(lastPage = {}, _) {
    const { user = {} } = lastPage;
    const { photos = [] } = user;
    const count = photos.length;
    if (count < 12) return false;
    return photos[count - 1].id;
}

function flatMapPhotos(page) {
    const { user = {} } = page;
    const { photos = [] } = user;
    return photos;
}

export default function UserPage(props) {
    // - Data
    // --- User
    const { user } = props;

    // --- Photos
    const {
        photoArray, photo, hasNextPage, isFetching, isFetchingNextPage
    } = usePhotos(
        ['user-photos', user?.username, true], 
        (pageParam) => getUser(user?.username, true, pageParam), 
        getNextPageParam, flatMapPhotos
    );

    // - Extract
    if (!user) return <AppNotFound />;
    const { username, displayName, biography, avatarUrl } = user;

    // - Elements
    // --- Meta
    const headTitle = `${displayName} (@${username}) | ${publicTitle}`;
    const headDescription = `Download photos by ${displayName} on ${publicTitle}`;
    const headUrl = `${process.env.NEXT_PUBLIC_HOST}/@${username}`;
    const headImageUrl = avatarUrl?.large ?? '/default-avatar.png';

    // --- Credit
    let creditElement = null;
    if (!!user.avatarUrl) {
        creditElement = (
            <div>
                <Credit photoUrl={user.avatarUrl} />
            </div>
        );
    }

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
                    <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold my-2">
                        {displayName}
                    </h2>
                    <p>{biography}</p>
                    {creditElement}
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
                isShow={hasNextPage}
                isSpinning={isFetching || isFetchingNextPage}
            />
            <AppFooter />
            {photoModal}
        </>
    );
};

export async function getStaticPaths() {
    let usersJson = {};
    try {
        usersJson = await getRandomUsers();
    }
    catch (error) {
        console.error(error);
    }

    const { users: userArray = [] } = usersJson;
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
        userJson = await getUser(username);
    }
    catch (error) {
        console.error(error);
    }

    const { user = null, errorCode = null } = userJson;
    return { props: { user, errorCode } };
}