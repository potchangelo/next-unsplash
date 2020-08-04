import style from './css/modal.module.scss';

function ModalGuard({ children }) {
    return (
        <div className={style.guard} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    );
}

export default ModalGuard;