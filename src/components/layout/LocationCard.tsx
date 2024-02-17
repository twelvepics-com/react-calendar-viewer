import React, {useMemo} from "react";
import {Link, useSearchParams} from "react-router-dom";

/* Import translation libraries. */
import {useTranslation} from "react-i18next";

/* Add some additional components */
import Flag from 'react-flagkit';

/* Add font awesome icons */
import {faMapLocation, faMaximize} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/* Import functions */
import {convertToGermanFormat} from "../../functions/Date";
import {getAirportCodeIata, getElevation, getPopulation} from "../../functions/Properties";

/* Add translations */
import {translateCountryCode} from "../../translations/Country";

/* Add component parts */
import CoordinateDistanceDirection from "./CoordinateDistanceDirection";

/* Import classes. */
import {Query} from "../../classes/Query";
import {LocationWrapper} from "../../classes/Api/Location/Location/LocationWrapper";
import {ApiResponseProperty} from "../../classes/Api/ApiResponseProperty";

type LocationCardProps = {
    locationWrapper: LocationWrapper|null,
    apiResponseProperty: ApiResponseProperty,
    showOwnPosition: boolean,
    index?: number,
    useAlwaysName?: boolean
}

/**
 * This is the example part.
 *
 * - ownPosition - Use own position instead of the one from the given location.
 */
const LocationCard = ({locationWrapper, apiResponseProperty, showOwnPosition, index, useAlwaysName = false}: LocationCardProps) =>
{
    /* true - use geoname id as query; false - use coordinate as query */
    let useGeonameIdAsQuery = true;

    /* Import translation. */
    const { t } = useTranslation();

    /* API types */
    const env = useMemo(() => {
        return process.env;
    }, []);

    /* Memorized variables. */
    const [searchParams] = useSearchParams();

    let query = new Query(searchParams, env);

    let filterConfig = query.getFilterConfig();

    if (locationWrapper === null) {
        return <></>;
    }

    let nextPlaces = locationWrapper.getNextPlacesConfig();

    /* Use own position or from the given location. */
    let ownPositionCard = showOwnPosition ? (apiResponseProperty.getGiven()?.getCoordinate()?.getParsed() ?? null) : null;

    let latitudeDms = showOwnPosition ? (ownPositionCard?.getLatitude().getDMS() ?? null) : locationWrapper.getCoordinate().getLatitude().getDMS();
    let longitudeDms = showOwnPosition ? (ownPositionCard?.getLongitude().getDMS() ?? null) : locationWrapper.getCoordinate().getLongitude().getDMS();

    let latitudeDecimal = showOwnPosition ? (ownPositionCard?.getLatitude().getDecimal() ?? null) : locationWrapper.getCoordinate().getLatitude().getDecimal();
    let longitudeDecimal = showOwnPosition ? (ownPositionCard?.getLongitude().getDecimal() ?? null) : locationWrapper.getCoordinate().getLongitude().getDecimal();

    let linkGoogleMaps = showOwnPosition ? (ownPositionCard?.getLinks().getGoogle() ?? null) : locationWrapper.getLinks().getMaps('google');
    let linkOpenStreetMaps = showOwnPosition ? (ownPositionCard?.getLinks().getOpenStreetMap() ?? null) : locationWrapper.getLinks().getMaps('openstreetmap');

    let airportCodeIata = locationWrapper.getProperties().getAirportCodesText(locationWrapper, t) ?? null;

    let queryString = useGeonameIdAsQuery ? locationWrapper.getGeonameId() : locationWrapper.getCoordinate().getDecimal();

    let name = useAlwaysName ? locationWrapper.getName() : (locationWrapper.getNameFull() || locationWrapper.getName());

    return (
        <>
            <div className={'card card-hover w-100 mb-4'}
                 style={showOwnPosition ? {'backgroundColor': 'rgb(235, 233, 228)'} : {'backgroundColor': 'rgb(228, 235, 233)'}}>
                <div className="card-header">
                    <Flag country={locationWrapper.getProperties().getCountryCode()} size={20}
                          title={translateCountryCode(locationWrapper.getProperties().getCountryCode())}/> &nbsp;
                    {
                        showOwnPosition ?
                            <span><span className="fw-bold">{name}</span></span> :
                            <span><span className="fw-bold">{name}</span>{index !== undefined ? <sup>&nbsp;(#{index + 1})</sup> : null}</span>
                    }
                    {
                        locationWrapper.getProperties().showAirportCodes(locationWrapper) ?
                            <><span> - </span><code title="IATA-Code">{airportCodeIata}</code></> :
                            <></>
                    }
                </div>
                <div className="card-body">
                    <div className="container p-0">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <h4>{t('TEXT_HEADER_INFORMATION')}</h4>
                                <p className="m-0">
                                    <Link
                                        to={filterConfig.getLinkLocationQuery(queryString.toString())}
                                    ><span><FontAwesomeIcon
                                        icon={faMaximize}
                                        style={{'color': 'rgb(114, 135, 42)'}}
                                    /> {name}</span></Link>
                                </p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <h4>{t('TEXT_HEADER_NEXT_PLACES')}</h4>
                                <p className="m-0">
                                    {nextPlaces.getConfigKeysNextPlaces().map((key, index) => {
                                        return (
                                            <span key={'next-place-' + key}>
                                                {index !== 0 ? ', ' : ''}
                                                <Link
                                                    key={'next-place-' + key}
                                                    to={filterConfig.getLinkNextPlaces(
                                                        (nextPlaces.getConfigByNexPlaceFeatureCodes(key, '|') ?? '') + ' ' + locationWrapper.getCoordinate().getDecimal(),
                                                        nextPlaces.getConfigByNexPlaceDistance(key) ?? 0,
                                                        nextPlaces.getConfigByNexPlaceLimit(key) ?? 0,
                                                    )}
                                                >{t('TEXT_LOCATION_CARD_' + key.toUpperCase())}</Link>
                                            </span>
                                        );
                                    })}
                                </p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <h4>{t('TEXT_HEADER_MAPS')}</h4>
                                <p className="m-0">
                                    {
                                        linkGoogleMaps ?
                                            <Link
                                                to={linkGoogleMaps}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <span className="text-nowrap">
                                                    <FontAwesomeIcon icon={faMapLocation} style={{'color': 'rgb(23, 34, 52)'}}/> Google Maps
                                                </span>
                                            </Link> : <></>
                                    },
                                    {
                                        linkOpenStreetMaps ?
                                            <Link
                                                to={linkOpenStreetMaps}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <span className="text-nowrap">
                                                    <FontAwesomeIcon icon={faMapLocation} style={{'color': 'rgb(23, 34, 52)'}}/> OpenStreetMap
                                                </span>
                                            </Link> : <></>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <small><small>
                        <strong>
                            {locationWrapper.getNameFull() ? locationWrapper.getNameFull() : locationWrapper.getName()}
                        </strong>
                        {getElevation(locationWrapper.get(), ' - ')}
                        {getPopulation(locationWrapper.get(), ' - ')}
                        {
                            airportCodeIata !== null ?
                                <><span> - </span><code title="IATA-Code">{airportCodeIata}</code></> :
                                <></>
                        }
                        <br/>
                        <span>
                            <strong>{locationWrapper.getFeature().getCode().getName()}</strong>: {locationWrapper.getFeature().getClass().getName()} - <code>{locationWrapper.getFeature().getClass().getCode() + '::' + locationWrapper.getFeature().getCode().getCode()}</code>
                        </span>

                        <br/>
                        <span>
                            <strong>Letztes Update</strong>: {convertToGermanFormat(locationWrapper.getUpdateAt())}
                        </span>
                    </small></small>
                </div>
                <div className="card-footer"><small><small>
                    {
                        showOwnPosition ?
                            <>
                                <strong>Position</strong>: <span
                                title={latitudeDecimal ? latitudeDecimal.toString() : ''}>{latitudeDms}</span>, <span
                                title={longitudeDecimal ? longitudeDecimal.toString() : ''}>{longitudeDms}</span>
                            </> :
                            <CoordinateDistanceDirection location={locationWrapper.get()}/>
                    }
                </small></small></div>
            </div>
        </>
    )
}

export default LocationCard;
