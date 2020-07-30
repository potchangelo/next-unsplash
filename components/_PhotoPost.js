import style from './css/photo_post.module.scss';
import User from './_User';
import Photo from './_Photo';
import { ModalGuard } from '../layouts';

function PhotoPost({ photo }) {
    if (!photo) {
        return <div className={style.main}>No photo</div>
    };

    return (
        <>
            <div className={style.main}>
                <ModalGuard>
                    <div><User user={photo.user} /></div>
                    <Photo photo={photo} />
                    <div className={style.info}>
                        <p>{photo.description}</p>
                    </div>
                </ModalGuard>
            </div>
        </>
    );
}

export default PhotoPost;