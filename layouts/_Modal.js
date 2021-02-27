import { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './css/modal.module.scss';

function Modal({ children }) {
    // - Create
    const portal = document.querySelector('#modal_portal');
    const [container] = useState(() => {
        const div = document.createElement('div');
        div.classList.add('modal_container');
        return div;
    });

    // - Add / Remove
    const addToPortal = useCallback(() => {
        if (!portal) return;
        if (portal.contains(container)) return;
        portal.appendChild(container);
        portal.classList.add('appeared');
        document.documentElement.classList.add('disable_scroll');
    }, [portal, container]);

    const removeFromPortal = useCallback(() => {
        if (!portal) return;
        portal.removeChild(container);
        portal.classList.remove('appeared');
        document.documentElement.classList.remove('disable_scroll');
    }, [portal, container]);

    // - Initialize
    useEffect(() => {
        addToPortal();
        return removeFromPortal;
    }, [addToPortal, removeFromPortal]);

    return ReactDOM.createPortal((
        <div className={style.content}>
            {children}
        </div>
    ), container);
}

export default Modal;