import PropTypes from 'prop-types';
import style from './css/dropdown.module.scss';

function Dropdown(props) {
    // - Props
    const { active, align, children } = props;

    // - Attributes
    let dropdownClass = `${style.main} `;
    if (align === 'left') dropdownClass += style.left;
    else dropdownClass += style.right;
    if (active) dropdownClass += ` ${style.active}`;

    return <div className={dropdownClass}>{children}</div>;
}

Dropdown.propTypes = {
    active: PropTypes.bool.isRequired,
    align: PropTypes.string
};

export default Dropdown;