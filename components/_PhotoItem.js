import style from './css/photo_item.module.scss';
import Link from 'next/link';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';

function PhotoItem({ photo, user: indyUser, basedPage = '/' }) {
    if (!photo) return null;
    const {
        uid, width, height, description, 
        user: photoUser, url
    } = photo;
    const user = indyUser ?? photoUser;
    const paddingBottom = `${height / width * 100}%`;

    return (
        <>
            <div className={style.top}>
                <User user={user} hideUsername={true} />
            </div>
            <figure className={style.figure}>
                <div style={{ paddingBottom }} />
                <Link href={`${basedPage}?photoUid=${uid}`} as={`/photos/${uid}`} shallow={true} scroll={false}>
                    <a className={style.link}>
                        <img src={url.small} alt={description} />
                    </a>
                </Link>
                <div className={style.overlay}>
                    <div className={style.menu} />
                    <div className={style.menu}>
                        <User user={user} textColor={'white'} hideUsername={true} />
                    </div>
                </div>
            </figure>
            <div className={style.bottom}>
                <div className={style.bottom_space} />
                <div><PhotoDownloadButton photo={photo} /></div>
            </div>
        </>
    );
}

export default PhotoItem;