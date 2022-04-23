import React, { useCallback, useEffect, useState } from 'react';
import { MasonryItem } from '.';
import style from './css/masonry.module.scss';

/**
 * @typedef {object} breakpoint
 * @property {number} columns
 * @property {number} minWidth
 * @property {number} [gap]
 * @property {number|number[]} [outerGap]
 */

const defaultBreakpoints = [
  { columns: 1, minWidth: 0, gap: 0 },
  { columns: 2, minWidth: 480, gap: 24 },
  { columns: 3, minWidth: 960, gap: 24 },
];

/**
 * Masonry layout by grid, might have scroll restoration
 * @param {object} props
 * @param {breakpoint[]} [props.breakpoints]
 * @param {import('react').ReactElement|import('react').ReactElement[]} [props.children]
 */
function _Masonry(props) {
  // - Data
  const { breakpoints = defaultBreakpoints, children } = props;

  const getNextBreakpoint = useCallback(() => {
    let nextBreakpoint = breakpoints[0];

    // Get width
    if (typeof window === 'undefined') return nextBreakpoint;
    const docWidth = window.innerWidth;

    // Get columns
    breakpoints.forEach(breakpoint => {
      if (docWidth < breakpoint.minWidth) return;
      nextBreakpoint = breakpoint;
    });
    return nextBreakpoint;
  }, [breakpoints]);

  const [breakpoint, setBreakpoint] = useState(getNextBreakpoint());

  const onResize = useCallback(() => {
    const nextBreakpoint = getNextBreakpoint();
    if (breakpoint.minWidth !== nextBreakpoint.minWidth) {
      setBreakpoint(nextBreakpoint);
    }
  }, [breakpoint, getNextBreakpoint]);

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // - Attributes
  const { columns, gap = 0, outerGap = 0 } = breakpoint;
  const containerStyle = {
    padding: Array.isArray(outerGap) ? outerGap.map(g => `${g}px`).join(' ') : `${outerGap}px`,
  };
  const layoutStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    columnGap: `${gap}px`,
  };
  const itemStyle = {
    marginBottom: `${gap}px`,
  };

  // - Elements
  const childrenIsItem = children?.type === MasonryItem;
  const childrenAreItems = Array.isArray(children) && children.every(child => child.type === MasonryItem);
  const columnsChildren = new Array(columns).fill().map(_ => []);
  const columnsHeights = new Array(columns).fill().map(_ => 0);
  if (childrenIsItem) {
    columnsChildren[0].push(children);
    columnsHeights[0] += children.props.height ?? 1;
  } else if (childrenAreItems) {
    children.forEach(child => {
      const minHeightIndex = columnsHeights.indexOf(Math.min(...columnsHeights));
      columnsChildren[minHeightIndex].push(child);
      columnsHeights[minHeightIndex] += child.props.height ?? 1;
    });
  }

  let childElements = null;
  if (childrenIsItem || childrenAreItems) {
    childElements = columnsChildren.map((columnChildren, index) => {
      const columnElements = columnChildren.map(child => {
        return React.cloneElement(child, {
          itemStyle,
        });
      });
      return (
        <div key={`col-${index}`} data-testid="masonry-column">
          {columnElements}
        </div>
      );
    });
  }

  return (
    <div style={containerStyle}>
      <div className={style.layout} style={layoutStyle}>
        {childElements}
      </div>
    </div>
  );
}

export default _Masonry;
