import style from './css/credit.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').PhotoSrc} props.photoSrc
 */
function Credit(props) {
  const { photoSrc } = props;
  return (
    <div className={style.main}>
      <a href={photoSrc?.creditPhotoLink} target="_blank" rel="noreferrer">
        Original Photo
      </a>{' '}
      by{' '}
      <a href={photoSrc?.creditUserLink} target="_blank" rel="noreferrer">
        {photoSrc?.creditUser}
      </a>{' '}
      on{' '}
      <a
        href="https://unsplash.com/@huper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
        target="_blank"
        rel="noreferrer"
      >
        Unsplash
      </a>
    </div>
  );
}

export default Credit;
