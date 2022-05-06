import { RefreshIcon } from '@heroicons/react/solid';
import style from './css/appLoading.module.scss';

/**
 * @param {object} props
 * @param {boolean} [props.isShow]
 * @param {boolean} [props.isSpinning]
 */
function AppLoading(props) {
  const { isShow = true, isSpinning = false } = props;
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

export default AppLoading;
