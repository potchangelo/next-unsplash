import style from './css/navbar.module.scss';
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, Search } from 'react-feather';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';
import { useDropdown } from '../helpers/hooks';

function Navbar(props) {
    // - Data
    const { topicArray = [] } = props;
    const [hasScrollLeft, setHasScrollLeft] = useState(false);
    const [hasScrollRight, setHasScrollRight] = useState(false);
    const scrollAreaRef = useRef(null);
    const { dropdownActive, toggleDropdown } = useDropdown();

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

    // - Attributes
    let scrollLeftClass = style.scroll_left;
    if (!hasScrollLeft) scrollLeftClass += ' is-hidden';

    let scrollRightClass = style.scroll_right;
    if (!hasScrollRight) scrollRightClass += ' is-hidden';

    // - Elements
    const topicElements = topicArray.map(topic => {
        const { uid, title } = topic;
        return (
            <Link key={uid} href={`/topics/:uid`} as={`/topics/${title}`}>
                <a className={style.link}>
                    <span>{title}</span>
                </a>
            </Link>
        )
    });

    return (
        <header className={style.main}>
            <nav className="is-flex">
                <div className={style.item}>
                    <Link href="/">
                        <a className={style.brand}>
                            <img className={style.brand_logo} src="/logo-light-64x64.png" alt="Logo" />
                            <div className={style.brand_text}>
                                <h1 className="title is-6 has-text-weight-bold mb-0">Unsplash-cloned</h1>
                                <h3 className="title is-7 has-text-weight-medium">by Zinglecode</h3>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={style.item_expand}>
                    <div className={style.search_outer}>
                        <div className={`field ${style.search_inner}`}>
                            <div className="control has-icons-left">
                                <input className="input is-rounded" type="text" placeholder="Search photos (coming soon...)" />
                                <span className="icon is-left">
                                    <Search size={18} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.item} pr-2 is-hidden-mobile`}>
                    <Link href="/about">
                        <a className={style.link}>
                            <span>About</span>
                        </a>
                    </Link>
                    <a className={style.link} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                        <span>Github</span>
                    </a>
                </div>
                <div className={`${style.item} is-hidden-tablet`}>
                    <div className={` ${style.link}`} onClick={toggleDropdown}>
                        <Dropdown active={dropdownActive}>
                            <span className="icon">
                                <Menu size={22} />
                            </span>
                            <DropdownMenu>
                                <DropdownItem 
                                    type="next-link"
                                    href="/about"
                                    linkClass="has-text-white has-text-weight-medium">
                                    <span>About</span>
                                </DropdownItem>
                                <DropdownItem 
                                    type="ext-link"
                                    href="https://github.com/potchangelo/next-unsplash"
                                    linkClass="has-text-white has-text-weight-medium">
                                    <span>Github</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
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
        </header>
    );
}

export default Navbar;