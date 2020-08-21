import style from './css/photo_post.module.scss';
import { ChevronDown } from 'react-feather';
import { useDropdown } from '../helpers/hooks';
import { Dropdown, DropdownMenu, DropdownItem } from '../layouts';

const menuContentArray = [
    { title: 'small', width: 640 },
    { title: 'medium', width: 1080 },
    { title: 'large', width: 1920 },
    { title: 'separator' },
    { title: 'original', width: 3150 },
];

function PhotoDownloadButton({ photo }) {
    // Data
    const { dropdownActive, toggleDropdown } = useDropdown();

    if (!photo) return null;

    // Elements
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
            <DropdownMenu caretOffsetRight={12}>
                {dropdownItems}
            </DropdownMenu>
        </Dropdown>
    )
}

export default PhotoDownloadButton;