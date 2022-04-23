import Link from 'next/link';
import PropTypes from 'prop-types';
import style from './css/topicItem.module.scss';

function TopicItem(props) {
  const { topic } = props;

  if (!topic) return null;
  const { uid, slug, title, description, coverUrl } = topic;

  return (
    <Link key={uid} href={`/topics/${slug}`}>
      <a className={style.main}>
        <div className={style.imageCover}>
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

TopicItem.propTypes = {
  topic: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverUrl: PropTypes.object,
  }).isRequired,
};

export default TopicItem;
