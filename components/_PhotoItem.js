import style from './css/photo_item.module.scss';
import Link from 'next/link';

function PhotoItem({ photo }) {
    const {
        uid, width, height, description, 
        user, photoUrl
    } = photo;

    let userAvatarUrl = 'https://via.placeholder.com/64';
    if (!!user.avatar) {
        userAvatarUrl = user.avatar.urlSmall;
    }

    return (
        <figure className={style.figure}>
            <Link href={`/?photoUid=${uid}`} as={`/photos/${uid}`} shallow={true} scroll={false}>
                <a className={style.link}>
                    <img src={photoUrl.urlSmall} alt={description} />
                </a>
            </Link>
            <div className={style.overlay}>
                <div className={style.menu} />
                <div className={style.menu}>
                    <div className={style.user}>
                        <Link href={`@${user.username}`}>
                            <a>
                                <img className={style.user_avatar} src={userAvatarUrl} alt={user.displayName} />
                            </a>
                        </Link>
                        <div className={style.user_text}>
                            <Link href={`@${user.username}`}>
                                <a className={`has-text-white`}>{user.displayName}</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </figure>
    );
}

export default PhotoItem;