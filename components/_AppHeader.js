import Link from 'next/link';
import { Menu, Search } from 'react-feather';
import PropTypes from 'prop-types';
import style from './css/appHeader.module.scss';
import AppHeaderSearchTypes from './_AppHeaderSearchTypes';
import AppHeaderTopics from './_AppHeaderTopics';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';
import { useDropdown } from '../helpers/hooks';
import { useState } from 'react';
import { useRouter } from 'next/router';

const searchPathRE = /^\/search\/\w+\/\[q\]/;

function AppHeader(props) {
    const { topicArray } = props;

    const router = useRouter();
    const { pathname, query } = router;

    const qInitial = query?.q ?? '';
    const [q, setQ] = useState(qInitial);
    const { dropdownActive, toggleDropdown } = useDropdown();

    function onSearchSubmit(event) {
        event.preventDefault();
        router.push(`/search/photos/${q}`);
    }

    let searchTypesElement = null;
    if (searchPathRE.test(pathname)) {
        searchTypesElement = <AppHeaderSearchTypes />;
    }

    return (
        <header className={style.main}>
            <nav className="is-flex">
                <div className={style.item}>
                    <Link href="/">
                        <a className={style.brand}>
                            <img className={style.brandLogo} src="/logo-light-64x64.png" alt="Logo" />
                            <div className={style.brandText}>
                                <h1 className="title is-6 has-text-weight-bold mb-0">Unsplash-cloned</h1>
                                <h3 className="title is-7 has-text-weight-medium">by Zinglecode</h3>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={style.itemExpand}>
                    <div className={style.searchOuter}>
                        <div className={`field ${style.searchInner}`}>
                            <form action="#" onSubmit={onSearchSubmit}>
                                <div className="control has-icons-left">
                                    <input 
                                        className="input is-rounded" 
                                        type="search" 
                                        placeholder="Search photos (coming soon...)" 
                                        value={q}
                                        onChange={event => setQ(event.target.value)}
                                    />
                                    <span className="icon is-left">
                                        <Search size={18} />
                                    </span>
                                </div>
                            </form>
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
            {searchTypesElement}
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