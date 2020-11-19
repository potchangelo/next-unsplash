import style from './css/app_loading.module.scss';
import { Loader } from 'react-feather';

function AppLoading(props) {
    const { isShow = true, isSpinning = false } = props;

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

export default AppLoading;