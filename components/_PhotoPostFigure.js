import { useState } from 'react';
import { Minimize2, Maximize2 } from 'react-feather';
import PropTypes from 'prop-types';
import style from './css/photo_post.module.scss';

function PhotoPostFigure(props) {
    // - Data
    const { photo } = props;
    const [isZoomed, setIsZoomed] = useState(false);

    // - Extract
    if (!photo) return null;
    const { width, height, description, url } = photo;

    // - Attributes
    let figureClass = style.figure;
    let figureStyle = {
        maxWidth: `calc(calc(100vh - 200px) * ${width / height})`
    };
    const paddingBottom = `${height / width * 100}%`;
    const srcset = `${url.small} 640w, ${url.medium} 1080w, ${url.large} 1920w`;
    let sizes = '(max-width: 640px) 640px, (max-width: 1080px) 1080px, 100vw'; '100vw';
    if (isZoomed) {
        figureClass += ` ${style.figure_zoomed}`;
        figureStyle = {};
        sizes = '100vw';
    }

    // - Elements
    const zoomSvg = isZoomed ? <Minimize2 size={24} /> : <Maximize2 size={24} />;

    return (
        <div className={style.figure_cover}>
            <figure
                className={figureClass}
                style={figureStyle}
            >
                <div style={{ paddingBottom }} />
                <img
                    sizes={sizes}
                    srcSet={srcset}
                    src={url.medium}
                    alt={description}
                />
                <div
                    className={style.figure_zoom_area}
                    onClick={_ => setIsZoomed(prev => !prev)}
                >
                    <span className={`icon has-text-white ${style.figure_zoom_icon}`}>
                        {zoomSvg}
                    </span>
                </div>
            </figure>
        </div>
    );
};

PhotoPostFigure.propTypes = {
    photo: PropTypes.object.isRequired
};

export default PhotoPostFigure;