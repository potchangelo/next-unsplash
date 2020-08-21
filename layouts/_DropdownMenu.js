import style from './css/dropdown.module.scss';
import { superStopPropagation } from '../helpers/functions';

function DropdownMenu({ caretOffsetLeft, caretOffsetRight, children }) {
    const caretStyle = {}
    if (!!caretOffsetLeft) {
        caretStyle.left = `${caretOffsetLeft}px`;
    }
    else if (!!caretOffsetRight) {
        caretStyle.right = `${caretOffsetRight}px`;
    }

    return (
        <div className={style.menu} onClick={superStopPropagation}>
            <div className={style.caret} style={caretStyle} />
            <div className={style.content}>
                {children}
            </div>
        </div>
    );
}

export default DropdownMenu;