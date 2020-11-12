import style from './css/modal.module.scss';

function ModalContent({ children }) {
    return (
        <div className={style.content}>
            {children}
        </div>
    );
}

export default ModalContent;