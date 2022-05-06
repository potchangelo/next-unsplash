import Link from 'next/link';
import { useRouter } from 'next/router';
import PhotoDownloadButton from './_PhotoDownloadButton';
import User from './_User';
import style from './css/photoItem.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Photo} props.photo
 * @param {*} [props.user]
 */
function PhotoItem(props) {
  // - Data
  const { photo, user: indyUser } = props;
  const { pathname, query } = useRouter();

  // - Extract
  if (!photo) return null;
  const { uid, width, height, description, user: photoUser, url } = photo;
  const user = indyUser ?? photoUser;

  // - Attributes
  const paddingBottom = `${(height / width) * 100}%`;

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
        <div>
          <PhotoDownloadButton photo={photo} />
        </div>
      </div>
    </>
  );
}

export default PhotoItem;
