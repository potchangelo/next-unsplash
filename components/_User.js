import style from './css/user.module.scss';
import Link from 'next/link'

function User({ user, textColor, hideUsername }) {
    if (!user) return null;

    // - Data
    const { displayName, username, avatarUrl } = user;

    // - Attributes
    const userAvatarUrl = avatarUrl?.small ?? 'https://via.placeholder.com/64';
    let textColorClass = 'has-text-black-ter';
    if (textColor === 'white') {
        textColorClass = 'has-text-white';
    }

    // - Elements
    let usernameText = (
        <h6 className={`subtitle is-7 ${textColorClass}`}>@{username}</h6>
    );
    if (!!hideUsername) {
        usernameText = null;
    }

    return (
        <Link href={'/[...slug]'} as={`/@${username}`}>
            <a className={style.main}>
                <img className={style.avatar} src={userAvatarUrl} />
                <div>
                    <h5 className={`title is-6 ${textColorClass}`}>{displayName}</h5>
                    {usernameText}
                </div>
            </a>
        </Link>
    );
};

export default User;