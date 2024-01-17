import React, {useEffect, useMemo, useState} from 'react';

/* Add functions */
import loadApiData from "../../functions/LoadApiData";

/* Add component parts */
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import Error from "../layout/Error";
import {useSearchParams} from "react-router-dom";
import {
    getQuery,
    getApiPathDetail,
} from "../../functions/Query";
import {convertToGermanFormat} from "../../functions/Date";

/* Bootstrap icons; see https://icons.getbootstrap.com/?q=sort#usage */
import {
    GlobeAmericas
} from "react-bootstrap-icons";
import Flag from "react-flagkit";
import NextPlaces from "../layout/NextPlaces";
import SearchForm from "../layout/SearchForm";
import SearchMetrics from "../layout/SearchMetrics";
import SearchPerformance from "../layout/SearchPerformance";

/**
 * This is the app locations component.
 */
const Location = () => {

    /* Routes variables */
    const routePath = '/location.html';

    /* API types */
    const typeLocationApi = useMemo(() => {
        return process.env.REACT_APP_TYPE_LOCATION_API;
    }, []);

    /* State variables */
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [properties, setProperties] = useState([]);

    console.log('data');
    console.log(data);
    console.log('properties');
    console.log(properties);

    /* Memorized variables. */
    const [searchParams] = useSearchParams();

    /* Get variables according to the search parameters. */
    let apiPathWithParameter = getApiPathDetail(searchParams, true);
    let apiPathWithoutParameter = getApiPathDetail(searchParams, false);
    let query = getQuery(searchParams);

    /* Get generell parts */
    let hasDataProperties = !!data['properties'];
    let propertyCountryCode = hasDataProperties && data.properties.country ? data.properties.country : null;
    let propertyElevation = hasDataProperties && data.properties.elevation && data.properties.elevation['value-formatted'] ? data.properties.elevation['value-formatted'] : null;

    /* Get coordinate parts */
    let hasCoordinate = !!data['coordinate'];
    let coordinateLatitudeDecimal = hasCoordinate && data.coordinate.latitude ? data.coordinate.latitude.decimal : null;
    let coordinateLatitudeDms = hasCoordinate && data.coordinate.latitude ? data.coordinate.latitude.dms : null;
    let coordinateLongitudeDecimal = hasCoordinate && data.coordinate.longitude ? data.coordinate.longitude.decimal : null;
    let coordinateLongitudeDms = hasCoordinate && data.coordinate.longitude ? data.coordinate.longitude.dms : null;
    let distanceInKilometers = hasCoordinate && data.coordinate.distance ? data.coordinate.distance.kilometers['value-formatted'] : null;

    /* Get feature parts */
    let hasFeature = !!data['feature'];
    let featureClass = hasFeature && data.feature['class']? data.feature['class'] : null;
    let featureClassName = hasFeature && data.feature['class-name']? data.feature['class-name'] : null;
    let featureCode = hasFeature && data.feature['code']? data.feature['code'] : null;
    let featureCodeName = hasFeature && data.feature['code-name']? data.feature['code-name'] : null;

    /* Get location parts */
    let hasLocations = !!data['locations'];
    let locationDistrictLocality = hasLocations && data.locations['district-locality'] ? data.locations['district-locality'] : null;
    let locationCityMunicipality = hasLocations && data.locations['city-municipality'] ? data.locations['city-municipality'] : null;
    let locationState = hasLocations && data.locations['state'] ? data.locations['state'] : null;
    let locationCountry = hasLocations && data.locations['country'] ? data.locations['country'] : null;

    /* Get next places parts */
    let hasNextPlaces = !!data['next-places'];
    let hasNextPlacesA = hasNextPlaces && data['next-places']['A'];
    let nextPlacesA = hasNextPlacesA ? data['next-places']['A'] : null;
    let hasNextPlacesH = hasNextPlaces && data['next-places']['H'];
    let nextPlacesH = hasNextPlacesH ? data['next-places']['H'] : null;
    let hasNextPlacesL = hasNextPlaces && data['next-places']['L'];
    let nextPlacesL = hasNextPlacesL ? data['next-places']['L'] : null;
    let hasNextPlacesP = hasNextPlaces && data['next-places']['P'];
    let nextPlacesP = hasNextPlacesP? data['next-places']['P'] : null;
    let hasNextPlacesR = hasNextPlaces && data['next-places']['R'];
    let nextPlacesR = hasNextPlacesR? data['next-places']['R'] : null;
    let hasNextPlacesS = hasNextPlaces && data['next-places']['S'];
    let nextPlacesS = hasNextPlacesS? data['next-places']['S'] : null;
    let hasNextPlacesT = hasNextPlaces && data['next-places']['T'];
    let nextPlacesT = hasNextPlacesT? data['next-places']['T'] : null;
    let hasNextPlacesU = hasNextPlaces && data['next-places']['U'];
    let nextPlacesU = hasNextPlacesU? data['next-places']['U'] : null;
    let hasNextPlacesV = hasNextPlaces && data['next-places']['V'];
    let nextPlacesV = hasNextPlacesV? data['next-places']['V'] : null;

    let sizeIconH3 = 20;
    let sizeIconCaption = 16;
    let sizeIconButton = 16;

    /**
     * useEffect function.
     */
    useEffect(() => {
        loadApiData(
            typeLocationApi,
            apiPathWithParameter,
            setLoaded,
            setError,
            setData,
            setProperties
        );
    }, [typeLocationApi, apiPathWithParameter]);

    /**
     * The render function.
     */
    return (
        <>
            <Header title='Locations' subtitle='Locations API' />
            <div className="calendars container mb-5 px-4 px-md-3">
                <div className="row g-4">
                    <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                        {/* Renders the search form. */}
                        <SearchForm
                            query={query}
                            routePath={routePath}
                            sizeIconH3={sizeIconH3}
                        />

                        {loaded ? <>
                            {/* Renders the search metrics part. */}
                            <SearchMetrics
                                properties={properties}
                                sizeIconH3={sizeIconH3}
                                sizeIconButton={sizeIconButton}
                                sizeIconCaption={sizeIconCaption}
                            />

                            <div>
                                <h2>
                                    <Flag country={propertyCountryCode} size="20" title={propertyCountryCode} /> &nbsp;
                                    {data.name}
                                </h2>

                                <table className="table table-last-line">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Vollständiger Name</td>
                                            <td colSpan={2}>{data['name-full']}</td>
                                        </tr>
                                        {
                                            locationDistrictLocality ? <tr>
                                                <td className="fw-bold">Stadtteil / Ortschaft</td>
                                                <td colSpan={2}>{locationDistrictLocality.name}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            locationCityMunicipality ? <tr>
                                                <td className="fw-bold">Stadt / Gemeinde</td>
                                                <td colSpan={2}>{locationCityMunicipality.name}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            locationState ? <tr>
                                                <td className="fw-bold">Bundesland</td>
                                                <td colSpan={2}>{locationState.name}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            locationCountry ? <tr>
                                                <td className="fw-bold">Land</td>
                                                <td colSpan={2}>{locationCountry.name}</td>
                                            </tr> : <></>
                                        }
                                        <tr>
                                            <td className="fw-bold">Ländercode</td>
                                            <td colSpan={2}>{propertyCountryCode}</td>
                                        </tr>
                                        {
                                            propertyElevation ? <tr>
                                                <td className="fw-bold">Höhe</td>
                                                <td colSpan={2}>{propertyElevation}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            coordinateLatitudeDecimal ? <tr>
                                                <td className="fw-bold">Latitude</td>
                                                <td>{coordinateLatitudeDms}</td>
                                                <td>{coordinateLatitudeDecimal}°</td>
                                            </tr> : <></>
                                        }
                                        {
                                            coordinateLongitudeDecimal ? <tr>
                                                <td className="fw-bold">Longitude</td>
                                                <td>{coordinateLongitudeDms}</td>
                                                <td>{coordinateLongitudeDecimal}°</td>
                                            </tr> : <></>
                                        }
                                        {
                                            distanceInKilometers ? <tr>
                                                <td className="fw-bold">Entfernung</td>
                                                <td colSpan={2}>{distanceInKilometers}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            featureClass ? <tr>
                                                <td className="fw-bold">Oberschlüssel</td>
                                                <td><code>{featureClass}</code></td>
                                                <td>{featureClassName}</td>
                                            </tr> : <></>
                                        }
                                        {
                                            featureCode ? <tr>
                                                <td className="fw-bold">Schlüssel</td>
                                                <td><code>{featureCode}</code></td>
                                                <td>{featureCodeName}</td>
                                            </tr> : <></>
                                        }
                                        <tr>
                                            <td className="fw-bold">Geoname ID</td>
                                            <td colSpan={2}>{data['geoname-id']}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Letztes Update</td>
                                            <td colSpan={2}>{convertToGermanFormat(data['updated-at'])}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {hasNextPlacesA ? <NextPlaces nextPlaces={nextPlacesA} /> : <></>}
                            {hasNextPlacesP ? <NextPlaces nextPlaces={nextPlacesP} /> : <></>}
                            {hasNextPlacesH ? <NextPlaces nextPlaces={nextPlacesH} /> : <></>}
                            {hasNextPlacesL ? <NextPlaces nextPlaces={nextPlacesL} /> : <></>}
                            {hasNextPlacesR ? <NextPlaces nextPlaces={nextPlacesR} /> : <></>}
                            {hasNextPlacesS ? <NextPlaces nextPlaces={nextPlacesS} /> : <></>}
                            {hasNextPlacesT ? <NextPlaces nextPlaces={nextPlacesT} /> : <></>}
                            {hasNextPlacesU ? <NextPlaces nextPlaces={nextPlacesU} /> : <></>}
                            {hasNextPlacesV ? <NextPlaces nextPlaces={nextPlacesV} /> : <></>}

                            {/* Renders the search performance part. */}
                            <SearchPerformance
                                properties={properties}
                                apiPathWithoutParameter={apiPathWithoutParameter}
                                apiPathWithParameter={apiPathWithParameter}
                            />
                        </> : (error !== null ? <Error error={error} apiPath={properties['api-url']}/> : <Loader/>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Location;
