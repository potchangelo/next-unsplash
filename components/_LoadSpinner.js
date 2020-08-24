import style from './css/load_spinner.module.scss';
import { Loader } from 'react-feather';

function LoadSpinner({ isShow = true, isSpinning = false }) {
    let iconClass = 'icon is-large';
    if (!isShow) iconClass += ' is-invisible';
    else if (isSpinning) iconClass += ` ${style.icon_spinning}`;
    return (
        <div className={`${style.main}`}>
            <span className={iconClass}>
                <Loader size={36} />
            </span>
        </div>
    );
}

export default LoadSpinner;