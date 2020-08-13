import style from './css/user.module.scss';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { getUser, getRandomUsers } from '../api';
import { Navbar } from '../components';

export default function User({ cacheUser }) {
    // - Data
    const { data: fetchedUser } = useQuery(
        ['user', !!cacheUser ? cacheUser.uid : null], 
        getUser
    );
    const user = fetchedUser || cacheUser;

    // - Elements
    let headTitle = 'User | Unsplash-cloned';
    let headDescription = 'Download photos on Unsplash-Cloned';
    let headUrl = 'http://localhost:3000';
    let headImageUrl = '';
    let userElement = null;
    if (!!user) {
        headTitle = `${user.displayName} (@${user.username}) | Unsplash-cloned`;
        headDescription = `Download photos by ${user.displayName} on Unsplash-Cloned`;
        headUrl += `/@${user.uid}`;
        headImageUrl = user.avatarUrl.large;
        userElement = (
            <div className={style.main}>
                <div className="columns is-variable is-6">
                    <div className="column is-narrow">
                        <img className={style.avatar} src={user.avatarUrl.large} />
                    </div>
                    <div className="column">
                        <h2 className="title is-2 has-text-weight-bold">{user.displayName}</h2>
                        <p>{user.biography}</p>
                    </div>
                </div>
            </div>
        );
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
        return { params: { atUsername: `@${user.username}` } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { atUsername } = context.params;
    const username = atUsername.slice(1);

    let cacheUser = null;
    try {
        cacheUser = await getUser(null, username);
    }
    catch (error) {
        console.error(error);
    }

    return { props: { cacheUser } };
}