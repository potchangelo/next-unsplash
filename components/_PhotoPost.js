import style from './css/photo_post.module.scss';

function PhotoPost({ photo }) {
    // - Elements
    let userElement = null, photoElement = null;
    
    if (!!photo) {
        const {
            width, height, description, 
            url, user
        } = photo;

        userElement = (
            <div className="user">
                <h2 className="title">{user.displayName}</h2>
                <h4 className="title">@{user.username}</h4>
            </div>
        );
        photoElement = (
            <div className="photo">
                <img src={url.large} width={width} height={height} alt={description} />
            </div>
        );
    }

    return (
        <>
            <div className={style.main} onClick={(e) => {
                e.stopPropagation()
                console.log(9)
            }}>
                {userElement}
                {photoElement}
            </div>
        </>
    );
}

export default PhotoPost;