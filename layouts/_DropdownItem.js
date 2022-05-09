import Link from 'next/link';
import style from './css/dropdown.module.scss';

/**
 * @param {object} props
 * @param {string} [props.type]
 * @param {string} [props.href]
 * @param {string} [props.linkClass]
 * @param {string} [props.align]
 */
function DropdownItem(props) {
  // - Data
  const { type, href = '', linkClass = '', align, children } = props;

  // - Attributes
  let itemClass = `${style.item} `;
  if (align === 'left') itemClass += 'has-text-left';
  else if (align === 'center') itemClass += 'has-text-centered';
  else itemClass += 'has-text-right';

  // - Elements
  let element = <hr className={style.line} />;
  if (type === 'next-link') {
    element = (
      <div className={itemClass}>
        <Link href={href}>
          <a className={linkClass}>{children}</a>
        </Link>
      </div>
    );
  } else if (type === 'ext-link') {
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
