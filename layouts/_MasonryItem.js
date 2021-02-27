import PropTypes from 'prop-types';
import style from './css/masonry.module.scss';

function MasonryItem(props) {
    // - Props
    const { isLoading, itemStyles, children } = props;

    // - Attributes
    let itemClass = style.item;
    if (isLoading === true) itemClass += ` ${style.item_loading}`;

    return (
        <div className={itemClass} style={itemStyles}>
            <div className="masonry_item_content">
                {children}
            </div>
        </div>
    );
}

MasonryItem.propTypes = {
    isLoading: PropTypes.bool,
    itemStyles: PropTypes.object
};

MasonryItem.defaultProps = {
    isLoading: false,
    itemStyles: {}
};

export default MasonryItem;