import { RefreshIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import style from './css/appLoading.module.scss';

function AppLoading(props) {
  const { isShow, isSpinning } = props;
  let iconClass = 'icon is-large';
  if (!isShow) iconClass += ' is-invisible';
  else if (isSpinning) iconClass += ` ${style.isSpinning}`;
  return (
    <div className={`${style.main}`}>
      <span className={iconClass}>
        <RefreshIcon width={32} height={32} />
      </span>
    </div>
  );
}

AppLoading.propTypes = {
  isShow: PropTypes.bool,
  isSpinning: PropTypes.bool,
};

AppLoading.defaultProps = {
  isShow: true,
  isSpinning: false,
};

export default AppLoading;
