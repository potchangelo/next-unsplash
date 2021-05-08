import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image } from 'react-feather';
import style from './css/appHeader.module.scss';

function AppHeaderSearchTypes() {
    // - Data
    const { asPath, query } = useRouter();
    const { q } = query;

    // - Functions
    function getLinkClass(path) {
        let linkClass = style.link;
        if (asPath.includes(path)) linkClass += ` ${style.linkActive}`;
        return linkClass;
    }

    return (
        <nav className="is-flex">
            <div className={`${style.item} pl-2`}>
                <Link href={`/search/photos/${q}`}>
                    <a className={getLinkClass(`/search/photos`)}>
                        <span className={`icon ${style.linkIcon}`}>
                            <Image width={18} height={18} />
                        </span>
                        <span>Photos</span>
                    </a>
                </Link>
            </div>
        </nav>
    );
}

export default AppHeaderSearchTypes;