import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ModalGuard } from 'z/layouts';
import Credit from './_Credit';
import PhotoDownloadButton from './_PhotoDownloadButton';
import PhotoPostFigure from './_PhotoPostFigure';
import User from './_User';
import style from './css/photoPost.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Photo} props.photo
 * @param {boolean} [props.isModal]
 */
function PhotoPost(props) {
  // - Data
  const { photo, isModal = false } = props;
  const router = useRouter();

  // - Attributes
  let postClass = style.main,
    postInnerClass = 'photo_post_inner';
  if (!!isModal) {
    postClass = style.modal;
    postInnerClass = style.modalInner;
  }

  // - Extract
  if (!photo) {
    return <div className={postClass}>No photo</div>;
  }
  const { description, topics = [], user } = photo;

  // - Elements
  // --- Close for modal
  let closeButton = null;
  if (!!isModal) {
    closeButton = (
      <div className={style.close} onClick={router.back}>
        <span className="icon">
          <XIcon />
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
  if (topics.length > 0) {
    const topicTagElements = topics.map(topic => {
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
      <div className={postClass} onClick={router.back}>
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
              <Credit photoUrl={photo.src} />
            </div>
          </ModalGuard>
        </div>
      </div>
      {closeButton}
    </>
  );
}

export default PhotoPost;
