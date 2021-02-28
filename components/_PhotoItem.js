import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import style from './css/photoItem.module.scss';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';

function PhotoItem(props) {
    // - Data
    const { photo, user: indyUser } = props;
    const { pathname, query } = useRouter();

    // - Extract
    if (!photo) return null;
    const {
        uid, width, height, description,
        user: photoUser, url
    } = photo;
    const user = indyUser ?? photoUser;

    // - Attributes
    const paddingBottom = `${height / width * 100}%`;

    return (
        <>
            <div className={style.top}>
                <User user={user} hideUsername={true} />
            </div>
            <figure className={style.figure}>
                <div style={{ paddingBottom }} />
                <Link
                    href={{ pathname, query: { ...query, photoUid: uid } }}
                    as={`/photos/${uid}`}
                    shallow={true}
                    scroll={false}
                >
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
                <div className={style.bottomSpace} />
                <div><PhotoDownloadButton photo={photo} /></div>
            </div>
        </>
    );
}

PhotoItem.propTypes = {
    photo: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        description: PropTypes.string,
        user: PropTypes.object,
        url: PropTypes.object.isRequired
    }).isRequired,
    user: PropTypes.object
};

export default PhotoItem;