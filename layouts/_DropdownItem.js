import style from './css/dropdown.module.scss';
import Link from "next/link";

function DropdownItem({ type, href, linkClass, align, children }) {
    // Attributes
    let itemClass = `${style.item} `;
    if (align === 'left') {
        itemClass += 'has-text-left';
    }
    else if (align === 'center') {
        itemClass += 'has-text-centered';
    }
    else {
        itemClass += 'has-text-right';
    }

    // Element
    let element = <hr className={style.line} />
    if (type === 'next-link') {
        element = (
            <div className={itemClass}>
                <Link href={href}>
                    <a className={linkClass}>
                        {children}
                    </a>
                </Link>
            </div>
        );
    }
    else if (type === 'ext-link') {
        element = (
            <div className={itemClass}>
                <a className={linkClass} href={href}>
                    {children}
                </a>
            </div>
        );
    }

    return element;
}

export default DropdownItem;