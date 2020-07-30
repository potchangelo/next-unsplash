import style from './css/modal_inner.module.scss';
import { useRouter } from 'next/router';

function ModalInner({ children }) {
    const router = useRouter();
    return (
        <>
            <div className={style.back} onClick={_ => router.back()} />
            <div className={style.front}>{children}</div>
        </>
    );
}

export default ModalInner;