import { useState } from 'react';
import style from './css/photoPost.module.scss';

/**
 * @param {object} props
 * @param {import('jsdocs/typedefs').Photo} props.photo
 */
function PhotoPostFigure(props) {
  // - Data
  const { photo } = props;
  const [isZoomed, setIsZoomed] = useState(false);

  // - Extract
  if (!photo) return null;
  const { width, height, description, src } = photo;

  // - Attributes
  let figureClass = style.figure;
  let figureStyle = {
    maxWidth: `calc(calc(100vh - 200px) * ${width / height})`,
  };
  const paddingBottom = `${(height / width) * 100}%`;
  const srcset = `${src.small} 640w, ${src.medium} 1080w, ${src.large} 1920w`;
  let sizes = '(max-width: 640px) 640px, (max-width: 1080px) 1080px, 100vw';
  ('100vw');
  if (isZoomed) {
    figureClass += ` ${style.figureZoomed}`;
    figureStyle = {};
    sizes = '100vw';
  }

  // - Elements
  const zoomSvg = isZoomed ? <div>minimize</div> : <div>maximize</div>;

  return (
    <div className={style.figureCover}>
      <figure className={figureClass} style={figureStyle}>
        <div style={{ paddingBottom }} />
        <img sizes={sizes} srcSet={srcset} src={src.medium} alt={description} />
        <div className={style.figureZoomArea} onClick={_ => setIsZoomed(prev => !prev)}>
          <span className={`icon has-text-white ${style.figureZoomIcon}`}>{zoomSvg}</span>
        </div>
      </figure>
    </div>
  );
}

export default PhotoPostFigure;
