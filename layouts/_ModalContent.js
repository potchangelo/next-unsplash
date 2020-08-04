import style from './css/modal.module.scss';
import { useRouter } from 'next/router';

function ModalContent({ children }) {
    const router = useRouter();
    return (
        <div className={style.content} onClick={_ => router.back()}>
            {children}
        </div>
    );
}

export default ModalContent;