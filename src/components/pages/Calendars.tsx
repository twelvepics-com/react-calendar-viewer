import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";

/* Import types. */
import {TypeApiProperties, TypeDataCalendars, TypeErrorOwn, TypeLoaded} from "../../types/Types";

/* Import functions. */
import loadApiData from "../../functions/LoadApiData";

/* Import classes. */
import {Query} from "../../classes/Query";

/* Import component parts. */
import Error from "../layout/Error";
import Header from "../layout/Header";
import ImageWithLoader from "../layout/ImageWithLoader";
import Loader from "../layout/Loader";
import SearchPerformance from "../layout/SearchPerformance";

/**
 * This is the "calendars" component.
 */
const Calendars = () =>
{
    /* Import translation. */
    const { t } = useTranslation();

    /* API types */
    const env = useMemo(() => {
        return process.env;
    }, []);

    /* State variables */
    const [error, setError] = useState<TypeErrorOwn>(null);
    const [loaded, setLoaded] = useState<TypeLoaded>(false);
    const [data, setData] = useState<TypeDataCalendars|null>(null);
    const [properties, setProperties] = useState<TypeApiProperties|null>(null);

    /* Memorized variables. */
    const [searchParams] = useSearchParams();

    /* Gets the api url */
    let query = new Query(searchParams, env);
    const apiPath = query.getApiUrl();
    const apiPathWithFilter = query.getApiUrlWithFilter();
    const apiType = query.getApiType();

    /**
     * useEffect function.
     */
    useEffect(() => {
        loadApiData({
            type: apiType,
            path: apiPath,
            setDataCalendars: setData,
            setProperties: setProperties,
            setLoaded: setLoaded,
            setError: setError,
        }, t);
    }, [t, apiType, apiPath]);

    /* Skip empty data */
    if (properties === null) {
        return <></>;
    }

    /**
     * The render function.
     */
    return (
        <>
            <Header title={t('TEXT_CALENDARS_TITLE' as any)} subtitle={t('TEXT_CALENDARS_SUBTITLE' as any)} />
            <div className="calendars container mb-5 px-4 px-md-3">
                    {loaded && data !== null ? <>
                        <div className="row g-4">
                            {
                                data.calendars.length > 0 ? data.calendars.map((item, index) => (
                                    <div className="col-12 col-lg-6 col-xl-4 d-flex align-items-stretch" key={'calendar-' + index}>
                                        <div className="card card-hover">
                                            <Link
                                                to={query.getFilterConfig().getLinkTo('/calendar.html?c=' + item.identifier)}
                                                className="no-decoration stretched-link"
                                            >
                                                <ImageWithLoader
                                                    src={properties.url + item.image + '?width=500'}
                                                    srcSet={[
                                                        { srcSet: properties.url + item.image + '?width=500', media: "(max-width: 600px)" },
                                                        { srcSet: properties.url + item.image + '?width=500', media: "(max-width: 1200px)" }
                                                    ]}
                                                    alt={item.title}
                                                    title={item.title}
                                                    border={false}
                                                />
                                            </Link>
                                            <div className="card-body">
                                                <h5 className="card-title mb-0">{item.title}</h5>
                                            </div>
                                            <div className="card-footer">
                                                <p className="card-text one-line">{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : <></>
                            }
                        </div>
                        <div className="mt-5">
                            <SearchPerformance
                                type={'calendar'}
                                properties={properties}
                                apiPathWithoutParameter={apiPath}
                                apiPathWithParameter={apiPathWithFilter}
                            />
                        </div>
                    </> : (error !== null ? <Error error={error} apiPath={properties['api-url']} /> : <Loader />)}
            </div>
        </>
    );
}

export default Calendars;
