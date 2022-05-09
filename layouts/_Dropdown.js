import style from './css/dropdown.module.scss';

/**
 * @param {object} props
 * @param {boolean} props.isActive
 * @param {string} [props.align]
 */
function Dropdown(props) {
  const { isActive, align, children } = props;

  let dropdownClass = `${style.main} `;
  if (align === 'left') dropdownClass += style.left;
  else dropdownClass += style.right;
  if (isActive) dropdownClass += ` ${style.active}`;

  return <div className={dropdownClass}>{children}</div>;
}

export default Dropdown;
