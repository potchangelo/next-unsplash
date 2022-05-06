import Link from 'next/link';
import style from './css/userSearchItem.module.scss';

const indexes = [0, 1, 2];

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').User} props.user
 */
function UserSearchItem(props) {
  // - Data
  const { user } = props;

  // - Extract
  if (!user) return null;
  const { displayName, username, avatarUrl, photos } = user;

  // - Attributes
  const userAvatarUrl = avatarUrl?.small ?? '/default-avatar.png';

  // - Elements
  const photoElements = indexes.map(index => {
    let photoImgElement = null;
    if (index < photos?.length) {
      photoImgElement = <img src={photos[index].url.thumbnail} />;
    }
    return (
      <div key={`p-${index}`} className={style.photo}>
        {photoImgElement}
      </div>
    );
  });

  return (
    <Link href={`/@${username}`}>
      <a className={style.main}>
        <div className={style.top}>
          <img className={style.avatar} src={userAvatarUrl} />
          <div className={style.name}>
            <h5 className={`title is-5`}>{displayName}</h5>
            <h6 className={`subtitle is-6 has-text-grey`}>@{username}</h6>
          </div>
        </div>
        <div className={style.photos}>{photoElements}</div>
        <button className="button is-small is-fullwidth has-text-weight-medium">View profile</button>
      </a>
    </Link>
  );
}

export default UserSearchItem;
