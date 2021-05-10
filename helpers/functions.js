function superStopPropagation(event) {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
}

function onSearchSubmit(event, router, q) {
    event.preventDefault();
    router.push(`/search/photos/${q}`);
}

export { superStopPropagation, onSearchSubmit };