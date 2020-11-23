import style from './css/app_header.module.scss';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

function AppHeaderTopic(props) {
    const { topicArray = [] } = props;
    const [hasScrollLeft, setHasScrollLeft] = useState(false);
    const [hasScrollRight, setHasScrollRight] = useState(false);
    const scrollAreaRef = useRef(null);

    // - Functions
    function onScrollClick(direction) {
        if (direction === 'left') {
            scrollAreaRef.current?.scrollBy({ left: -120, behavior: 'smooth' });
        }
        else if (direction === 'right') {
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
    let scrollLeftClass = style.scroll_left;
    if (!hasScrollLeft) scrollLeftClass += ' is-hidden';

    let scrollRightClass = style.scroll_right;
    if (!hasScrollRight) scrollRightClass += ' is-hidden';

    // - Elements
    const topicElements = topicArray.map(topic => {
        const { uid, slug, title } = topic;
        return (
            <Link key={uid} href={`/topics/:slug`} as={`/topics/${slug}`}>
                <a className={style.link}>
                    <span>{title}</span>
                </a>
            </Link>
        )
    });

    return (
        <nav className="is-flex">
            <div className={`${style.item} pl-2`}>
                <Link href="/">
                    <a className={style.link}>
                        <span>Editorial</span>
                    </a>
                </Link>
            </div>
            <div className={`${style.item}`}>
                <div className={style.divider} />
            </div>
            <div className={`${style.item_expand} ${style.scroll_cover}`}>
                <div className={style.scroll_area} ref={scrollAreaRef} onScroll={onScroll}>
                    <div className={style.scroll_content}>
                        {topicElements}
                    </div>
                </div>
                <div className={scrollLeftClass} onClick={_ => onScrollClick('left')}>
                    <span className="icon has-text-grey">
                        <ChevronLeft width={22} strokeWidth={2.5} />
                    </span>
                </div>
                <div className={scrollRightClass} onClick={_ => onScrollClick('right')}>
                    <span className="icon has-text-grey">
                        <ChevronRight width={22} strokeWidth={2.5} />
                    </span>
                </div>
            </div>
            <div className={`${style.item}`}>
                <div className={style.divider} />
            </div>
            <div className={`${style.item} pr-2`}>
                <Link href="/topics">
                    <a className={style.link}>
                        <span>View all</span>
                    </a>
                </Link>
            </div>
        </nav>
    )
}

export default AppHeaderTopic;