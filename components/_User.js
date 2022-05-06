import Link from 'next/link';
import style from './css/user.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').User} props.user
 * @param {string} [props.textColor]
 * @param {boolean} [props.hideUsername]
 */
function User(props) {
  // - Data
  const { user, textColor, hideUsername = false } = props;

  // - Extract
  if (!user) return null;
  const { displayName, username, avatarUrl } = user;

  // - Attributes
  const userAvatarUrl = avatarUrl?.small ?? '/default-avatar.png';
  let textColorClass = 'has-text-black-ter';
  if (textColor === 'white') textColorClass = 'has-text-white';

  // - Elements
  let usernameText = <h6 className={`subtitle is-7 ${textColorClass}`}>@{username}</h6>;
  if (hideUsername) usernameText = null;

  return (
    <Link href={`/@${username}`}>
      <a className={style.main}>
        <img className={style.avatar} src={userAvatarUrl} />
        <div>
          <h5 className={`title is-6 ${textColorClass}`}>{displayName}</h5>
          {usernameText}
        </div>
      </a>
    </Link>
  );
}

export default User;
