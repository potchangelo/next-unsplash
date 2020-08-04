import style from './css/photos_section.module.scss';

function PhotosSection({ children }) {
    return (
        <section className={style.main}>
            <div className={style.wrapper}>
                {children}
            </div>
        </section>
    );
}

export default PhotosSection;