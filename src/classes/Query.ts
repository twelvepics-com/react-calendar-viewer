import {TFunction} from "i18next";

/* Import types. */
import {TypeApiProperties, TypeFilterConfig} from "../types/Types";

/* Import configurations. */
import {
    routePathCalendar,
    routePathCalendarPage,
    routePathPhotoSet,
    routePathPhotoSetPage,
    routePathCalendars,
    routePathCountries,
    routePathHome,
    routePathLocation,
    routePathLocations,
    routePathRoot, routePathPhotoSets
} from "../config/Route";
import {
    searchTypeCoordinate,
    searchTypeListWithFeatures
} from "../config/SearchType";
import {
    nameSortName,
    nameSortRelevance,
    nameSortRelevanceUser
} from "../config/NameSort";

/* Import classes. */
import {ApiResponseProperty} from "./Api/ApiResponseProperty";
import {FilterConfig} from "./FilterConfig";
import {formatNumber} from "../functions/I18n";

/* API paths "calendar" */
const apiPathCalendars: string = '/v.json';
const apiPathCalendar: string = '/v/%calendar%.json';
const apiPathCalendarPage: string = '/v/%calendar%/%month%.json';

/* API paths "photo set" */
const apiPathPhotoSets: string = '/pv.json';
const apiPathPhotoSet: string = '/pv/%photo-set%.json';
const apiPathPhotoSetPage: string = '/pv/%photo-set%/%photo%.json';

/* API paths "location" */
const apiPathQuerySearch: string = '/api/v1/location.json';
const apiPathExampleSearch: string = '/api/v1/location/examples.json';
const apiPathCountrySearch: string = '/api/v1/location/countries.json';
const apiPathDetail: string = '/api/v1/location/coordinate.json';

/**
 * Class Query
 *
 * @author Björn Hempel <bjoern@hempel.li>
 * @version 0.1.0 (2024-02-11)
 * @since 0.1.0 (2024-02-11) First version.
 */
class Query
{
    private readonly searchParams: URLSearchParams|null;

    private readonly env: {[index: string]:any}|null;

    private readonly filterConfig: FilterConfig;

    private apiResponseProperty: ApiResponseProperty|null = null;

    /**
     * Query constructor.
     *
     * @param searchParams {URLSearchParams}
     * @param env {{[index: string]:any}|null}
     */
    constructor(
        searchParams: URLSearchParams|null = null,
        env: {[index: string]:any}|null = null
    )
    {
        this.searchParams = searchParams;
        this.env = env;
        this.filterConfig = new FilterConfig(this.searchParams);
    }

    /**
     * Returns the URLSearchParams object.
     */
    getSearchParams(): URLSearchParams|null
    {
        return this.searchParams;
    }

    /**
     * Returns the filter config.
     */
    getFilterConfig(): FilterConfig
    {
        return this.filterConfig;
    }

    /**
     * Returns the filter config.
     */
    getFilterConfigFilterConfig(): TypeFilterConfig
    {
        return this.filterConfig.get();
    }

    /**
     * Resets the filter config to its initial state.
     */
    resetFilterConfig(): void
    {
        this.filterConfig.reset();
    }

    /**
     * Returns the env variable.
     */
    getEnv(): {[index: string]:any}
    {
        if (this.env === null) {
            throw new Error('Can not use getApiType without an environment object.');
        }

        return this.env;
    }



    /**
     * Sets the api response property class.
     *
     * @param apiResponseProperty
     */
    setApiResponseProperty(apiResponseProperty: ApiResponseProperty): void
    {
        this.apiResponseProperty = apiResponseProperty;
    }

    /**
     * Returns the api response property class.
     */
    getApiResponseProperty(): ApiResponseProperty
    {
        if (this.apiResponseProperty === null) {
            throw new Error('The property class must be set before using isCoordinateSearch.');
        }

        return this.apiResponseProperty;
    }



    /**
     * Returns if one of the given sort values is equal to the current sort.
     *
     * @param sort {string|string[]}
     */
    isSortedBy(sort: string|string[]): boolean
    {
        if (typeof sort ==='string') {
            sort = [sort];
        }

        return sort.includes(this.getSortWithDefault());
    }

    /**
     * Returns the query parameter.
     *
     * @return {string}
     */
    getSortWithDefault(): string
    {
        if (this.apiResponseProperty === null) {
            throw new Error('The property class must be set before using isCoordinateSearch.');
        }

        const properties = this.apiResponseProperty.get();

        if (this.filterConfig.hasSort(true)) {
            return this.filterConfig.getSort(true) as string;
        }

        if (!this.filterConfig.hasQuery()) {
            return nameSortName;
        }

        return properties !== null && this.isCoordinateSearch() ? nameSortRelevance : nameSortRelevanceUser;
    }

    /**
     * Returns if at least one coordinate was given
     *
     * @return {boolean}
     */
    isCoordinateSearch(includesOwnPosition: boolean = true): boolean
    {
        if (this.apiResponseProperty === null) {
            throw new Error('The property class must be set before using isCoordinateSearch.');
        }

        let properties: TypeApiProperties = this.apiResponseProperty.get();

        if (
            properties.given &&
            properties.given.query &&
            [searchTypeListWithFeatures, searchTypeCoordinate].includes(properties.given.query.parsed.type)
        ) {
            return true;
        }

        return includesOwnPosition && this.filterConfig.hasCurrentPosition();
    }



    /**
     * Returns the current pathname.
     */
    getPathName(): string
    {
        return window.location.pathname;
    }



    /**
     * Returns the current api query.
     *
     * @returns {string}
     */
    getApiUrl(): string
    {
        switch (window.location.pathname) {
            /* Default api paths. */
            case routePathRoot:
            case routePathHome:
            case routePathCalendars:
                return apiPathCalendars;

            /* Calendar. */
            case routePathCalendar:
                if (!this.filterConfig.hasCalendar()) {
                    throw new Error('Calendar parameter is missing.');
                }

                return apiPathCalendar.replace(
                    '%calendar%', this.filterConfig.getCalendar() as string
                );
            case routePathCalendarPage:
                if (!this.filterConfig.hasCalendar()) {
                    throw new Error('Calendar parameter is missing.');
                }
                if (!this.filterConfig.hasMonth()) {
                    throw new Error('Month parameter is missing.');
                }

                return apiPathCalendarPage.replace(
                    '%calendar%', this.filterConfig.getCalendar() as string
                ).replace(
                    '%month%', this.filterConfig.getMonth() as string
                );

            /* Photo set. */
            case routePathPhotoSet:
                if (!this.filterConfig.hasPhotoSet()) {
                    throw new Error('Photo set parameter is missing.');
                }

                return apiPathPhotoSet.replace(
                    '%photo-set%', this.filterConfig.getPhotoSet() as string
                );
            case routePathPhotoSetPage:
                if (!this.filterConfig.hasPhotoSet()) {
                    throw new Error('Photo set parameter is missing.');
                }
                if (!this.filterConfig.hasPhoto()) {
                    throw new Error('Photo parameter is missing.');
                }

                return apiPathPhotoSetPage.replace(
                    '%photo-set%', this.filterConfig.getPhotoSet() as string
                ).replace(
                    '%photo%', this.filterConfig.getPhoto() as string
                );

            /* Location. */
            case routePathLocation:
                return apiPathDetail;

            /* Locations. */
            case routePathLocations:
                return this.filterConfig.hasQuery() ? apiPathQuerySearch : apiPathExampleSearch;

            /* Countries. */
            case routePathCountries:
                return apiPathCountrySearch;

            /* Unknown path. */
            default:
                throw new Error('Invalid path given (getApiUrl): ' + window.location.pathname);
        }
    }

    /**
     * Returns the current api query with filter.
     *
     * @returns {string}
     */
    getApiUrlWithFilter(): string
    {
        let apiUrl = this.getApiUrl();

        apiUrl += '?' + this.filterConfig.getConvertedFilterQueryString();

        return apiUrl;
    }

    /**
     * Returns with api should be used (the type of the api query).
     *
     * @returns {string}
     */
    getApiType(): string
    {
        if (this.env === null) {
            throw new Error('Can not use getApiType without an environment object.');
        }

        let keyName: string = '';
        let value: string = '';

        switch (window.location.pathname) {
            /* Use the calendar builder api. */
            case routePathRoot:
            case routePathHome:
            /* Calendar. */
            case routePathCalendars:
            case routePathCalendar:
            case routePathCalendarPage:
            /* Photo set. */
            case routePathPhotoSets:
            case routePathPhotoSet:
            case routePathPhotoSetPage:
                keyName = 'REACT_APP_TYPE_CALENDAR_BUILDER'

                if (!this.env.hasOwnProperty(keyName)) {
                    throw new Error(keyName + ' environment variable is missing within the .env file.');
                }

                value = this.env[keyName];

                return value;

            /* Use the location api. */
            case routePathLocation:
            case routePathLocations:
            case routePathCountries:
                keyName = 'REACT_APP_TYPE_LOCATION_API'

                if (!this.env.hasOwnProperty(keyName)) {
                    throw new Error(keyName + ' environment variable is missing within the .env file.');
                }

                value = this.env[keyName];

                return value;

            default:
                throw new Error('Invalid path given (getApiType): ' + window.location.pathname);
        }
    }



    /**
     * Returns the query result text.
     *
     * @param t {TFunction<"translation", undefined>}
     */
    getQueryResultText(t:  TFunction<"translation", undefined>): string
    {
        if (this.apiResponseProperty === null) {
            throw new Error('The property class must be set before using isCoordinateSearch.');
        }

        if (!this.apiResponseProperty.hasResults()) {
            if (!this.filterConfig.hasQuery()) {
                return t('TEXT_NO_RESULT');
            }

            const query = this.filterConfig.getQuery();
            return t('TEXT_NO_RESULT_QUERY', {query});
        }

        if (!this.filterConfig.hasQuery()) {
            const numberTotal = formatNumber(this.apiResponseProperty.getResultsTotal());
            const numberResults = this.apiResponseProperty.getResultsResults();

            return t('TEXT_RESULT', {numberTotal, numberResults});
        }

        const numberTotal = formatNumber(this.apiResponseProperty.getResultsTotal());
        const query = this.filterConfig.getQuery();
        const numberFirstItem = (this.apiResponseProperty.getResultsPage() - 1) * this.apiResponseProperty.getResultsResults() + 1;
        const numberLastItem = this.apiResponseProperty.getResultsResults() * this.apiResponseProperty.getResultsPage();

        return t('TEXT_RESULT_QUERY', {numberTotal, query, numberFirstItem, numberLastItem});
    }
}

/*
 * Export functions.
 */
export {
    Query
}
