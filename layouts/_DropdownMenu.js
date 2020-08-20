import style from './css/dropdown.module.scss';

function DropdownMenu({ children }) {
    function superStopPropagation(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        <div className={`dropdown-menu ${style.dropdown_menu}`} onClick={superStopPropagation}>
            <div className={style.dropdown_caret} />
            <div className={`dropdown-content ${style.dropdown_content}`}>
                {children}
            </div>
        </div>
    );
}

export default DropdownMenu;