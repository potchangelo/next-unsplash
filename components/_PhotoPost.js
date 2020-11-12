import style from './css/photo_post.module.scss';
import { X } from 'react-feather';
import PhotoPostFigure from './_PhotoPostFigure';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';
import { ModalGuard } from '../layouts';
import { useRouter } from 'next/router';

function PhotoPost({ photo, isModal = false }) {
    const router = useRouter();

    // - Elements
    let postClass = 'photo_post', postInnerClass = 'photo_post_inner';
    let closeButton = null;
    if (!!isModal) {
        postClass = style.modal;
        postInnerClass = style.modal_inner;
        closeButton = (
            <div className={style.close} onClick={_ => router.back()}>
                <span className="icon">
                    <X size={24} />
                </span>
            </div>
        );
    }

    if (!photo) {
        return <div className={postClass}>No photo</div>;
    };

    return (
        <>
            <div className={postClass} onClick={_ => router.back()}>
                <div className={postInnerClass}>
                    <ModalGuard>
                        <div className={style.topbar}>
                            <User user={photo.user} />
                            <PhotoDownloadButton photo={photo} buttonStyle="focus" />
                        </div>
                        <div className={style.content}>
                            <PhotoPostFigure photo={photo} />
                        </div>
                        <div className={style.info}>
                            <p>{photo.description}</p>
                        </div>
                    </ModalGuard>
                </div>
            </div>
            {closeButton}
        </>
    );
}

export default PhotoPost;