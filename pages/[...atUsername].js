import style from './css/user.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getUser, getRandomUsers, getPhoto } from '../api';
import { Modal, Masonry, MasonryItem, PhotosSection } from '../layouts';
import { Navbar, PhotoItem, PhotoPost } from '../components';

export default function({ cacheUser }) {
    // - Data
    const [photo, setPhoto] = useState(null);

    const { data: fetchedUser } = useQuery(
        ['user', !!cacheUser ? cacheUser.username : null], 
        getUser
    );
    const user = fetchedUser || cacheUser;

    const router = useRouter();

    // - Callback
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
        const { photoUid } = router.query;
		if (!!photoUid) {
			loadPhoto(photoUid);
		}
		else {
			setPhoto(null);
		}
    }, [router.query, loadPhoto]);

    // - Elements
    let headTitle = 'User | Unsplash-cloned';
    let headDescription = 'Download photos on Unsplash-Cloned';
    let headUrl = 'http://localhost:3000';
    let headImageUrl = '';
    let userElement = null, photoElements = null;
    if (!!user) {
        headTitle = `${user.displayName} (@${user.username}) | Unsplash-cloned`;
        headDescription = `Download photos by ${user.displayName} on Unsplash-Cloned`;
        headUrl += `/@${user.username}`;

        const userAvatarUrl = user.avatarUrl?.large ?? 'https://via.placeholder.com/256';
        headImageUrl = userAvatarUrl;

        userElement = (
            <div className={style.main}>
                <div className="columns is-variable is-6">
                    <div className="column is-narrow">
                        <img className={style.avatar} src={userAvatarUrl} />
                    </div>
                    <div className="column">
                        <h2 className="title is-2 has-text-weight-bold">{user.displayName}</h2>
                        <p>{user.biography}</p>
                    </div>
                </div>
            </div>
        );

        if (!!user.photos) {
            photoElements = user.photos.map(photo => {
                return (
                    <MasonryItem key={photo.uid}>
                        <PhotoItem photo={photo} user={user} basedPage={`/[...atUsername]`} />
                    </MasonryItem>
                );
            });
        }
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
        return { params: { atUsername: [`@${user.username}`] } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { atUsername } = context.params;
    const username = atUsername[0].slice(1);

    let cacheUser = null;
    try {
        cacheUser = await getUser(null, username);
    }
    catch (error) {
        console.error(error);
    }

    return { props: { cacheUser } };
}