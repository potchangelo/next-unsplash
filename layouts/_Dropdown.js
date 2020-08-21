import style from './css/dropdown.module.scss';

function Dropdown({ active = false, align, children }) {
    // Attributes
    let dropdownClass = `${style.main} `;
    if (align === 'left') {
        dropdownClass += style.left;
    }
    else {
        dropdownClass += style.right;
    }
    if (active) dropdownClass += ` ${style.active}`;

    return <div className={dropdownClass}>{children}</div>;
}

export default Dropdown;