import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalInner from './_ModalInner';

function Modal(props) {
    const { children } = props;
    
    const portal = document.querySelector('#modal-portal');
    const container = document.createElement('div');
    container.classList.add('modal-container');

    const addToPortal = useCallback(() => {
        if (!portal) return;
        if (portal.contains(container)) return;
        portal.appendChild(container);
        portal.classList.add('appeared');
        document.documentElement.classList.add('disable-scroll');
    }, [portal, container]);

    const removeFromPortal = useCallback(() => {
        if (!portal) return;
        portal.removeChild(container);
        portal.classList.remove('appeared');
        document.documentElement.classList.remove('disable-scroll');
    }, [portal, container]);

    useEffect(() => {
        addToPortal();
        return removeFromPortal;
    }, [addToPortal, removeFromPortal]);

    return ReactDOM.createPortal((
        <ModalInner>{children}</ModalInner>
    ), container);
}

export default Modal;