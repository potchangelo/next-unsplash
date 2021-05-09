import Head from 'next/head';
import { useQuery } from 'react-query';
import { searchUsers } from '../../../api';
import { AppHeader, AppFooter, UserSearchItem } from '../../../components';
import { Section } from '../../../layouts';

const publicTitle = process.env.NEXT_PUBLIC_TITLE;

export default function SearchPhotosPage(props) {
    // - Data
    // --- Search query
    const { q = '' } = props;

    // --- Users
    const { data = {} } = useQuery(['search-users', q], () => searchUsers(q));
    const { users } = data;

    // - Elements
    // --- Meta
    const title = q.charAt(0).toUpperCase() + q.slice(1);
    let headTitle = `${title} users | ${publicTitle}`;;
    let headDescription = `User of ${q} on Unsplash-Cloned`;
    let headUrl = `${process.env.NEXT_PUBLIC_HOST}/search/users/${q}`;

    // --- Users
    let userElements = users?.map(user => {
        return (
            <div key={user.uid} className="column is-6-tablet is-4-desktop">
                <UserSearchItem user={user} />
            </div>
        );
    });

    return (
        <>
            <Head>
                <meta name="description" content={headDescription} />
                <meta property="og:title" content={headTitle} />
                <meta property="og:description" content={headDescription} />
                <meta property="og:url" content={headUrl} />
                <meta name="twitter:title" content={headTitle} />
                <meta name="twitter:description" content={headDescription} />
                <meta name="twitter:url" content={headUrl} />
                <title>{headTitle}</title>
            </Head>
            <AppHeader isShowSearchTypes={true} />
            <Section type="top">
                <h2 className="title is-size-4-mobile is-size-2-tablet has-text-weight-bold">{title}</h2>
            </Section>
            <Section>
                <div className="columns is-multiline">
                    {userElements}
                </div>
            </Section>
            <AppFooter />
        </>
    );
}

export async function getStaticPaths() {
    const qArray = ['on', 'from']
    const paths = qArray.map(q => {
        return { params: { q } }
    });

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const { q } = context.params;
    return { props: { q } };
}