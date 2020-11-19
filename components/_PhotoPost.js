import style from './css/photo_post.module.scss';
import { X } from 'react-feather';
import PhotoPostFigure from './_PhotoPostFigure';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';
import { ModalGuard } from '../layouts';
import { useRouter } from 'next/router';
import Link from 'next/link';

function PhotoPost({ photo, isModal = false }) {
    const router = useRouter();

    // - Attributes
    let postClass = 'photo_post', postInnerClass = 'photo_post_inner';
    if (!!isModal) {
        postClass = style.modal;
        postInnerClass = style.modal_inner;
    }
    
    // - Extract
    if (!photo) {
        return <div className={postClass}>No photo</div>;
    };
    const { description, topics: topicArray = [], user } = photo;

    // - Elements
    // --- Close for modal
    let closeButton = null;
    if (!!isModal) {
        closeButton = (
            <div className={style.close} onClick={_ => router.back()}>
                <span className="icon">
                    <X size={24} strokeWidth={2} />
                </span>
            </div>
        );
    }

    // --- Description
    let descriptionElement = null;
    if (!!description) {
        descriptionElement = (
            <div className={style.info}>
                <p>{description}</p>
            </div>
        );
    }

    // --- Topics
    let topicElement = null;
    if (topicArray.length > 0) {
        const topicTagElements = topicArray.map(topic => {
            const { uid, title } = topic;
            return (
                <Link key={uid} href={`/topics/:uid`} as={`/topics/${uid}`}>
                    <a key={uid} className="tag">{title}</a>
                </Link>
            );
        });
        topicElement = (
            <div className={style.info}>
                <h5 className="title is-6 mb-4">Related topics</h5>
                <div className="tags">{topicTagElements}</div>
            </div>
        );
    }

    return (
        <>
            <div className={postClass} onClick={_ => router.back()}>
                <div className={postInnerClass}>
                    <ModalGuard>
                        <div className={style.topbar}>
                            <User user={user} />
                            <PhotoDownloadButton photo={photo} buttonStyle="focus" />
                        </div>
                        <div className={style.content}>
                            <PhotoPostFigure photo={photo} />
                        </div>
                        {descriptionElement}
                        {topicElement}
                    </ModalGuard>
                </div>
            </div>
            {closeButton}
        </>
    );
}

export default PhotoPost;