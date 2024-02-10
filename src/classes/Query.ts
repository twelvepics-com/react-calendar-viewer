/* Import types. */
import {TypeFilterConfig} from "../types/Types";
import {searchTypeCoordinate, searchTypeListWithFeatures} from "../functions/SearchType";

/* Routing paths */
const reactPathHome: string = '/index.html';
const reactPathCalendars: string = '/index.html';
const reactPathCalendar: string = '/calendar.html';
const reactPathCalendarPage: string = '/page.html';
const reactPathLocations: string = '/locations.html';
const reactPathLocation: string = '/location.html';

/* API paths */
const apiPathCalendars: string = '/v.json';
const apiPathCalendarPage: string = '/v/%calendar%/%month%.json';
const apiPathCalendar: string = '/v/%calendar%.json';
const apiPathQuerySearch: string = '/api/v1/location.json';
const apiPathExampleSearch: string = '/api/v1/location/examples.json';
const apiPathDetail: string = '/api/v1/location/coordinate.json';

/* Parameter names */
const nameParameterMonth: 'm' = 'm';
const nameParameterCalendar: 'c' = 'c';
const nameParameterQuery: 'q' = 'q';
const nameParameterCurrentPosition: 'p' = 'p';
const nameParameterCountry: 'country' = 'country';
const nameParameterLanguage: 'language' = 'language';
const nameParameterDistance: 'distance' = 'distance';
const nameParameterLimit: 'limit' = 'limit';
const nameParameterPage: 'page' = 'page';
const nameParameterSort: 's' = 's';
const nameParameterNextPlaces: 'next_places' = 'next_places';

/* Sort names */
const nameSortDistance: 'distance' = 'distance';
const nameSortDistanceUser: 'distance-user' = 'distance-user';
const nameSortRelevance: 'relevance' ='relevance';
const nameSortRelevanceUser: 'relevance-user' ='relevance-user';
const nameSortName: 'name' = 'name';

/* Countries */
const countryDe: string = 'DE';

/* Languages */
const languageDe: string = 'de';

class Query
{
    private readonly searchParams: URLSearchParams|null;

    private readonly env: {[index: string]:any}|null;

    private filterConfig: TypeFilterConfig = {};

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

        this.setFilterConfigBySearchParams();
    }

    /**
     * Returns the filter configuration from the search parameters.
     *
     * @returns {TypeFilterConfig}
     */
    setFilterConfigBySearchParams = (): void =>
    {
        this.filterConfig = {};

        if (this.searchParams === null) {
            return;
        }

        const calendar: string|null = this.searchParams.get(nameParameterCalendar);
        const month: string|null = this.searchParams.get(nameParameterMonth);
        const query: string|null = this.searchParams.get(nameParameterQuery);
        const currentPosition: string|null = this.searchParams.get(nameParameterCurrentPosition);
        const country: string|null = this.searchParams.get(nameParameterCountry);
        const language: string|null = this.searchParams.get(nameParameterLanguage);
        const distance: string|null = this.searchParams.get(nameParameterDistance);
        const limit: string|null = this.searchParams.get(nameParameterLimit);
        const page: string|null = this.searchParams.get(nameParameterPage);
        const sort: string|null = this.searchParams.get(nameParameterSort);
        const nextPlaces: string|null = this.searchParams.get(nameParameterNextPlaces);

        /* Add calendar parameter. */
        calendar && (this.filterConfig[nameParameterCalendar] = calendar);

        /* Add month parameter. */
        month && (this.filterConfig[nameParameterMonth] = month);

        /* Add parameter "q". */
        query && (this.filterConfig[nameParameterQuery] = query);

        /* Add parameter "c". */
        currentPosition && (this.filterConfig[nameParameterCurrentPosition] = currentPosition);

        /* Add parameter "distance". */
        distance && (this.filterConfig[nameParameterDistance] = distance);

        /* Add parameter "limit". */
        limit && (this.filterConfig[nameParameterLimit] = limit);

        /* Add parameter "limit". */
        page && (this.filterConfig[nameParameterPage] = page);

        /* Add parameter "sort". */
        sort && (this.filterConfig[nameParameterSort] = sort);

        /* Add parameter "country". */
        this.filterConfig[nameParameterCountry] = (country ? country : countryDe);

        /* Add parameter "language". */
        this.filterConfig[nameParameterLanguage] = (language? language : languageDe);

        /* Add parameter "next_places". */
        nextPlaces && (this.filterConfig[nameParameterNextPlaces] = '1');
    };

    /**
     * Returns the current api query.
     *
     * @returns {string}
     */
    getApiUrl(): string
    {
        switch (window.location.pathname) {
            /* Default api paths. */
            case reactPathHome:
            case reactPathCalendars:
                return apiPathCalendars;

            /* Calendar page. */
            case reactPathCalendarPage:
                if (!this.filterConfig[nameParameterCalendar]) {
                    throw new Error('Calendar parameter is missing.');
                }
                if (!this.filterConfig[nameParameterMonth]) {
                    throw new Error('Month parameter is missing.');
                }

                return apiPathCalendarPage.
                    replace('%calendar%', this.filterConfig[nameParameterCalendar]).
                    replace('%month%', this.filterConfig[nameParameterMonth]);

            /* Calendar. */
            case reactPathCalendar:
                if (!this.filterConfig[nameParameterCalendar]) {
                    throw new Error('Calendar parameter is missing.');
                }

                return apiPathCalendar.
                    replace('%calendar%', this.filterConfig[nameParameterCalendar]);

            /* Location. */
            case reactPathLocation:
                return apiPathDetail;

            /* Locations. */
            case reactPathLocations:
                return this.isQuerySearch() ? apiPathQuerySearch : apiPathExampleSearch;

            /* Unknown path. */
            default:
                throw new Error('Invalid path given: ' + window.location.pathname);
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

        return apiUrl += '?' + this.getConvertedFilterQueryString();
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
            case reactPathHome:
            case reactPathCalendars:
            case reactPathCalendar:
            case reactPathCalendarPage:
                keyName = 'REACT_APP_TYPE_CALENDAR_BUILDER'

                if (!this.env.hasOwnProperty(keyName)) {
                    throw new Error(keyName + ' environment variable is missing within the .env file.');
                }

                value = this.env[keyName];

                return value;

            /* Use the location api. */
            case reactPathLocation:
            case reactPathLocations:
                keyName = 'REACT_APP_TYPE_LOCATION_API'

                if (!this.env.hasOwnProperty(keyName)) {
                    throw new Error(keyName + ' environment variable is missing within the .env file.');
                }

                value = this.env[keyName];

                return value;

            default:
                throw new Error('Invalid path given: ' + window.location.pathname);
        }
    }

    /**
     * Returns the query parameter.
     */
    getQuery = (): string|null =>
    {
        return this.filterConfig[nameParameterQuery] ?? null;
    }

    /**
     * Returns the query parameter.
     */
    getSort = (properties: any = null): string =>
    {
        if (this.filterConfig[nameParameterSort]) {
            return this.filterConfig[nameParameterSort];
        }

        if (!this.isQuerySearch()) {
            return nameSortName;
        }

        return properties !== null && this.isCoordinateSearch(properties) ? nameSortRelevance : nameSortRelevanceUser;
    }

    /**
     * Returns if the query filter was given.
     *
     * @returns {boolean}
     */
    isQuerySearch = (): boolean =>
    {
        return !!this.filterConfig[nameParameterQuery];
    }

    /**
     * Returns if the sort filter was given.
     *
     * @returns {boolean}
     */
    isSortSearch = (): boolean =>
    {
        return !!this.filterConfig[nameParameterSort];
    }

    /**
     * Returns if the current position filter was given.
     *
     * @returns {boolean}
     */
    isCurrentPositionSearch = (): boolean =>
    {
        return !!this.filterConfig[nameParameterCurrentPosition];
    }

    /**
     * Returns if at least one coordinate was given
     *
     * @param {any} properties
     */
    isCoordinateSearch = (properties: any): boolean =>
    {
        let hasQuery = properties.given && properties.given.query;

        if (hasQuery && [searchTypeListWithFeatures, searchTypeCoordinate].includes(properties.given.query.parsed.type)) {
            return true;
        }

        if (!!this.filterConfig[nameParameterCurrentPosition]) {
            return true;
        }

        return false;
    }

    /**
     * Converts the filter configuration into a query string.
     *
     * @return string
     */
    getConvertedFilterQueryString = (): string =>
    {
        const keyValuePairs = [];

        for (let key in this.filterConfig) {
            let value: string | null = this.filterConfig[key as keyof TypeFilterConfig] ?? null;

            if (value === null) {
                continue;
            }

            keyValuePairs.push(key + '=' + encodeURIComponent(value));
        }

        return keyValuePairs.join('&');
    }
}

/*
 * Export functions.
 */
export {
    Query
}