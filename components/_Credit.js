import style from './css/credit.module.scss';

function Credit({ photoUrl }) {
    return (
        <div className={style.main}>
            <a href={photoUrl.creditPhotoLink} target="_blank">Original Photo</a> by <a href={photoUrl.creditUserLink} target="_blank">{photoUrl.creditUser}</a> on <a href="https://unsplash.com/@huper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank">Unsplash</a>
        </div>
    );
}

export default Credit;