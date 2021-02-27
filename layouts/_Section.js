import PropTypes from 'prop-types';
import style from './css/section.module.scss';

function Section(props) {
    // - Props
    const { type, children } = props;

    // - attributes
    let sectionClass = '';
    if (type === 'top') sectionClass = style.top;
    else if (type === 'photos') sectionClass = style.photos;
    else sectionClass = style.general;

    return (
        <section className={sectionClass}>
            <div className={style.wrapper}>
                {children}
            </div>
        </section>
    );
}

Section.propTypes = {
    type: PropTypes.string
};

export default Section;