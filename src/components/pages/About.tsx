import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";

/* Add functions */
import loadApiData from "../../functions/LoadApiData";

/* Add component parts */
import Error from "../layout/Error";
import Header from "../layout/Header";
import Loader from "../layout/Loader";

/* Add font awesome icons: https://fontawesome.com/icons */
import {faImages, faIndustry} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/* Import types. */
import {TypeApiProperties, TypeDataVersion, TypeErrorOwn, TypeLoaded} from "../../types/Types";
import LinkV2 from "../layout/LinkV2";

/**
 * This is the about page.
 */
const About = () =>
{
    /* Import translation. */
    const { t } = useTranslation();

    /* API types */
    const typeCalendarBuilder: string = useMemo(() => {
        return process.env.REACT_APP_TYPE_CALENDAR_BUILDER !== undefined ?
            process.env.REACT_APP_TYPE_CALENDAR_BUILDER :
            'calendar-builder'
        ;
    }, []);
    const typeLocationApi = useMemo(() => {
        return process.env.REACT_APP_TYPE_LOCATION_API !== undefined ?
            process.env.REACT_APP_TYPE_LOCATION_API :
            'location-api'
        ;
    }, []);

    /* Calendar Builder variables */
    const [loadedCalendarBuilder, setLoadedCalendarBuilder] = useState<TypeLoaded>(false);
    const [errorCalendarBuilder, setErrorCalendarBuilder] = useState<TypeErrorOwn>(null);
    const [dataCalendarBuilder, setDataCalendarBuilder] = useState<TypeDataVersion|null>(null);
    const [propertiesCalendarBuilder, setPropertiesCalendarBuilder] = useState<TypeApiProperties|null>(null);
    const apiPathCalendarBuilder = '/api/v1/version.json';

    /**
     * useEffect function.
     */
    useEffect(() => {
        loadApiData({
            type: typeCalendarBuilder,
            path: apiPathCalendarBuilder,
            setDataVersion: setDataCalendarBuilder,
            setProperties: setPropertiesCalendarBuilder,
            setLoaded: setLoadedCalendarBuilder,
            setError: setErrorCalendarBuilder,
        }, t);
    }, [apiPathCalendarBuilder, typeCalendarBuilder, typeLocationApi, t]);

    /**
     * The render function.
     */
    return (
        <>
            <Header title={t('TEXT_ABOUT_HEADER_TITLE')} subtitle={t('TEXT_ABOUT_HEADER_SUBTITLE')} />
            <div className="about container mb-5 px-4 px-md-3">
                <div className="row g-3">
                    {loadedCalendarBuilder ? <>
                        <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                            <h2>React Calendar Viewer</h2>
                            <p>
                                {t('TEXT_ABOUT_DESCRIPTION')} <LinkV2
                                    to="https://twelvepics.com"
                                    target={'_blank'}
                                    rel="noreferrer"
                                >twelvepics.com</LinkV2>
                            </p>

                            <h3>{t('TEXT_ABOUT_TITLE')}</h3>

                            <h4>{t('TEXT_ABOUT_APP_TITLE')}</h4>
                            <p>{t('TEXT_ABOUT_APP_DESCRIPTION')}</p>

                            <div className="card w-100 shadow-own">
                                <div className="card-header fw-bold">
                                    <FontAwesomeIcon icon={faImages} style={{'color': 'rgb(255, 90, 55)'}}/>&nbsp; React Calendar Viewer
                                </div>
                                <div className="card-body">
                                    <ul className="mb-0">
                                        <li>{t('TEXT_ABOUT_APP_USP_1')}</li>
                                        <li>
                                            {t('TEXT_ABOUT_APP_USP_2')} <LinkV2
                                                to={'https://react.dev/blog/2022/03/29/react-v18'}
                                                target={'_blank'}
                                                rel="noreferrer"
                                            >
                                                React
                                            </LinkV2> 18.2.0
                                        </li>
                                        <li>{t('TEXT_ABOUT_APP_USP_3')}: <LinkV2
                                            to={'https://github.com/twelvepics-com/react-calendar-viewer/blob/main/CHANGELOG.md'}
                                            target={'_blank'}
                                            rel="noreferrer"
                                        >React Calendar Viewer</LinkV2></li>
                                    </ul>
                                </div>
                                <div className="card-footer fst-italic">
                                    <small><small>Version {process.env.REACT_APP_VERSION_APP} - {process.env.REACT_APP_VERSION_APP_DATE}</small></small>
                                </div>
                            </div>

                            <h4 className="mt-5">{t('TEXT_ABOUT_VERSION_TITLE')}</h4>
                            <p>{t('TEXT_ABOUT_VERSION_DESCRIPTION')}</p>

                            <div className="row g-3 mb-5">
                                <div className="col-12 col-lg-12 d-flex align-items-stretch">
                                    <div className="card w-100 shadow-own">
                                        <div className="card-header fw-bold"><FontAwesomeIcon icon={faIndustry} style={{'color': 'rgb(114, 126, 174)'}}/>&nbsp; PHP Calendar Builder</div>
                                        <div className="card-body">
                                            <ul className="mb-0">
                                                <li>{t('TEXT_ABOUT_VERSION_CALENDAR_USP_1')}</li>
                                                <li>{t('TEXT_ABOUT_VERSION_CALENDAR_USP_2')}</li>
                                                <li>
                                                    {t('TEXT_ABOUT_VERSION_CALENDAR_USP_3')}: <a
                                                        href={process.env.REACT_APP_CALENDAR_BUILDER_URL + '/api/v1/version.json'}
                                                        target={'_blank'} rel="noreferrer"
                                                    >
                                                        version.json
                                                    </a> (<code>JSON</code>)
                                                </li>
                                                <li>
                                                    {t('TEXT_ABOUT_VERSION_CALENDAR_USP_4')}: <a
                                                    href={'https://github.com/twelvepics-com/php-calendar-builder/blob/main/CHANGELOG.md'}
                                                    target={'_blank'} rel="noreferrer"
                                                >
                                                    PHP Calendar Builder
                                                </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {
                                            dataCalendarBuilder ?
                                                <div className="card-footer fst-italic">
                                                    <small><small>Version {dataCalendarBuilder.version} - {dataCalendarBuilder.date}</small></small>
                                                </div> :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p>
                                Copyright © <a href="https://twelvepics.com">twelvepics.com</a> 2024
                            </p>
                        </div>
                    </> : (
                        errorCalendarBuilder === null ?
                            <Loader/> : <Error error={errorCalendarBuilder} apiPath={propertiesCalendarBuilder ? propertiesCalendarBuilder['api-url'] : 'Unknown'} />
                    )}
                </div>
            </div>
        </>
    );
}

export default About;
