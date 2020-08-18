import style from './css/photo_post.module.scss';
import { X } from 'react-feather';
import PhotoPostFigure from './_PhotoPostFigure';
import User from './_User';
import { ModalGuard } from '../layouts';
import PhotoDownloadButton from './_PhotoDownloadButton';

function PhotoPost({ photo, isModal }) {
    // Elements
    let postClass = 'photo_post', closeButton = null;
    if (!!isModal) {
        postClass = style.modal;
        closeButton = (
            <div className={style.close}>
                <span className="icon">
                    <X size={24} />
                </span>
            </div>
        );
    }

    if (!photo) {
        return <div className={postClass}>No photo</div>
    };

    return (
        <>
            <div className={postClass}>
                <ModalGuard>
                    <div className={style.topbar}>
                        <User user={photo.user} />
                        <PhotoDownloadButton photo={photo} />
                    </div>
                    <div className={style.content}>
                        <PhotoPostFigure photo={photo} />
                    </div>
                    <div className={style.info}>
                        <p>{photo.description}</p>
                    </div>
                </ModalGuard>
            </div>
            {closeButton}
        </>
    );
}

export default PhotoPost;