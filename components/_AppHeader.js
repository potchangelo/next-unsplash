import Link from 'next/link';
import { Menu, Search } from 'react-feather';
import PropTypes from 'prop-types';
import style from './css/app_header.module.scss';
import AppHeaderTopics from './_AppHeaderTopics';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';
import { useDropdown } from '../helpers/hooks';

function AppHeader(props) {
    const { topicArray } = props;
    const { dropdownActive, toggleDropdown } = useDropdown();

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
            <AppHeaderTopics topicArray={topicArray} />
        </header>
    );
}

AppHeader.propTypes = {
    topicArray: PropTypes.arrayOf(PropTypes.object)
};

AppHeader.defaultProps = {
    topicArray: []
};

export default AppHeader;