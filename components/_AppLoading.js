import PropTypes from 'prop-types';
import { Loader } from 'react-feather';
import style from './css/app_loading.module.scss';

function AppLoading(props) {
    const { isShow, isSpinning } = props;

    let iconClass = 'icon is-large';
    if (!isShow) iconClass += ' is-invisible';
    else if (isSpinning) iconClass += ` ${style.is_spinning}`;

    return (
        <div className={`${style.main}`}>
            <span className={iconClass}>
                <Loader size={36} />
            </span>
        </div>
    );
}

AppLoading.propTypes = {
    isShow: PropTypes.bool,
    isSpinning: PropTypes.bool
};

AppLoading.defaultProps = {
    isShow: true,
    isSpinning: false
};

export default AppLoading;