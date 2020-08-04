import style from './css/photo_post.module.scss';
import { ChevronDown, X } from 'react-feather';
import User from './_User';
import PhotoPostFigure from './_PhotoPostFigure';
import { ModalGuard } from '../layouts';

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
                        <div className="buttons has-addons">
                            <a className="button is-success has-text-weight-bold" href={`/photos/${photo.uid}`}>
                                Download free
                            </a>
                            <button className={`button is-success ${style.dl_more}`} type="button">
                                <span className="icon">
                                    <ChevronDown size={20} strokeWidth={3} />
                                </span>
                            </button>
                        </div>
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