import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './css/masonry.module.scss';

const defaultBreakpointArray = [
    { columns: 1, minWidth: 0, gap: 0 },
    { columns: 2, minWidth: 600, gap: 24 },
    { columns: 3, minWidth: 960, gap: 24 }
];

function Masonry(props) {
    // - Data
    const { breakpointArray, children } = props;
    const [columnHeightArray, setColumnHeightArray] = useState([]);
    const [computedStylesArray, setComputedStyleArray] = useState([]);
    const layoutRef = useRef(null);
    const layoutTimerRef = useRef(null);
    const layoutStatusRef = useRef('done'); // restart, update, done

    // - Functions
    function getNextBreakpoint(_breakpointArray) {
        let breakpoint = defaultBreakpointArray[0];

        // Get width
        if (typeof window === 'undefined') return breakpoint;
        const docWidth = window.innerWidth;

        // Get columns
        _breakpointArray.forEach(_breakpoint => {
            if (docWidth < _breakpoint.minWidth) return;
            breakpoint = _breakpoint;
        });
        return breakpoint;
    }

    const setLayout = useCallback((_breakpointArray, delay = 300) => {
        clearTimeout(layoutTimerRef.current);
        if (layoutStatusRef.current === 'done') return;

        layoutTimerRef.current = setTimeout(() => {
            const { columns } = getNextBreakpoint(_breakpointArray);

            // Init heights array
            let nextColumnHeightArray = new Array(columns).fill().map(_ => 0);

            // Get masonry child nodes from its ref
            const { childNodes } = layoutRef.current;

            // Build masonry items data
            const nextComputedStylesArray = Array.from(childNodes).map(child => {
                // Left
                let left = 0;
                const minHeightIndex = nextColumnHeightArray.indexOf(Math.min(...nextColumnHeightArray));
                left = minHeightIndex / nextColumnHeightArray.length * 100;

                // Top
                let top = 0;
                const minHeight = Math.min(...nextColumnHeightArray);
                top = minHeight;

                // Add height to selected column
                nextColumnHeightArray[minHeightIndex] += child.getBoundingClientRect().height;

                return { left: `${left}%`, top: `${top}px` };
            });

            if (layoutStatusRef.current === 'restart') layoutStatusRef.current = 'update';
            else if (layoutStatusRef.current === 'update') layoutStatusRef.current = 'done';

            setColumnHeightArray(nextColumnHeightArray);
            setComputedStyleArray(prevComputedStylesArray => {
                return nextComputedStylesArray.map((computedStyles, index) => {
                    const styles = Object.assign({}, computedStyles);
                    if (index >= prevComputedStylesArray.length) styles.opacity = 0;
                    return styles;
                });
            });
        }, delay);
    }, []);

    const restartLayout = useCallback((delay = 300) => {
        if (layoutStatusRef.current !== 'update') {
            layoutStatusRef.current = 'restart';
            setLayout(breakpointArray, delay);
        }
    }, [breakpointArray, setLayout]);

    const updateLayout = useCallback((delay = 0) => {
        if (layoutStatusRef.current === 'update') {
            setLayout(breakpointArray, delay);
        }
    }, [breakpointArray, setLayout]);

    const onResize = useCallback(() => restartLayout(), [restartLayout]);

    // - Effects
    // 1. Browser resized -> restart
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [onResize]);

    // 2. Data changed -> restart
    useEffect(() => {
        if (children === null) restartLayout(0);
        else restartLayout();
    }, [breakpointArray, children, restartLayout]);

    // 3. Style changed -> update
    useEffect(() => {
        updateLayout();
    }, [columnHeightArray, computedStylesArray, updateLayout]);

    // - Attributes
    const columnCount = columnHeightArray.length;
    const itemWidth = 100 / (columnCount || 1);
    const { gap } = (columnCount === 0) ? 0 : getNextBreakpoint(breakpointArray);
    const layoutHeight = (columnCount === 0) ? 0 : Math.max(...columnHeightArray);
    const layoutStyles = {
        height: `${layoutHeight}px`,
        marginTop: `-${gap / 2}px`,
        marginLeft: `-${gap / 2}px`,
        marginRight: `-${gap / 2}px`
    };

    // - Elements
    let childElements = null;
    if (!!children) {
        childElements = React.Children.map(children, (child, index) => {
            if (index < computedStylesArray.length) {
                const computedStyles = computedStylesArray[index];
                const itemStyles = {
                    width: `${itemWidth}%`,
                    padding: `${gap / 2}px`,
                    ...computedStyles
                };
                return React.cloneElement(child, {
                    key: `masonry_item_${index}`,
                    itemStyles
                });
            }
            return React.cloneElement(child, {
                key: `masonry_item_${index}`,
                isLoading: true
            });
        });
    }

    return (
        <div className="masonry_container">
            <div className={style.layout} ref={layoutRef} style={layoutStyles}>
                {childElements}
            </div>
        </div>
    );
}

Masonry.propTypes = {
    breakpointArray: PropTypes.arrayOf(PropTypes.shape({
        columns: PropTypes.number.isRequired,
        minWidth: PropTypes.number.isRequired,
        gap: PropTypes.number.isRequired
    }))
};

Masonry.defaultProps = {
    breakpointArray: defaultBreakpointArray
};

export default Masonry;