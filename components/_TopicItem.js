import style from './css/topic_item.module.scss';
import Link from 'next/link';

function TopicItem(props) {
    const { topic } = props;

    if (!topic) return null;
    const { uid, slug, title, description, isFeatured, coverUrl = {} } = topic;

    return (
        <Link key={uid} href={`/topics/:slug`} as={`/topics/${slug}`}>
            <a className={style.main}>
                <div className={style.image_cover}>
                    <img className={style.image} src={coverUrl?.small} />
                </div>
                <div className={`${style.info} content`}>
                    <h6 className="title is-6">{title}</h6>
                    <p className={style.description}>{description}</p>
                </div>
            </a>
        </Link>
    );
}

export default TopicItem;