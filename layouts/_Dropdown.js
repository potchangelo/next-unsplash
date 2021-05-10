import PropTypes from 'prop-types';
import style from './css/dropdown.module.scss';

function Dropdown(props) {
    const { isActive, align, children } = props;

    let dropdownClass = `${style.main} `;
    if (align === 'left') dropdownClass += style.left;
    else dropdownClass += style.right;
    if (isActive) dropdownClass += ` ${style.active}`;

    return <div className={dropdownClass}>{children}</div>;
}

Dropdown.propTypes = {
    isActive: PropTypes.bool.isRequired,
    align: PropTypes.string
};

export default Dropdown;