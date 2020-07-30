import style from './css/user.module.scss';
import Link from 'next/link'

function User({ user }) {
    if (!user) return null;

    const { displayName, username, avatarUrl } = user;

    let userAvatarUrl = 'https://via.placeholder.com/64';
    if (!!avatarUrl) {
        userAvatarUrl = avatarUrl.small;
    }

    return (
        <Link href={`/@${username}`}>
            <a className={style.main}>
                <img className={style.avatar} src={userAvatarUrl} />
                <div>
                    <h5 className="title is-6">{displayName}</h5>
                    <h6 className="subtitle is-7 ">@{username}</h6>
                </div>
            </a>
        </Link>
    );
};

export default User;