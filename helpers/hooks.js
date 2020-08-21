import { useState, useEffect } from "react";

function useDropdown() {
    // Data
    const [active, setActive] = useState(false);

    // Functions
    function superStopPropagation(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    function toggleDropdown(e) {
        superStopPropagation(e);
        setActive(prev => !prev);
    }

    function onClickDocument() {
        setActive(false);
    }

    // Effects
    useEffect(() => {
        if (active) {
            document.addEventListener('click', onClickDocument);
        }
        else {
            document.removeEventListener('click', onClickDocument);
        }
        return () => {
            document.removeEventListener('click', onClickDocument);
        }
    }, [active]);

    return { dropdownActive: active, toggleDropdown };
}

export { useDropdown };