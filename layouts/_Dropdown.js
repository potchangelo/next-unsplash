import style from './css/dropdown.module.scss';

function Dropdown({ active = false, align, children }) {
    // Attributes
    let dropdownClass = 'dropdown ';
    if (align === 'left') {
        dropdownClass += 'is-left';
    }
    else {
        dropdownClass += 'is-right';
    }
    if (active) dropdownClass += ` ${style.dropdown_active}`;

    return <div className={dropdownClass}>{children}</div>;
}

export default Dropdown;