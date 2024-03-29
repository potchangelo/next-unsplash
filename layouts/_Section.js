import style from './css/section.module.scss';

/**
 * @param {object} props
 * @param {string} [props.type]
 */
function Section(props) {
  const { type, children } = props;

  let sectionClass = '';
  if (type === 'top') sectionClass = style.top;
  else if (type === 'photos') sectionClass = style.photos;
  else sectionClass = style.general;

  return (
    <section className={sectionClass}>
      <div className={style.wrapper}>{children}</div>
    </section>
  );
}

export default Section;
