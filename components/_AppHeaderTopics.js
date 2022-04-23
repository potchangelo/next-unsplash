import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import style from './css/appHeader.module.scss';

function AppHeaderTopics(props) {
  // - Data
  const { topicArray } = props;
  const [hasScrollLeft, setHasScrollLeft] = useState(false);
  const [hasScrollRight, setHasScrollRight] = useState(false);
  const scrollAreaRef = useRef(null);
  const { asPath } = useRouter();

  // - Functions
  function getLinkClass(path) {
    let linkClass = style.link;
    if (path === asPath) linkClass += ` ${style.linkActive}`;
    return linkClass;
  }

  function onScrollClick(direction) {
    if (direction === 'left') {
      scrollAreaRef.current?.scrollBy({ left: -120, behavior: 'smooth' });
    } else if (direction === 'right') {
      scrollAreaRef.current?.scrollBy({ left: 120, behavior: 'smooth' });
    }
  }

  function onScroll(event) {
    const { scrollLeft, scrollLeftMax } = event.target;
    setHasScrollLeft(scrollLeft > 0);
    setHasScrollRight(scrollLeft < scrollLeftMax);
  }

  const onResize = useCallback(() => {
    if (!scrollAreaRef.current) return;
    const { scrollLeft, scrollLeftMax } = scrollAreaRef.current;
    setHasScrollLeft(scrollLeft > 0);
    setHasScrollRight(scrollLeft < scrollLeftMax);
  }, []);

  // - Effects
  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  // - Checking
  if (topicArray.length === 0) return null;

  // - Attributes
  let scrollLeftClass = style.scrollLeft;
  if (!hasScrollLeft) scrollLeftClass += ' is-hidden';

  let scrollRightClass = style.scrollRight;
  if (!hasScrollRight) scrollRightClass += ' is-hidden';

  // - Elements
  const topicElements = topicArray.map(topic => {
    const { uid, slug, title } = topic;
    return (
      <Link key={uid} href={`/topics/${slug}`}>
        <a className={getLinkClass(`/topics/${slug}`)}>
          <span>{title}</span>
        </a>
      </Link>
    );
  });

  return (
    <nav className="is-flex">
      <div className={`${style.item} pl-2`}>
        <Link href="/">
          <a className={getLinkClass('/')}>
            <span>Editorial</span>
          </a>
        </Link>
      </div>
      <div className={`${style.item}`}>
        <div className={style.divider} />
      </div>
      <div className={`${style.itemExpand} ${style.scrollCover}`}>
        <div className={style.scrollArea} ref={scrollAreaRef} onScroll={onScroll}>
          <div className={style.scrollContent}>{topicElements}</div>
        </div>
        <div className={scrollLeftClass} onClick={_ => onScrollClick('left')}>
          <span className="icon has-text-grey">{/* <ChevronLeft width={22} strokeWidth={2.5} /> */}</span>
        </div>
        <div className={scrollRightClass} onClick={_ => onScrollClick('right')}>
          <span className="icon has-text-grey">{/* <ChevronRight width={22} strokeWidth={2.5} /> */}</span>
        </div>
      </div>
      <div className={`${style.item}`}>
        <div className={style.divider} />
      </div>
      <div className={`${style.item} pr-2`}>
        <Link href="/topics">
          <a className={getLinkClass('/topics')}>
            <span>View all</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

AppHeaderTopics.propTypes = {
  topicArray: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

AppHeaderTopics.defaultProps = {
  topicArray: [],
};

export default AppHeaderTopics;
