import style from './css/modal_content.module.scss';
import { useRouter } from 'next/router';

function ModalContent({ children }) {
    const router = useRouter();
    return (
        <div className={style.main} onClick={_ => router.back()}>
            {children}
        </div>
    );
}

export default ModalContent;