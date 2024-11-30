import React, { useState } from 'react';

/* Add types */
import {TypeSrcSet} from "../../types/Types";

type ImageWithLoaderProps = {
    src: string,
    srcSet: TypeSrcSet[],
    alt: string,
    title: string,
    border: boolean,
    orientation?: "portrait"|"landscape"
}

/**
 * This is the image with loader part.
 */
const ImageWithLoader = ({src, srcSet, alt, title, border, orientation = "landscape"}: ImageWithLoaderProps) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <div className={border ? 'card' : ''} style={{
                aspectRatio: orientation === 'landscape' ? '4/3' : '3/4',
                backgroundColor: '#f9f9f9'
            }}>
                <div
                    className="card-body d-flex align-items-center justify-content-center"
                    style={{height: '100%'}}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div> &nbsp; Lade Bild. Bitte warten.
                </div>
            </div>}
            <picture onLoad={() => setLoading(false)}>
                {srcSet.map((source, index) => (
                    <source key={index} srcSet={source.srcSet} media={source.media} />
                ))}
                <img
                    className={
                        [
                            orientation === 'landscape' ? 'img-landscape' : 'img-portrait',
                            border ? 'img-thumbnail' : ''
                        ].filter(Boolean).join(' ')
                    }
                    src={src}
                    alt={alt}
                    title={title}
                    style={{
                        display: loading ? 'none' : 'block',
                        aspectRatio: orientation === 'landscape' ? '4/3' : '3/4',
                        backgroundColor: '#f9f9f9',
                        width: '100%'
                    }}
                />
            </picture>
        </>
    )
}

export default ImageWithLoader;
