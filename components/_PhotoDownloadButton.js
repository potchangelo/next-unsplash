import style from './css/photo_post.module.scss';
import { ChevronDown } from 'react-feather';
import { useState, useEffect } from 'react';

const menuContentArray = [
    { title: 'small', width: 640 },
    { title: 'medium', width: 1080 },
    { title: 'large', width: 1920 },
    { title: 'separator' },
    { title: 'original', width: 3150 },
];

function PhotoDownloadButton({ photo }) {
    // Data
    const [active, setActive] = useState(false);

    function superStopPropagation(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    function onClickDocument() {
        setActive(false);
    };

    function toggleDropdown(e) {
        superStopPropagation(e);
        setActive(prev => !prev);
    }

    useEffect(() => {
        if (active) {
            document.addEventListener('click', onClickDocument);
        }
        else {
            document.removeEventListener('click', onClickDocument);
        }
        return () => {
            document.removeEventListener('click', onClickDocument);
        }
    }, [active]);

    if (!photo) return null;

    // Attributes
    let dropdownClass = 'dropdown is-right';
    if (active) dropdownClass += ` ${style.dropdown_active}`;

    // Elements
    const dropdownItems = menuContentArray.map(menu => {
        const { title, width } = menu;
        if (title === 'separator') {
            return (
                <hr key={title} className={style.dropdown_line} />
            );
        }

        let href = `/api/photos/${photo.uid}/download?force=true`;
        if (title !== 'original') {
            href += `&w=${width}`;
        }

        const height = width * photo.height / photo.width;
        const whLabel = `(${width} x ${height.toFixed(0)})`;

        return (
            <div key={title} className="dropdown-item has-text-right">
                <a className="has-text-white has-text-weight-medium" href={href}>
                    <span>{title[0].toUpperCase() + title.slice(1)} </span>
                    <span className="has-text-grey-light">{whLabel}</span>
                </a>
            </div>
        );
    });

    return (
        <div className={dropdownClass}>
            <div className="buttons has-addons mb-0">
                <a className="button is-success has-text-weight-bold mb-0" href={`/api/photos/${photo.uid}/download?force=true`} download>
                    Download free
                </a>
                <button
                    className={`button is-success mb-0 ${style.dl_more}`}
                    type="button"
                    onClick={toggleDropdown}>
                    <span className="icon">
                        <ChevronDown size={20} strokeWidth={3} />
                    </span>
                </button>
            </div>
            <div
                className={`dropdown-menu ${style.dropdown_menu}`}
                onClick={superStopPropagation}>
                <div className={style.dropdown_caret} />
                <div className={`dropdown-content ${style.dropdown_content}`}>
                    {dropdownItems}
                </div>
            </div>
        </div>
    )
}

export default PhotoDownloadButton;