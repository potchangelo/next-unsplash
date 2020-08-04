import style from './css/masonry.module.scss';

function MasonryItem({ isLoading, itemStyles, children }) {
    let itemClass = style.item;
    if (isLoading === true) {
        itemClass += ` ${style.item_loading}`;
    }
    return (
        <div className={itemClass} style={itemStyles}>
            <div className="masonry_item_content">
                {children}
            </div>
        </div>
    );
}

export default MasonryItem;