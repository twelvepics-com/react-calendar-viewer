import React from "react";
import {useTranslation} from "react-i18next";

/* Import types. */
import {TypeDataCalendarPage, TypeDataPhotoSetPage} from "../../types/Types";

type HeaderImageProps = {
    data: TypeDataCalendarPage|TypeDataPhotoSetPage|null
}

/**
 * This is the header image part.
 */
const HeaderImage = ({data}: HeaderImageProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    /* Generated variables */
    let title = '...';
    let subtitle = t('TEXT_WORD_LOAD' as any);
    let color = '#f0f0f0';

    if (data !== null) {
        title = data.title;
        subtitle = data.subtitle;
        color = data.color;
    }

    return (
        <header className="header header-image" style={{
            backgroundColor: color
        }}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{title}</h1>
                            <span className="subheading">{subtitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderImage;
