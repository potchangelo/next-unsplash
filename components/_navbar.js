import style from './css/navbar.module.scss';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Search, Menu } from 'react-feather';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';

function Navbar() {
    // Data
    const [dropdownActive, setDropdownActive] = useState(false);

    // Functions
    function superStopPropagation(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    function toggleDropdown(e) {
        superStopPropagation(e);
        setDropdownActive(prev => !prev);
    }

    function onClickDocument() {
        setDropdownActive(false);
    }

    // Effects
    useEffect(() => {
        if (dropdownActive) {
            document.addEventListener('click', onClickDocument);
        }
        else {
            document.removeEventListener('click', onClickDocument);
        }
        return () => {
            document.removeEventListener('click', onClickDocument);
        }
    }, [dropdownActive]);

    return (
        <nav className={style.main}>
            <div className={style.item}>
                <Link href="/">
                    <a className={style.brand}>
                        <img className={style.brand_logo} src="/logo-light-64.png" alt="Logo" />
                        <div className={style.brand_text}>
                            <h1 className="title is-6 has-text-weight-bold mb-1">Unsplash-cloned</h1>
                            <h3 className="title is-7 has-text-weight-semibold">by Zinglecode</h3>
                        </div>
                    </a>
                </Link>
            </div>
            <div className={style.item_expand}>
                <div className={style.search_outer}>
                    <div className={`field ${style.search_inner}`}>
                        <div className="control has-icons-left">
                            <input className="input" type="text" placeholder="Search photos (coming soon...)" />
                            <span className="icon is-left">
                                <Search size={18} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.item}>
                <Link href="/about">
                    <a className={`is-hidden-mobile ${style.link}`}>
                        <span>About</span>
                    </a>
                </Link>
                <a className={`is-hidden-mobile ${style.link}`} href="https://github.com/potchangelo/next-unsplash" target="_blank">
                    <span>Github</span>
                </a>
                <div className={`is-hidden-tablet ${style.link}`} onClick={toggleDropdown}>
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
    );
}

export default Navbar;