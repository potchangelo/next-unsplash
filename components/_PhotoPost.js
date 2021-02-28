import Link from 'next/link';
import { useRouter } from 'next/router';
import { X } from 'react-feather';
import PropTypes from 'prop-types';
import style from './css/photoPost.module.scss';
import PhotoPostFigure from './_PhotoPostFigure';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';
import Credit from './_Credit';
import { ModalGuard } from '../layouts';

function PhotoPost(props) {
    // - Data
    const { photo, isModal } = props;
    const router = useRouter();

    // - Attributes
    let postClass = style.main, postInnerClass = 'photo_post_inner';
    if (!!isModal) {
        postClass = style.modal;
        postInnerClass = style.modalInner;
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
            const { uid, slug, title } = topic;
            return (
                <Link key={uid} href={`/topics/${slug}`}>
                    <a className="tag">{title}</a>
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
                        <div className={style.credit}>
                            <Credit photoUrl={photo.url} />
                        </div>
                    </ModalGuard>
                </div>
            </div>
            {closeButton}
        </>
    );
}

PhotoPost.propTypes = {
    photo: PropTypes.shape({
        description: PropTypes.string,
        topics: PropTypes.arrayOf(PropTypes.object),
        user: PropTypes.object
    }).isRequired,
    isModal: PropTypes.bool
};

PhotoPost.defaultProps = {
    isModal: false
};

export default PhotoPost;