import i18n from "i18next";
import {To} from "react-router-dom";

/* Import types. */
import {TypeFilterConfig} from "../types/Types";

/* Import configurations. */
import {
    nameParameterCalendar,
    nameParameterCountry,
    nameParameterPhotoSet,
    nameParameterPhoto,
    nameParameterCurrentPosition,
    nameParameterDistance,
    nameParameterLanguage,
    nameParameterLimit,
    nameParameterMonth,
    nameParameterNextPlaces,
    nameParameterPage,
    nameParameterQuery,
    nameParameterSort
} from "../config/NameParameter";
import {countryDefault} from "../config/Country";
import {languageDE, languageDefault} from "../config/Language";
import {routePathCountries, routePathLocation, routePathLocations} from "../config/Route";

/* Import classes. */
import {NextPlaceWrapper} from "./Api/Location/Location/NextPlaces/NextPlaceWrapper";
import {LocationWrapper} from "./Api/Location/Location/LocationWrapper";
import {
    nameSortDistance,
    nameSortDistanceUser,
    nameSortName,
    nameSortRelevance,
    nameSortRelevanceUser
} from "../config/NameSort";


/**
 * Class FilterConfig
 *
 * @author Björn Hempel <bjoern@hempel.li>
 * @version 0.1.0 (2024-02-12)
 * @since 0.1.0 (2024-02-12) First version.
 */
class FilterConfig
{
    private filterConfig: TypeFilterConfig = {};

    /* The initialized filter configuration, to avoid parsing the query parameters if needed. */
    private readonly filterConfigInit: TypeFilterConfig = {};

    private doNotResetOrClear: boolean = false;

    /**
     * FilterConfig constructor.
     */
    constructor(init: TypeFilterConfig|URLSearchParams|null = null)
    {
        /* URLSearchParams instance was given. */
        if (init instanceof URLSearchParams) {
            this.setBySearchParams(init);

        /* TypeFilterConfig was given. */
        } else if (init !== null) {
            this.set(init);
        }

        /* Deep copy of the filter configuration. */
        this.filterConfigInit = JSON.parse(JSON.stringify(this.filterConfig));
    }

    /**
     * Sets the filter config directly.
     *
     * @param filterConfig
     */
    set(filterConfig: TypeFilterConfig): void
    {
        this.filterConfig = filterConfig;
    }

    /**
     * Sets the filter config by given to link.
     *
     * @param link
     */
    setByLink(link: To)
    {
        const url = new URL(this.getFullQualifiedLink(link));

        this.setBySearchParams(url.searchParams);
    }

    /**
     * Sets the filter config by given search params.
     *
     * @returns {TypeFilterConfig}
     */
    setBySearchParams(searchParams: URLSearchParams): void
    {
        this.filterConfig = {};

        /* Calendar */
        const calendar: string|null = searchParams.get(nameParameterCalendar);
        const month: string|null = searchParams.get(nameParameterMonth);

        /* Photo set */
        const photoSet: string|null = searchParams.get(nameParameterPhotoSet);
        const photo: string|null = searchParams.get(nameParameterPhoto);

        /* Other */
        const query: string|null = searchParams.get(nameParameterQuery);
        const currentPosition: string|null = searchParams.get(nameParameterCurrentPosition);
        const country: string|null = searchParams.get(nameParameterCountry);
        const language: string|null = searchParams.get(nameParameterLanguage);
        const distance: string|null = searchParams.get(nameParameterDistance);
        const limit: string|null = searchParams.get(nameParameterLimit);
        const page: string|null = searchParams.get(nameParameterPage);
        const sort: string|null = searchParams.get(nameParameterSort);
        const nextPlaces: string|null = searchParams.get(nameParameterNextPlaces);

        /* Add calendar parameter. */
        calendar && this.setCalendar(calendar);

        /* Add month parameter. */
        month && this.setMonth(month);

        /* Add photo set parameter. */
        photoSet && this.setPhotoSet(photoSet);

        /* Add photo parameter. */
        photo && this.setPhoto(photo);

        /* Add parameter "q". */
        query && this.setQuery(query);

        /* Add parameter "c". */
        currentPosition && this.setCurrentPosition(currentPosition);

        /* Add parameter "distance". */
        distance && this.setDistance(distance);

        /* Add parameter "limit". */
        limit && this.setLimit(limit);

        /* Add parameter "limit". */
        page && this.setPage(page);

        /* Add parameter "sort". */
        sort && this.setSort(sort);

        /* Add parameter "country". */
        this.setCountry(country ? country : countryDefault);

        /* Add parameter "language". */
        this.setLanguage(language ? language : languageDefault);

        /* Add parameter "next_places". */
        nextPlaces && this.setNextPlaces(true);
    };

    /**
     * Add filter config, given by parameter.
     *
     * @param filterConfig
     */
    addByFilterConfig(filterConfig: TypeFilterConfig): void
    {
        /* Calendar */
        const calendar: string|null = filterConfig.c ?? null;
        const month: string|null = filterConfig.m ?? null;

        /* PhotoSet */
        const photoSet: string|null = filterConfig.ps ?? null;
        const photo: string|null = filterConfig.i ?? null;

        /* Other */
        const query: string|null = filterConfig.q ?? null;
        const currentPosition: string|null = filterConfig.p ?? null;
        const country: string|null = filterConfig.country ?? null;
        const language: string|null = filterConfig.language ?? null;
        const distance: string|null = filterConfig.distance ?? null;
        const limit: string|null = filterConfig.limit ?? null;
        const page: string|null = filterConfig.page ?? null;
        const sort: string|null = filterConfig.s ?? null;
        const nextPlaces: string|null = filterConfig.next_places ?? null;

        /* Add calendar parameter. */
        calendar && this.setCalendar(calendar);

        /* Add month parameter. */
        month && this.setMonth(month);

        /* Add photo set parameter. */
        photoSet && this.setPhotoSet(photoSet);

        /* Add photo parameter. */
        photo && this.setPhoto(photo);

        /* Add parameter "q". */
        query && this.setQuery(query);

        /* Add parameter "c". */
        currentPosition && this.setCurrentPosition(currentPosition);

        /* Add parameter "distance". */
        distance && this.setDistance(distance);

        /* Add parameter "limit". */
        limit && this.setLimit(limit);

        /* Add parameter "limit". */
        page && this.setPage(page);

        /* Add parameter "sort". */
        sort && this.setSort(sort);

        /* Add parameter "country". */
        country && this.setCountry(country);

        /* Add parameter "language". */
        language && this.setLanguage(language);

        /* Add parameter "next_places". */
        nextPlaces && this.setNextPlaces(true);
    }

    /**
     * Returns the filter configuration.
     */
    get(): TypeFilterConfig
    {
        return this.filterConfig;
    }

    /**
     * Returns the filter configuration.
     */
    getInit(): TypeFilterConfig
    {
        return this.filterConfigInit;
    }

    /**
     * Resets the filter configuration to its initial state.
     */
    reset(): void
    {
        if (this.isDoNotResetOrClear()) {
            this.doNotResetOrClear = false;
            return;
        }

        this.filterConfig = JSON.parse(JSON.stringify(this.filterConfigInit));
    }

    /**
     * Clears the filter config.
     */
    clear(): void
    {
        if (this.isDoNotResetOrClear()) {
            this.doNotResetOrClear = false;
            return;
        }

        this.filterConfig = {};
    }

    /**
     * Sets if the next clear or reset call should be ignored.
     *
     * @param doNotResetOrClear
     */
    setDoNotResetOrClear(doNotResetOrClear: boolean|null = null): void
    {
        if (doNotResetOrClear === null) {
            this.doNotResetOrClear = true;
            return;
        }

        this.doNotResetOrClear = doNotResetOrClear;
    }

    /**
     * Returns if the next clear or reset call should be ignored.
     */
    isDoNotResetOrClear(): boolean
    {
        return this.doNotResetOrClear;
    }

    /**
     * Returns the fully qualified link to given to link.
     *
     * @param link
     */
    getFullQualifiedLink(link: To): string
    {
        link = link.toString();

        if (link.startsWith('http')) {
            return link;
        }

        if (link.startsWith('/')) {
            return window.location.origin + link;
        }

        return window.location.origin + '/' + link;
    }

    /**
     * Returns the pathname of given to link.
     *
     * @param link
     */
    getPathname(link: To): string
    {
        const url = new URL(this.getFullQualifiedLink(link));

        return url.pathname;
    }



    /**
     * Sets the calendar filter config (c).
     *
     * @param calendar
     */
    setCalendar(calendar: string): void
    {
        this.filterConfig[nameParameterCalendar] = calendar;
    }

    /**
     * Returns if the calendar filter config was set (m).
     *
     * @return {boolean}
     */
    hasCalendar(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterCalendar];
    }

    /**
     * Returns the calendar filter config (c).
     */
    getCalendar(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterCalendar] ?? null;
    }

    /**
     * Sets the month filter config (m).
     *
     * @param month
     */
    setMonth(month: string): void
    {
        this.filterConfig[nameParameterMonth] = month;
    }

    /**
     * Returns if the month filter config was set (m).
     *
     * @return {boolean}
     */
    hasMonth(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterMonth];
    }

    /**
     * Returns the month filter config (m).
     */
    getMonth(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterMonth] ?? null;
    }

    /**
     * Sets the photo set filter config (ps).
     *
     * @param photoSet
     */
    setPhotoSet(photoSet: string): void
    {
        this.filterConfig[nameParameterPhotoSet] = photoSet;
    }

    /**
     * Returns if the photo set filter config was set (ps).
     *
     * @return {boolean}
     */
    hasPhotoSet(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterPhotoSet];
    }

    /**
     * Returns the photo set filter config (ps).
     */
    getPhotoSet(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterPhotoSet] ?? null;
    }

    /**
     * Sets the photo filter config (i).
     *
     * @param photo
     */
    setPhoto(photo: string): void
    {
        this.filterConfig[nameParameterPhoto] = photo;
    }

    /**
     * Returns if the photo filter config was set (i).
     *
     * @return {boolean}
     */
    hasPhoto(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterPhoto];
    }

    /**
     * Returns the photo filter config (i).
     */
    getPhoto(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterPhoto] ?? null;
    }

    /**
     * Sets the country filter config (q).
     *
     * @param query
     */
    setQuery(query: string): void
    {
        this.filterConfig[nameParameterQuery] = query;
    }

    /**
     * Returns if the query filter config was set (q).
     *
     * @return {boolean}
     */
    hasQuery(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterQuery];
    }

    /**
     * Returns the query filter config (q).
     *
     * @return {string|null}
     */
    getQuery(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterQuery] ?? null;
    }

    /**
     * Sets the current position filter config (p).
     *
     * @param currentPosition
     */
    setCurrentPosition(currentPosition: string): void
    {
        this.filterConfig[nameParameterCurrentPosition] = currentPosition;
    }

    /**
     * Returns if the current position filter config was set (p).
     *
     * @return {boolean}
     */
    hasCurrentPosition(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterCurrentPosition];
    }

    /**
     * Returns the current position filter config (p).
     *
     * @return {string|null}
     */
    getCurrentPosition(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterCurrentPosition] ?? null;
    }

    /**
     * Sets the distance filter config (distance).
     *
     * @param distance
     */
    setDistance(distance: string): void
    {
        this.filterConfig[nameParameterDistance] = distance;
    }

    /**
     * Returns if the distance filter config was set (distance).
     *
     * @return {boolean}
     */
    hasDistance(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterDistance];
    }

    /**
     * Returns the distance filter config (distance).
     *
     * @return {string|null}
     */
    getDistance(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterDistance] ?? null;
    }

    /**
     * Sets the limit filter config (limit).
     *
     * @param limit
     */
    setLimit(limit: string): void
    {
        this.filterConfig[nameParameterLimit] = limit;
    }

    /**
     * Returns if the limit filter config was set (limit).
     *
     * @return {boolean}
     */
    hasLimit(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterLimit];
    }

    /**
     * Returns the limit filter config (limit).
     *
     * @return {string|null}
     */
    getLimit(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterLimit] ?? null;
    }

    /**
     * Sets the page filter config (limit).
     *
     * @param page
     */
    setPage(page: string): void
    {
        this.filterConfig[nameParameterPage] = page;
    }

    /**
     * Returns if the page filter config was set (limit).
     *
     * @return {boolean}
     */
    hasPage(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterPage];
    }

    /**
     * Returns the page filter config (limit).
     *
     * @return {string|null}
     */
    getPage(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterPage] ?? null;
    }

    /**
     * Sets the page filter config (s).
     *
     * @param sort
     * @return FilterConfig
     */
    setSort(sort: string): FilterConfig
    {
        this.filterConfig[nameParameterSort] = sort;

        return this;
    }

    /**
     * Returns if the page filter config was set (s).
     *
     * @return {boolean}
     */
    hasSort(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterSort];
    }

    /**
     * Returns the page filter config (s).
     *
     * @return {string|null}
     */
    getSort(init: boolean = false): string|null
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterSort] ?? null;
    }

    /**
     * Sets the country filter config (country).
     *
     * @param country
     */
    setCountry(country: string): void
    {
        this.filterConfig[nameParameterCountry] = country;
    }

    /**
     * Returns if the country filter config was set (country).
     *
     * @return {boolean}
     */
    hasCountry(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterCountry];
    }

    /**
     * Returns the country filter config (country).
     *
     * @return {string}
     */
    getCountry(init: boolean = false): string
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterCountry] ?? countryDefault;
    }

    /**
     * Sets the language filter config (language).
     *
     * @param language
     */
    setLanguage(language: string): void
    {
        this.filterConfig[nameParameterLanguage] = language;
    }

    /**
     * Returns if the language filter config was set (language).
     *
     * @return {boolean}
     */
    hasLanguage(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterLanguage];
    }

    /**
     * Returns the language filter config (language).
     *
     * @return {string}
     */
    getLanguage(init: boolean = false): string
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return value[nameParameterLanguage] ?? languageDE;
    }

    /**
     * Sets the next places filter config (next_places).
     *
     * @param nextPlaces
     */
    setNextPlaces(nextPlaces: boolean): void
    {
        if (nextPlaces) {
            this.filterConfig[nameParameterNextPlaces] = '1';
            return;
        }

        delete this.filterConfig[nameParameterNextPlaces];
    }

    /**
     * Returns if the next places filter config was set (next_places).
     *
     * @return {boolean}
     */
    hasNextPlaces(init: boolean = false): boolean
    {
        const value = init ? this.filterConfigInit : this.filterConfig;

        return !!value[nameParameterNextPlaces];
    }

    /**
     * Returns the next places filter config (next_places).
     *
     * @return {string}
     */
    getNextPlaces(init: boolean = false): boolean
    {
        return this.hasNextPlaces(init);
    }

    /**
     * Converts the filter configuration into a query string.
     *
     * @param ignoreDefaultLocale {boolean}
     * @return string
     */
    getConvertedFilterQueryString(ignoreDefaultLocale: boolean = false): string
    {
        const keyValuePairs = [];

        for (let key in this.filterConfig) {
            let value: string | null = this.filterConfig[key as keyof TypeFilterConfig] ?? null;

            if (value === null) {
                continue;
            }

            if (ignoreDefaultLocale && key === 'language' && value === languageDefault) {
                continue;
            }

            if (ignoreDefaultLocale && key === 'country' && value === countryDefault) {
                continue;
            }

            keyValuePairs.push(key + '=' + encodeURIComponent(value));
        }

        return keyValuePairs.join('&');
    }



    /**
     * Returns the country by language.
     *
     * @param language
     */
    getCountryByLanguage(language: string): string
    {
        switch (language) {
            case 'de':
                return 'DE';
            case 'en':
                return 'US';
            case 'es':
                return 'ES';
            default:
                return 'DE';
        }
    }

    /**
     * Adds current language and country to the query string.
     */
    addLanguageAndCountry(
        language: string|null = null,
        country: string|null = null,
    ): void
    {
        this.setLanguage(language ?? i18n.language);
        this.setCountry(country ?? this.getCountryByLanguage(this.getLanguage()));
    }



    /**
     * Builds
     *
     * @param pathname
     * @param ignoreDefaultLocale {boolean}
     */
    getLinkFullConverted(pathname: string|null = null, ignoreDefaultLocale: boolean = false): string
    {
        /* User current pathname if no one was given. */
        pathname = pathname ?? window.location.pathname;

        const separator = pathname !== null && pathname.includes('?') ? '&' : '?';

        return pathname + separator + this.getConvertedFilterQueryString(ignoreDefaultLocale);
    }

    /**
     * Returns link to given pathname including current language and country.
     *
     * @param pathname
     */
    getLinkTo(pathname: string): string
    {
        this.clear();
        this.addLanguageAndCountry();
        return this.getLinkFullConverted(pathname, true);
    }

    /**
     * Returns the current link.
     */
    getLinkCurrent(filterConfig: TypeFilterConfig|null = null): string
    {
        this.reset();

        if (filterConfig !== null) {
            this.addByFilterConfig(filterConfig);
        }

        return this.getLinkFullConverted(null, true);
    }

    /**
     * Returns the current link including given language and country code.
     *
     * @param language
     * @param country
     */
    getLinkCurrentByLanguage(
        language: string|null = null,
        country: string|null = null,
    ): string
    {
        this.reset();
        this.addLanguageAndCountry(language, country);
        return this.getLinkFullConverted(null, true);
    }

    /**
     * Returns the location path.
     */
    getPathLocations(): string
    {
        switch (window.location.pathname) {
            case routePathCountries:
                return routePathCountries;

            default:
                return routePathLocations;
        }
    }

    /**
     * Returns the location detail link by current location.
     */
    getLinkLocationCurrent(): string
    {
        this.reset();

        this.setNextPlaces(true);

        return this.getLinkFullConverted(routePathLocation, true);
    }

    /**
     * Returns the location detail link by given query.
     *
     * @param query
     */
    getLinkLocationQuery(query: string): string
    {
        this.reset();

        const ownPosition = this.getCurrentPosition();

        this.clear();
        this.setQuery(query);
        this.setNextPlaces(true);
        this.setLanguage(i18n.language);
        this.setCountry(this.getCountryByLanguage(this.getLanguage()));

        if (ownPosition !== null) {
            this.setCurrentPosition(ownPosition);
        }

        return this.getLinkFullConverted(routePathLocation, true);
    }

    /**
     * Returns the location list link given by sort value.
     *
     * @param sort
     */
    getLinkLocations(sort: string|null = null): string
    {
        this.reset();

        if (sort !== null) {
            this.setSort(sort);
        }

        this.setPage('1');

        return this.getLinkFullConverted(this.getPathLocations(), true);
    }

    /**
     * Returns the location list link by distance.
     */
    getLinkLocationsSortByDistance(): string
    {
        return this.getLinkLocations(nameSortDistance);
    }

    /**
     * Returns the location list link by distance user.
     */
    getLinkLocationsSortByDistanceUser(): string
    {
        return this.getLinkLocations(nameSortDistanceUser);
    }

    /**
     * Returns the location list link by name.
     */
    getLinkLocationsSortByName(): string
    {
        return this.getLinkLocations(nameSortName);
    }

    /**
     * Returns the location list link by relevance.
     */
    getLinkLocationsSortByRelevance(): string
    {
        return this.getLinkLocations(nameSortRelevance);
    }

    /**
     * Returns the location list link by relevance user.
     */
    getLinkLocationsSortByRelevanceUser(): string
    {
        return this.getLinkLocations(nameSortRelevanceUser);
    }

    /**
     * Returns the link to next places by next places config from the current location.
     */
    getLinkNextListPlacesByNextPlacesConfig(
        locationWrapper: LocationWrapper,
        key: string,
    ): string
    {
        this.reset();

        const nextPlacesConfig = locationWrapper.getNextPlacesConfig();

        const query: string =
            (nextPlacesConfig.getConfigByNexPlaceFeatureCodes(key, '|') ?? '') + ' ' +
            locationWrapper.getCoordinate().getDecimal();
        const distance: number = nextPlacesConfig.getConfigByNexPlaceDistance(key) ?? 0;
        const limit: number = nextPlacesConfig.getConfigByNexPlaceLimit(key) ?? 0;

        const language = i18n.language;
        const country = this.getCountryByLanguage(language);

        const ownPosition = this.getCurrentPosition();

        this.clear();
        this.setQuery(query);
        this.setDistance(distance.toString());
        this.setLimit(limit.toString());
        this.setLanguage(language);
        this.setCountry(country);

        if (ownPosition !== null) {
            this.setCurrentPosition(ownPosition);
        }

        return this.getLinkFullConverted(routePathLocations, true);
    }

    /**
     * Returns the next places list by location or coordinate.
     *
     * @param nextPlace
     */
    getLinkNextPlacesList(
        nextPlace: NextPlaceWrapper
    ): string
    {
        this.reset();

        const coordinate = nextPlace.getConfigCoordinateDecimal();
        const featureClass = nextPlace.getFeatureClassCode();
        const distance = nextPlace.getConfigDistanceMeter();
        const limit = nextPlace.getConfigLimitation();

        switch (nextPlace.getConfigCoordinateType()) {
            case 'location':
                this.setQuery(featureClass + ' ' + coordinate);
                this.setDistance(distance.toString());
                this.setLimit(limit.toString());
                this.setNextPlaces(true);
                break;

            case 'coordinate':
                this.setQuery(featureClass + ' ' + this.getQuery());
                this.setDistance(distance.toString());
                this.setLimit(limit.toString());
                this.setNextPlaces(true);
                break;

            default:
                throw new Error('Unsupported coordinate type: ' + nextPlace.getConfigCoordinateType());
        }

        return this.getLinkFullConverted(routePathLocations, true);
    }

    /**
     * Returns the next places link with the given page number.
     */
    getLinkNextPlacesPage(page: number): string
    {
        this.reset();

        this.setPage(page.toString());

        this.setDoNotResetOrClear();
        return this.getLinkCurrent();
    }


    /**
     * Returns if the query contains a geoname id.
     *
     * Examples:
     * ---------
     * - "6543921"
     * - etc.
     *
     * @param query
     */
    hasQueryGeonameId(query: string): boolean
    {
        const regexp: RegExp = /^([0-9]{4,8})$/;

        let match: RegExpMatchArray|null = regexp.exec(query);

        return match !== null;
    }

    /**
     * Returns if the query contains a decimal coordinate.
     *
     * Examples:
     * ---------
     * - "51.061155,13.740668"
     * - "51.061155, 13.740668"
     * - "51.061155 13.740668"
     * - etc.
     *
     * @param query
     */
    hasQueryCoordinateDecimal(query: string): boolean
    {
        const regexp: RegExp = /^(-?[0-9]+).([0-9]+)([ ,]+)(-?[0-9]+).([0-9]+)$/;

        let match: RegExpMatchArray|null = regexp.exec(query);

        return match !== null;
    }

    /**
     * Returns if the query contains a dms coordinate.
     *
     * Examples:
     * ---------
     * - "52°31′14.322″N,13°24′35.2044″E"
     * - "52°31′14.322″N, 13°24′35.2044″E"
     * - "52°31′14.322″N 13°24′35.2044″E"
     * - etc.
     *
     * @param query
     */
    hasQueryCoordinateDms(query: string): boolean
    {
        const regexpCoordinate: string = '([0-9]+)°([0-9]+)′([0-9]+)(.([0-9]+))?″';

        const regexp: RegExp = new RegExp(
            '^' + regexpCoordinate + '[NS]([ ,]+)' + regexpCoordinate + '[WE]$',
            'i'
        );

        let match: RegExpMatchArray|null = regexp.exec(query);

        return match !== null;
    }

    /**
     * Removes all non-visible characters from string.
     *
     * @param inputString
     */
    trimString(inputString: string): string
    {
        return inputString.replace(/^\s+|\s+$/g, '');
    }

    /**
     * Checks for given location or geoname id within the search query and returns the
     * location or locations path.
     *
     * Location examples:
     * ------------------
     * - "6543921"
     * - "51.061155,13.740668"
     * - "51.061155, 13.740668"
     * - "52°31′14.322″N,13°24′35.2044″E"
     * - "52°31′14.322″N, 13°24′35.2044″E"
     * - etc.
     *
     * All others will be a locations search.
     *
     * @param {string} query
     * @return {string}
     */
    getLinkQuery(query: string): string
    {
        query = this.trimString(query);

        /* A "location" string was found. */
        if (this.hasQueryGeonameId(query)) {
            return routePathLocation;
        }

        /* A "decimal coordinate" string was found. */
        if (this.hasQueryCoordinateDecimal(query)) {
            return routePathLocation;
        }

        /* A "dms coordinate" string was found. */
        if (this.hasQueryCoordinateDms(query)) {
            return routePathLocation;
        }

        return this.getPathLocations();
    }
}

/*
 * Export functions.
 */
export {
    FilterConfig
}
