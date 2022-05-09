import { superStopPropagation } from 'z/helpers/functions';
import style from './css/dropdown.module.scss';

/**
 * @param {object} props
 * @param {number} [props.caretOffsetLeft]
 * @param {number} [props.caretOffsetRight]
 */
function DropdownMenu(props) {
  const { caretOffsetLeft, caretOffsetRight, children } = props;

  const caretStyle = {};
  if (!!caretOffsetLeft) {
    caretStyle.left = `${caretOffsetLeft}px`;
  } else if (!!caretOffsetRight) {
    caretStyle.right = `${caretOffsetRight}px`;
  }

  return (
    <div className={style.menu} onClick={superStopPropagation}>
      <div className={style.caret} style={caretStyle} />
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default DropdownMenu;
