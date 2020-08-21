import style from './css/photo_download.module.scss';
import { ChevronDown } from 'react-feather';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';
import { useDropdown } from '../helpers/hooks';

const menuContentArray = [
    { title: 'small', width: 640 },
    { title: 'medium', width: 1080 },
    { title: 'large', width: 1920 },
    { title: 'separator' },
    { title: 'original', width: 3150 },
];

function PhotoDownloadButton({ photo, buttonStyle, text = 'Download' }) {
    // - Data
    const { dropdownActive, toggleDropdown } = useDropdown();

    if (!photo) return null;

    // - Attributes
    let buttonClass = 'button has-text-weight-bold mb-0';
    let buttonMoreClass = 'button mb-0';
    let caretOffsetRight = 8;
    if (buttonStyle === 'focus') {
        buttonClass += ' is-success';
        buttonMoreClass += ` is-success ${style.more_focus}`;
        caretOffsetRight = 12;
    }
    else {
        buttonClass += ' is-small';
        buttonMoreClass += ` is-small`;
    }

    // - Elements
    const dropdownItems = menuContentArray.map((menu, index) => {
        const { title, width } = menu;
        const key = `${title}-${index}`;

        if (title === 'separator') {
            return <DropdownItem key={key} type="line" />;
        }

        let href = `/api/photos/${photo.uid}/download?force=true`;
        if (title !== 'original') href += `&w=${width}`;

        const height = width * photo.height / photo.width;
        const whLabel = `(${width} x ${height.toFixed(0)})`;

        return (
            <DropdownItem
                key={key} type="ext-link" href={href}
                linkClass="has-text-white has-text-weight-medium">
                <span>{title[0].toUpperCase() + title.slice(1)} </span>
                <span className="has-text-grey-light">{whLabel}</span>
            </DropdownItem>
        );
    });

    return (
        <Dropdown active={dropdownActive}>
            <div className="buttons has-addons mb-0">
                <a className={buttonClass} href={`/api/photos/${photo.uid}/download?force=true`} download>
                    {text}
                </a>
                <button
                    className={`${buttonMoreClass}`}
                    type="button"
                    onClick={toggleDropdown}>
                    <span className="icon">
                        <ChevronDown size={20} strokeWidth={3} />
                    </span>
                </button>
            </div>
            <DropdownMenu caretOffsetRight={caretOffsetRight}>
                {dropdownItems}
            </DropdownMenu>
        </Dropdown>
    );
}

export default PhotoDownloadButton;