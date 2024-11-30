import React from "react";

/* Import types */
import {TypeDataCalendar, TypeDataPhotoSet} from "../../types/Types";
import {useTranslation} from "react-i18next";

type HeaderCalendarProps = {
    data: TypeDataCalendar|TypeDataPhotoSet|null,
}

/**
 * This is the header calendar part.
 */
const HeaderCalendar = ({data}: HeaderCalendarProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    let calendarBuilderUrl: string = process.env.REACT_APP_CALENDAR_BUILDER_URL !== undefined ?
        process.env.REACT_APP_CALENDAR_BUILDER_URL :
        '0.1.0';

    /* Generated variables */
    let title = '...';
    let subtitle = t('TEXT_WORD_LOAD' as any);
    let imageUrl = '';

    if (data!== null) {
        title = data.title;
        subtitle = data.subtitle;
        imageUrl = data.image ? ('url(' + calendarBuilderUrl + data.image + '?width=1280&type=source)') : '';
    }

    return (
        <header className="header header-calendar" style={{
            backgroundImage: imageUrl,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
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

export default HeaderCalendar;
