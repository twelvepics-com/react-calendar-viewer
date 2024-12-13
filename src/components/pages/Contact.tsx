import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

/* Import configuration */
import {sizeIcon} from "../../config/Config";

/* Import component parts */
import Header from "../layout/Header";
import LinkV2 from "../layout/LinkV2";
import Flag from "../layout/Flag";

/* Import translations. */
import {translateCountryCode} from "../../translations/Country";

/* Bootstrap icons; see https://icons.getbootstrap.com/?q=sort#usage */
import {
    EnvelopeAt,
} from "react-bootstrap-icons";

/**
 * This is the contact page.
 */
const Contact = () =>
{
    /* Import translation. */
    const { t } = useTranslation();

    const encodedEmail = 'YmpvZXJuQGhlbXBlbC5saQ==';

    const [email, setEmail] = useState('');

    useEffect(() =>
    {
        setEmail(atob(encodedEmail));
    }, [encodedEmail]);

    const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
    {
        e.preventDefault();
        window.location.href = `mailto:${email}`;
    };

    return (
        <>
            <Header title={t('TEXT_CONTACT_TITLE' as any)} subtitle={t('TEXT_CONTACT_SUBTITLE' as any)} />
            <div className="container mb-5 px-4 px-md-3">
                <div className="row g-3">
                    <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                        <div className="card shadow-own">
                            <div className="card-header">
                                <Flag country="DE" size={1.5}/> &nbsp;<span className="fw-bold">{t('TEXT_CONTACT_TITLE' as any)}</span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    Björn Hempel<br/>
                                    Königstr. 3<br/>
                                    01097 {t('TEXT_DRESDEN' as any)}<br/>
                                    {translateCountryCode('DE')}
                                </p>
                                <p className="card-text">
                                    {t('TEXT_CONTACT_TEXT_EMAIL' as any)}<br/>
                                    <EnvelopeAt size={sizeIcon.H3}/> &nbsp;<a href="#!" onClick={handleEmailClick}>{t('TEXT_CONTACT_TEXT_EMAIL_SEND' as any)}</a>
                                </p>
                            </div>
                            <div className="card-footer">
                                <small><small>
                                    <strong>{t('TEXT_ADDRESS' as any)}</strong> -&nbsp;
                                    <span><LinkV2 to={'/location.html?q=51°3′39.2616″N,%2013°44′26.5956″E&next_places=1'}>51°3′39.2616″N, 13°44′26.5956″E</LinkV2></span><br/>
                                    <span><strong>{t('TEXT_WORD_LAST_UPDATE' as any)}</strong>: {process.env.REACT_APP_VERSION_APP_DATE}</span>
                                </small></small>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
