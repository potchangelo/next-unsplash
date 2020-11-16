import style from './css/navbar.module.scss';
import Link from "next/link";
import { Search, Menu } from 'react-feather';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';
import { useDropdown } from '../helpers/hooks';

function Navbar(props) {
    // - Data
    const { topicArray = [] } = props;
    const { dropdownActive, toggleDropdown } = useDropdown();

    function onScroll(event) {
        const { scrollLeft, scrollLeftMax } = event.target;
        if (scrollLeft === 0) console.log('start');
        if (scrollLeft === scrollLeftMax) console.log('end');
    }

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
                    <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                        <span>Editorial</span>
                    </a>
                </div>
                <div className={`${style.item_expand} ${style.scroll_cover}`}>
                    <div className={style.scroll_area} onScroll={onScroll}>
                        <div className={style.scroll_content}>
                            <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                                <span>Food and Drink</span>
                            </a>
                            <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                                <span>Editorial 2</span>
                            </a>
                            <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                                <span>Travel</span>
                            </a>
                            <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                                <span>Editorial 4</span>
                            </a>
                            <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                                <span>Animal</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${style.item} pr-2`}>
                    <a className={`${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                        <span>View All</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;