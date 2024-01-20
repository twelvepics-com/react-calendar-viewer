import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from "react-router-dom";

/* Add configurations */
import {sizeIcon} from "../../config/Config";

/* Add functions */
import loadApiData from "../../functions/LoadApiData";
import {
    getQuery,
    getSort,
    getFilterConfig,
    getApiPathList,
    sortByName,
    sortByRelevanceUser,
    sortByDistanceUser, sortByDistance, sortByRelevance
} from "../../functions/Query";
import {searchTypeListWithFeatures, searchTypeCoordinate} from "../../functions/SearchType";

/* Add component parts */
import Error from "../layout/Error";
import HeaderSmall from "../layout/HeaderSmall";
import Loader from "../layout/Loader";
import LocationCard from "../layout/LocationCard";
import SearchForm from "../layout/SearchForm";
import SearchMetrics from "../layout/SearchMetrics";
import SearchPerformance from "../layout/SearchPerformance";

/* Bootstrap icons; see https://icons.getbootstrap.com/?q=sort#usage */
import {
    SortAlphaDown,
    SortNumericDown,
    SortDown,
    HouseFill,
    HouseSlashFill,
    ListTask,
    CursorFill
} from "react-bootstrap-icons";

/**
 * This is the app locations component.
 */
const Locations = () =>
{
    /* Routes variables */
    const routePath = '/locations.html';

    /* API types */
    const typeLocationApi = useMemo(() => {
        return process.env.REACT_APP_TYPE_LOCATION_API;
    }, []);

    /* State variables */
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [properties, setProperties] = useState([]);

    /* Memorized variables. */
    const [searchParams] = useSearchParams();

    /* Get variables according to the search parameters. */
    let filterConfig = getFilterConfig(searchParams);
    let apiPathWithParameter = getApiPathList(searchParams, true);
    let apiPathWithoutParameter = getApiPathList(searchParams, false);
    let query = getQuery(searchParams);
    let sort = getSort(searchParams);
    let isQuerySearch = !!query;

    /* Check if the current position has been given. */
    let hasOwnPosition = properties.given && properties.given.coordinate && properties.given.coordinate.location;
    let ownPosition = hasOwnPosition ? (properties.given.coordinate.parsed.latitude.dms + ', ' + properties.given.coordinate.parsed.longitude.dms) : null;

    let hasQuery = properties.given && properties.given.query;
    let isCoordinateSearch = hasQuery && [searchTypeListWithFeatures, searchTypeCoordinate].includes(properties.given.query.parsed.type);

    let numberResults = data.constructor === Array ? data.length : 0;

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
            <HeaderSmall title='Locations' subtitle='Locations API' />
            <div className="calendars container mb-5 px-4 px-md-3">
                <div className="row g-4">
                    <div className="col-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                        {/* Renders the search form. */}
                        <SearchForm
                            query={query}
                            routePath={routePath}
                        />

                        {loaded ? <>
                            {/* Renders the search metrics part. */}
                            <SearchMetrics properties={properties} />

                            {
                                isQuerySearch ?
                                    <>
                                        <h3><ListTask size={sizeIcon.H3}/> Suchergebnis</h3>
                                    </> :
                                    <>
                                        <p>Oder starte mit den nachfolgenden Beispielen.</p>

                                        <h3><ListTask size={sizeIcon.H3}/> Location Beispiele</h3>
                                    </>
                            }

                            <div className="float-end">
                                <div className="btn-group pb-3">
                                {/* Own position indicator */}
                                    <button
                                        className="btn btn-outline-secondary without-hover"
                                        title={hasOwnPosition ? ('Aktuelle Position "' + ownPosition + '" wird verwendet.') : 'Aktuelle Position wird nicht verwendet.'}
                                    >
                                        {
                                            hasOwnPosition ?
                                                <HouseFill size={sizeIcon.Button} /> :
                                                <HouseSlashFill size={sizeIcon.Button} />
                                        }&nbsp;
                                        <sup><small>Sortierung</small></sup>
                                    </button>
                                    <button
                                        className={'btn ' + (sort === 'name' ? 'btn-secondary' : 'btn-outline-secondary')}
                                        onClick={() => sortByName(filterConfig)} title="Sortieren nach Name">
                                        <SortAlphaDown size={sizeIcon.Button} /> <sup><small>Name</small></sup>
                                    </button>
                                    {
                                        isCoordinateSearch ?
                                            <button
                                                className={'btn ' + (sort === 'distance' ? 'btn-secondary' : 'btn-outline-secondary')}
                                                onClick={() => sortByDistance(filterConfig)}
                                                title="Sortieren nach Distanz"
                                            >
                                                <SortNumericDown size={sizeIcon.Button}/>&nbsp;
                                                <sup><small>km</small></sup>
                                            </button> :
                                            <button
                                                className={'btn ' + (sort === 'distance-user' ? 'btn-secondary' : 'btn-outline-secondary')}
                                                onClick={() => sortByDistanceUser(filterConfig)}
                                                title="Sortieren nach Distanz vom User"
                                            >
                                                <CursorFill size={sizeIcon.ButtonSmall}/>&nbsp;
                                                <SortNumericDown size={sizeIcon.Button}/>&nbsp;
                                                <sup><small>km</small></sup>
                                            </button>
                                    }
                                    {
                                        isQuerySearch ?
                                            (
                                                isCoordinateSearch ?
                                                    <button
                                                        className={'btn ' + (sort === 'relevance' ? 'btn-secondary' : 'btn-outline-secondary')}
                                                        onClick={() => sortByRelevance(filterConfig)}
                                                        title="Sortieren nach Relevanz"
                                                    >
                                                        <SortDown size={sizeIcon.Button}/> <sup><small>Relevanz</small></sup>
                                                    </button> :
                                                    <button
                                                        className={'btn ' + (sort === 'relevance-user' ? 'btn-secondary' : 'btn-outline-secondary')}
                                                        onClick={() => sortByRelevanceUser(filterConfig)}
                                                        title="Sortieren nach Relevanz vom User"
                                                    >
                                                        <CursorFill size={sizeIcon.ButtonSmall}/>&nbsp;
                                                        <SortDown size={sizeIcon.Button}/>&nbsp;
                                                        <sup><small>Relevanz</small></sup>
                                                    </button>
                                            ) :
                                            <></>
                                    }
                                </div>
                            </div>

                            <div className="clearfix"></div>

                            {
                                numberResults <= 0 ?
                                    <>
                                        <div>
                                            <p>Keine Ergebnisse für "{query}" gefunden.</p>
                                        </div>
                                    </> :
                                    <>
                                        <div>
                                            <p>{numberResults} Ergebnisse für "{query}" gefunden.</p>
                                        </div>

                                        {data.map((location, index) => (
                                            <LocationCard
                                                key={'location-card-' + index}
                                                location={location}
                                                properties={properties}
                                                showOwnPosition={false}
                                            />
                                        ))}
                                    </>
                            }

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

export default Locations;
