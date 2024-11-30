import React, {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";

/* Import functions */
import loadApiData from "../../functions/LoadApiData";

/* Import classes */
import {Query} from "../../classes/Query";

/* Import configuration. */
import {routePathPhotoSetPage} from "../../config/Route";

/* Import types */
import {
    TypeApiProperties,
    TypeDataPhotoSet,
    TypeErrorOwn,
    TypeLoaded
} from "../../types/Types";

/* Import component parts */
import Error from "../layout/Error";
import HeaderCalendar from "../layout/HeaderCalendar";
import ImageWithLoader from "../layout/ImageWithLoader";
import Loader from "../layout/Loader";
import SearchPerformance from "../layout/SearchPerformance";

/**
 * This is the "photo set" component.
 */
const PhotoSet = () =>
{
    /* Import translation. */
    const { t } = useTranslation();

    /* Get env variables */
    const env = useMemo(() => {
        return process.env;
    }, []);

    /* State variables */
    const [error, setError] = useState<TypeErrorOwn>(null);
    const [loaded, setLoaded] = useState<TypeLoaded>(false);
    const [data, setData] = useState<TypeDataPhotoSet|null>(null);
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
            setDataPhotoSet: setData,
            setProperties: setProperties,
            setLoaded: setLoaded,
            setError: setError,
        }, t);
    }, [apiType, apiPath, t]);

    /* Skip empty data */
    if (properties === null) {
        return <></>;
    }

    /**
     * The render function.
     */
    return (
        <>
            <HeaderCalendar data={data} />
            <div className="calendar container mb-5 px-4 px-md-3">
                <div className="row g-4">
                    {loaded && (data !== null) ? <>
                        <div className="col-12">
                            <h2>{data.title}</h2>
                            <p>{data.subtitle}</p>
                        </div>
                        { !!data.photos ? data.photos.map((item, index) => (
                            <div className="col-12 col-lg-6 col-xl-4 d-flex align-items-stretch" key={'image-' + index}>
                                <div className="card card-hover">
                                    <Link
                                        to={query.getFilterConfig().getLinkTo(routePathPhotoSetPage + '?ps=' + data.identifier + '&i=' + item.identifier)}
                                        className="no-decoration stretched-link"
                                    >
                                        <ImageWithLoader
                                            src={properties.url + item.path + '?width=500'}
                                            srcSet={[
                                                { srcSet: properties.url + item.path + '?width=500', media: "(max-width: 600px)" },
                                                { srcSet: properties.url + item.path + '?width=500', media: "(max-width: 1200px)" }
                                            ]}
                                            alt={item.title + ' (' + item.coordinate + ')'}
                                            title={item.title + ' (' + item.coordinate + ')'}
                                            border={false}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{item.title}</h5>
                                    </div>
                                    <div className="card-footer">
                                        <p className="card-text one-line">{item.year}/{item.month === 0 ? t('TEXT_WORD_TITLE_PAGE' as any) : item.month}</p>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                        <div className="col-12">
                            <div className="mt-5">
                                <SearchPerformance
                                    type={'calendar'}
                                    properties={properties}
                                    apiPathWithoutParameter={apiPath}
                                    apiPathWithParameter={apiPathWithFilter}
                                />
                            </div>
                        </div>
                    </> : (error !== null ? <Error error={error} apiPath={properties['api-url']} /> : <Loader />)}
                </div>
            </div>
        </>
    );
}

export default PhotoSet;
