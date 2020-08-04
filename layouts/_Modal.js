import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalContent from './_ModalContent';

function Modal({ children }) {
    // Create
    const portal = document.querySelector('#modal_portal');
    const container = document.createElement('div');
    container.classList.add('modal_container');

    // Add / Remove
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

    // Initialize
    useEffect(() => {
        addToPortal();
        return removeFromPortal;
    }, [addToPortal, removeFromPortal]);

    return ReactDOM.createPortal((
        <ModalContent>{children}</ModalContent>
    ), container);
}

export default Modal;