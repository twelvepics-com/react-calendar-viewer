import React, {useEffect, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";

/* Import functions */
import loadApiData from "../../functions/LoadApiData";
import {
    convertToGermanFormatFromDate
} from "../../functions/Date";

/* Import classes */
import {
    Query
} from "../../classes/Query";

/* Import configuration */
import {
    routePathPhotoSet
} from "../../config/Route";

/* Import types */
import {
    TypeApiProperties,
    TypeDataPhotoSetPage,
    TypeErrorOwn,
    TypeLoaded
} from "../../types/Types";

/* Import component parts */
import Error from "../layout/Error";
import HeaderImage from "../layout/HeaderImage";
import ImageWithLoader from "../layout/ImageWithLoader";
import Loader from "../layout/Loader";
import SearchPerformance from "../layout/SearchPerformance";

/**
 * This is the "photo set page" component.
 */
const PhotoSetPage = () =>
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
    const [data, setData] = useState<TypeDataPhotoSetPage|null>(null);
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
            setDataPhotoSetPage: setData,
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
            <HeaderImage data={data} />
            <div className="page container mb-5 px-4 px-md-3">
                <div className="row g-3">
                    { loaded && (data !== null) && data.photo_title !== undefined ? <>
                        <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                            <h2>{data.photo_title}</h2>
                            <div>
                                { 'colors' in data ? data.colors.map((item, index) => (
                                    <div key={'color-' + index} style={{width: 10, height: 10, backgroundColor: item, float: "left"}}></div>
                                )) : null }
                                <div style={{clear: 'both'}}></div>
                            </div>
                            <p>
                                <strong>Google Maps</strong>: {data.google_maps !== null ?
                                    <Link to={data.google_maps} target="_blank" rel="noreferrer">{data.coordinate_dms}</Link> :
                                    data.coordinate
                                }<br/>

                                <strong>{t('TEXT_WORD_INFORMATION' as any)}</strong>: {data.coordinate_decimal !== null ?
                                    <Link to={'https://locate.place/location.html?q=' + data.coordinate_decimal.replace(/, /, ', ') + '&next_places=1'}>{data.coordinate}</Link> :
                                    data.coordinate_decimal
                                }<br/>

                                <strong>{t('TEXT_WORD_DATE' as any)}</strong>: {data.day + '.' + data.month + '.' + data.year}<br/>

                                <strong>{t('TEXT_WORD_TAKEN' as any)}</strong>: {convertToGermanFormatFromDate(data.date)}<br/>
                            </p>

                            <div className="mb-5">
                                <Link
                                    to={properties.url + data.path + '?width=3072&quality=85'}
                                    className="no-decoration"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ImageWithLoader
                                        src={properties.url + data.path + '?width=1280'}
                                        srcSet={[
                                            {
                                                srcSet: properties.url + data.path + '?width=640',
                                                media: "(max-width: 600px)"
                                            },
                                            {
                                                srcSet: properties.url + data.path + '?width=1280',
                                                media: "(max-width: 1200px)"
                                            }
                                        ]}
                                        alt={data.photo_title + ' (' + data.coordinate + ')'}
                                        title={data.photo_title + ' (' + data.coordinate + ')'}
                                        border={true}
                                        orientation={data.orientation ?? 'landscape'}
                                    />
                                </Link>
                            </div>

                            {data.description !== undefined ? <>
                                <h3>{t('TEXT_WORD_WHAT_DO_YOU_SEE' as any)}</h3>
                                <p style={{textAlign: 'justify'}}>
                                    {data.description.replace(/\n$/, '').split("\n").map(function (item, idx) {
                                        return (
                                            <span key={'description-' + idx}>
                                                {item}
                                                <br/><br/>
                                            </span>
                                        )
                                    })}
                                </p>
                            </> : null}
                            <div className="mt-5">
                                <p><Link
                                    className="btn btn-primary"
                                    to={query.getFilterConfig().getLinkTo(routePathPhotoSet + '?ps=' + data.identifier)}
                                >{t('TEXT_WORD_BACK_TO_THE_PHOTO_SET' as any)}</Link></p>
                            </div>
                            <div className="mt-5">
                                <SearchPerformance
                                    type={'calendar'}
                                    properties={properties}
                                    apiPathWithoutParameter={apiPath}
                                    apiPathWithParameter={apiPathWithFilter}
                                />
                            </div>
                        </div>
                    </> : (error !== null ? <Error error={error} apiPath={apiPath} /> : <Loader />)}
                </div>
            </div>
        </>
    );
}

export default PhotoSetPage;
