import React from "react";
import {useTranslation} from "react-i18next";

/* Add configurations */
import {sizeIcon} from "../../config/Config";

/* Import types */
import {TypeSearchTypeTranslation} from "../../types/Types";

/* Import classes */
import {ApiResponseProperty} from "../../classes/Api/ApiResponseProperty";

/* Import translations */
import {searchTypeTranslation} from "../../translations/SearchType";

/* Bootstrap icons; see https://icons.getbootstrap.com/?q=sort#usage */
import {GraphUp, HouseFill} from "react-bootstrap-icons";

/* Add component parts */
import LocationCard from "./LocationCard";

type SearchMetricsProps = {
    apiResponseProperty: ApiResponseProperty
}

/**
 * This renders the search metrics part.
 */
const SearchMetrics = ({
    apiResponseProperty
}: SearchMetricsProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    const properties = apiResponseProperty.get();

    /* Debugging */
    let isParsedQueryExpanded = false;
    let isCurrentPositionExpanded = false;

    return (
        <>
            {
                apiResponseProperty.hasGivenQuery() || apiResponseProperty.isOwnPosition() ?
                    <>
                        <div className="float-end pb-3">
                            <div className="btn-group shadow-own">
                                {
                                    apiResponseProperty.hasGivenQuery() ?
                                        <button
                                            className="btn btn-outline-secondary"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#parsedQuery"
                                        >
                                            <GraphUp size={sizeIcon.Button}/> <sup><small>{t('TEXT_ACTION_SHOW_SEARCH_METRICS')}</small></sup>
                                        </button> :
                                        <></>
                                }
                                {
                                    apiResponseProperty.isOwnPosition() ?
                                        <button
                                            className="btn btn-outline-secondary"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#currentPosition"
                                        >
                                            <HouseFill size={sizeIcon.Button}/> <sup><small>{t('TEXT_ACTION_SHOW_CURRENT_POSITION')}</small></sup>
                                        </button> :
                                        <></>
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div id="accordion">
                            {
                                apiResponseProperty.hasGivenQuery() ?
                                    <>
                                        <div
                                            className={'collapse multi-collapse' + (isParsedQueryExpanded ? ' show' : '')}
                                            data-bs-parent="#accordion"
                                            id="parsedQuery"
                                        >
                                            <h3 className="mt-3"><GraphUp size={sizeIcon.H3}/> Such-Metriken</h3>
                                            <div className="card card-hover mb-4"
                                                 style={{'backgroundColor': 'rgb(233, 235, 228)'}}>
                                                <div className="card-header">
                                                        <span className="fw-bold"><GraphUp size={sizeIcon.Caption}/>&nbsp;
                                                            {searchTypeTranslation[apiResponseProperty.getGivenQueryParsedType() as keyof TypeSearchTypeTranslation] ?? 'Unbekannte Suche "' + apiResponseProperty.getGivenQueryParsedType() + '"'}
                                                        </span>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        apiResponseProperty.hasGivenQueryParsedSearch() ?
                                                            <>
                                                                <p className="mb-0">
                                                                    <strong>Suchbegriff</strong>: {apiResponseProperty.getGivenQueryParsedSearch()}
                                                                </p>
                                                            </> :
                                                            <></>
                                                    }
                                                    {
                                                        apiResponseProperty.hasGivenCoordinate() ?
                                                            <>
                                                                <p className="mb-0">
                                                                    <strong>Position</strong>: {apiResponseProperty.getGivenCoordinateParsedLatitudeDms()}, {apiResponseProperty.getGivenCoordinateParsedLongitudeDms()}
                                                                </p>
                                                            </> :
                                                            <></>
                                                    }
                                                    {
                                                        apiResponseProperty.hasGivenQueryParsedGeonameId() ?
                                                            <>
                                                                <p className="mb-0">
                                                                    <strong>Geoname-ID</strong>: {apiResponseProperty.getGivenQueryParsedGeonameId()}
                                                                </p>
                                                            </> :
                                                            <></>
                                                    }
                                                    {
                                                        apiResponseProperty.hasGivenQueryParsedFeatureCodes() ?
                                                            <>
                                                                <p className="mb-0">
                                                                    <strong>Feature-Codes</strong>
                                                                </p>
                                                                <ul className="mb-0">
                                                                    {apiResponseProperty.getGivenQueryParsedFeatureCodesArray().map((item, index) => (
                                                                        <li key={'feature-code-' + item.code}>
                                                                            {item.code}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </> :
                                                            <></>
                                                    }
                                                </div>
                                                <div className="card-footer">
                                                    <small><small>
                                                        <strong>Query</strong>: <span
                                                        className="fst-italic">"{apiResponseProperty.getGivenQueryRaw()}"</span>
                                                        <br/>
                                                        <strong>Performance</strong>: {properties['time-taken']}, {properties['memory-taken']}
                                                        <br/>
                                                        <strong>{properties['name']}</strong>: Version {properties['version']}
                                                    </small></small>
                                                </div>
                                            </div>
                                        </div>
                                    </> :
                                    <></>
                            }
                            {
                                apiResponseProperty.isOwnPosition() ?
                                    <>
                                        <div
                                            className={'collapse multi-collapse' + (isCurrentPositionExpanded ? ' show' : '')}
                                            data-bs-parent="#accordion"
                                            id="currentPosition"
                                        >
                                            <h3 className="mt-3">{t('TEXT_HEADER_CURRENT_LOCATION')}</h3>
                                            <LocationCard
                                                location={apiResponseProperty.getGiven()?.getCoordinate()?.getLocation()}
                                                properties={properties}
                                                showOwnPosition={true}
                                            />
                                        </div>
                                    </> :
                                    ''
                            }
                        </div>
                    </> :
                    <></>
            }
        </>
    );
}

export default SearchMetrics;
