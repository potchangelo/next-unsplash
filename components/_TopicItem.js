import Link from 'next/link';
import style from './css/topicItem.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Topic} props.topic
 */
function TopicItem(props) {
  const { topic } = props;

  if (!topic) return null;
  const { uid, slug, title, description, cover } = topic;

  return (
    <Link key={uid} href={`/topics/${slug}`}>
      <a className={style.main}>
        <div className={style.imageCover}>
          <img className={style.image} src={cover?.small} />
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
