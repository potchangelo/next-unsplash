import style from './css/navbar.module.scss';
import Link from "next/link";
import { Search } from 'react-feather';

function Navbar() {
    return (
        <nav className={style.main}>
            <div className={style.item}>
                <Link href="/">
                    <a className={style.brand}>
                        <img src="/logo-light-64.png" width="44" height="44" alt="Logo" />
                        <div>
                            <h1 className="title is-5">Unsplash-cloned</h1>
                            <h3 className="subtitle is-7 has-text-weight-bold">by Zinglecode</h3>
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
                    <a className={style.link}>About</a>
                </Link>
                <a className={style.link} href="https://github.com/potchangelo/next-unsplash" target="_blank">Github</a>
            </div>
        </nav>
    );
}

export default Navbar;