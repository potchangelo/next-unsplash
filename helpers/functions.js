function superStopPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

export { superStopPropagation };