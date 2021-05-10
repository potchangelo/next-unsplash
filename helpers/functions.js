/**
 * Hard stop propagation
 * @param {(import("react").TouchEvent|import("react").MouseEvent)} event 
 */
function superStopPropagation(event) {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
}

/**
 * Search submit
 * @param {(import("react").TouchEvent|import("react").MouseEvent)} event 
 * @param {import("next/router").NextRouter} router 
 * @param {string} q 
 */
function onSearchSubmit(event, router, q) {
    event.preventDefault();
    router.push(`/search/photos/${q}`);
}

export { superStopPropagation, onSearchSubmit };