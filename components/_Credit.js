import PropTypes from 'prop-types';
import style from './css/credit.module.scss';

function Credit(props) {
  const { photoUrl } = props;
  return (
    <div className={style.main}>
      <a href={photoUrl?.creditPhotoLink} target="_blank">
        Original Photo
      </a>{' '}
      by{' '}
      <a href={photoUrl?.creditUserLink} target="_blank">
        {photoUrl?.creditUser}
      </a>{' '}
      on{' '}
      <a
        href="https://unsplash.com/@huper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
        target="_blank"
      >
        Unsplash
      </a>
    </div>
  );
}

Credit.propTypes = {
  photoUrl: PropTypes.shape({
    creditPhotoLink: PropTypes.string.isRequired,
    creditUser: PropTypes.string.isRequired,
    creditUserLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Credit;
