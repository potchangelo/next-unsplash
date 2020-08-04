import style from './css/photo_post.module.scss';
import { useState } from 'react';
import { Minimize2, Maximize2 } from 'react-feather';

function Photo({ photo }) {
    // Data
    const [isZoomed, setIsZoomed] = useState(false);

    if (!photo) return null;

    const { width, height, description, url } = photo;

    // Attributes
    let figureClass = style.figure;
    let figureStyle = {
        maxWidth: `calc(calc(100vh - 200px) * ${width / height})`
    };
    const paddingBottom = `${height / width * 100}%`;
    const srcset = `${url.small} 640w, ${url.medium} 1080w, ${url.large} 1920w`;
    let sizes = '(max-width: 640px) 640px, (max-width: 1080px) 1080px, 100vw';'100vw';
    if (isZoomed) {
        figureClass += ` ${style.figure_zoomed}`;
        figureStyle = {};
        sizes = '100vw';
    }

    // Elements
    let zoomSvg = <Maximize2 size={24} />;
    if (isZoomed) {
        zoomSvg = <Minimize2 size={24} />;
    }

    return (
        <div className={style.figure_cover}>
            <figure 
                className={figureClass} 
                style={figureStyle} 
                onClick={_ => setIsZoomed(prev => !prev)} >
                <div style={{ paddingBottom }} />
                <img 
                    sizes={sizes} 
                    srcSet={srcset} 
                    src={url.medium} 
                    alt={description} />
                <span className={`icon has-text-white ${style.zoom_icon}`}>
                    {zoomSvg}
                </span>
            </figure>
        </div>
    );
};

export default Photo;