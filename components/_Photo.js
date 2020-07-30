import style from './css/photo.module.scss';

function Photo({ photo }) {
    if (!photo) return null;

    const { width, height, description, url } = photo;

    return (
        <div className={style.main}>
            <figure className={style.item}>
                <img src={url.large} width={width} height={height} alt={description} />
            </figure>
        </div>
    );
};

export default Photo;