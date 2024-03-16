import React from "react";

type TypeErrorOwn = {
    "message": string,
}|null;

type TypeValue = {
    "value": number,
    "unit": string,
    "value-formatted": string,
}

type TypeDistance = {
    "meters": TypeValue,
    "kilometers": TypeValue,
}

type TypePosition = {
    "decimal": number,
    "dms": string,
}

type TypeDirection = {
    "degree": number,
    "cardinal-direction": string,
    "cardinal-direction-translated": string,
}

type TypeLocationCoordinate = {
    coordinate: TypeCoordinate,
}

type TypeSrcSet = {
    "srcSet": string,
    "media": string,
}

type TypeBirthday = {
    "date": string,
    "name": string,
    "name_short": string,
};

type TypeHoliday = {
    "date": string,
    "name": string,
    "name_short": string,
};

type TypeBirthdays = {
    [key: string]: TypeBirthday[];
};

type TypeHolidays = TypeHoliday[];

type TypeAirportCodes = {
    "iata"?: string,
    "icao"?: string,
}

type TypeAirport = {
    "iata"?: string,
    "icao"?: string,
    "wmo"?: string,
    "passengers"?: string,
    "movements"?: string,
    "cargo"?: string,
    "website"?: string,
    "operator"?: string,
    "opened"?: string,
    "type"?: string,
    "statistics-year"?: string,
    "direction"?: string[],
    "length"?: string[],
    "surface"?: string[]
}

type TypeGeneral = {
    "elevation"?: string,
}

type TypePlace = {
    "geoname-id": number,
    "name": string,
    "updated-at": string,
    "properties": TypeProperties,
    "feature": TypeFeature,
}

type TypeFilterConfig = {
    "c"?: string,           /* Calendar parameter */
    "m"?: string,           /* Month parameter */
    "q"?: string,           /* Query parameter */
    "p"?: string,           /* Current position parameter */
    "distance"?: string,    /* Distance parameter */
    "limit"?: string,       /* Limit parameter */
    "page"?: string,        /* Page parameter */
    "s"?: string,           /* Sort parameter */
    "country"?: string,     /* Country parameter */
    "language"?: string,    /* Language parameter */
    "next_places"?: string, /* Next places parameter */
}

type TypeQuerFeatureCode = {
    "code": string,
    "translated": string,
}

type TypeLoaded = boolean;

type TypeDataVersion = {
    "version": string,
    "date": string,
}

type TypeDataCalendarPage = {
    birthdays: TypeBirthdays,
    color: string,
    colors: string[],
    coordinate: string,
    coordinate_decimal: string,
    coordinate_dms: string,
    google_maps: string,
    holidays: TypeHolidays,
    identifier: string,
    month: number,
    page_title: string,
    description?: string,
    path: string,
    source: string,
    subtitle: string,
    target: string,
    title: string,
    year: number,
}

type TypeDataCalendar = {
    birthdays?: TypeBirthdays,
    holidays?: TypeHolidays,
    identifier: string,
    image: string,
    name?: string,
    pages?: TypeDataCalendarPage[],
    public: boolean,
    subtitle: string,
    title: string,
    url?: string
}

type TypeDataCalendars = {
    calendars: TypeDataCalendar[],
};

type TypeApiProperties = {
    "api-url": string,
    "date"?: string,
    "given"?: TypeGiven,
    "memory-taken"?: string,
    "name": string|null,
    "path": string,
    "results"?: TypeResults,
    "time-taken"?: string,
    "type": string,
    "url": string|null,
    "valid": boolean,
    "version"?: string,
}

type TypeLoadApiArguments = {
    /* Required types */
    type: string,
    path: string,
    setLoaded: React.Dispatch<React.SetStateAction<TypeLoaded>>,
    setError: React.Dispatch<React.SetStateAction<TypeErrorOwn>>,
    setProperties: React.Dispatch<React.SetStateAction<TypeApiProperties|null>>,

    /* Optional types */
    setDataVersion?: React.Dispatch<React.SetStateAction<TypeDataVersion|null>>,
    setDataCalendarPage?: React.Dispatch<React.SetStateAction<TypeDataCalendarPage|null>>,
    setDataCalendar?: React.Dispatch<React.SetStateAction<TypeDataCalendar|null>>,
    setDataCalendars?: React.Dispatch<React.SetStateAction<TypeDataCalendars|null>>,
    setDataLocation?: React.Dispatch<React.SetStateAction<TypeLocation|null>>,
    setDataLocations?: React.Dispatch<React.SetStateAction<TypeLocations|null>>,
    setDataApi?: React.Dispatch<React.SetStateAction<TypeApiData|null>>,
    callback?: Function,
}

/* Other types.
 */
type TypeSearchTypeTranslation = {
    'search-list-general': string,
    'search-list-with-features': string,
    'search-geoname-id': string,
    'search-coordinate': string,
}

/* Full API Types.
 */

const typeLocation: string = 'location';

const typeLocations: string = 'locations';

type TypeDataLicence = {
    "full": string,
    "short": string,
    "url": string
}

type TypePerformance = object;

type TypeResults = {
    "total": number,
    "results": number,
    "page": number,
}

type TypeProperties = {
    "elevation"?: TypeValue,
    "population"?: TypeValue,
    "airport_codes"?: TypeAirportCodes,
    "airport"?: TypeAirport,
    "general"?: TypeGeneral,
    "country": string,
}

type TypeFeature = {
    "code": string,
    "code-name": string,
    "class": string,
    "class-name": string,
}

type TypeFeatureClass = {
    "code": string,
    "name": string,
}

type TypeFeatureCode = {
    "code": string,
    "name": string,
}

type TypeCoordinate = {
    "latitude": TypePosition,
    "longitude": TypePosition,
    "srid": number,
    "distance"?: TypeDistance,
    "direction"?: TypeDirection
    "distance-user"?: TypeDistance,
    "direction-user"?: TypeDirection
}

type TypeCurrentTime = {
    "timezone": string,
    "utc": string
}

type TypeTimezone = {
    timezone: string,
    offset: string
    country: string,
    "current-time": TypeCurrentTime
    coordinate: TypeCoordinate
}

type TypeAdministrativeLocations = {
    "district-locality": TypeLocation,
    "city-municipality": TypeLocation,
    "state": TypeLocation,
    "country": TypeLocation
}

type TypeLinksWikipediaLocations = {
    "district-locality"?: string,
    "city-municipality"?: string,
    "state"?: string,
    "country"?: string
};

type TypeLinksWikipediaNextPlace = {
    "link": string,
    "number": number
}

type TypeLinksWikipediaNextPlaces = {
    A?: TypeLinksWikipediaNextPlace[],
    H?: TypeLinksWikipediaNextPlace[],
    L?: TypeLinksWikipediaNextPlace[],
    P?: TypeLinksWikipediaNextPlace[],
    R?: TypeLinksWikipediaNextPlace[],
    S?: TypeLinksWikipediaNextPlace[],
    T?: TypeLinksWikipediaNextPlace[],
    U?: TypeLinksWikipediaNextPlace[],
    V?: TypeLinksWikipediaNextPlace[],
};

type TypeLinksWikipedia = {
    "this"?: string,
    "locations"?: TypeLinksWikipediaLocations,
    "next-places"?: TypeLinksWikipediaNextPlaces
}

type TypeLinksMaps = {
    "google": string,
    "openstreetmap": string,
}

type TypeLinksOther = string[];

type TypeLinks = {
    "wikipedia"?: TypeLinksWikipedia,
    "maps"?: TypeLinksMaps,
    "other"?: TypeLinksOther,
};

type TypeNextPlacesFeatureClassConfig = {
    "distance-meter": number,
    "limit": number,
    "coordinate": TypeCoordinate,
    "coordinate-type": string
    "location": {
        "name": string
    }
};

type TypeNextPlacesFeatureClassFeature = {
    "class": string,
    "class-name": string
};

type TypeNextPlacesFeatureClass = {
    "config": TypeNextPlacesFeatureClassConfig,
    "feature": TypeNextPlacesFeatureClassFeature,
    "places-number": number,
    "places": TypeLocation[]
};

type TypeNextPlaces = {
    A?: TypeNextPlacesFeatureClass,
    H?: TypeNextPlacesFeatureClass,
    L?: TypeNextPlacesFeatureClass,
    P?: TypeNextPlacesFeatureClass,
    R?: TypeNextPlacesFeatureClass,
    S?: TypeNextPlacesFeatureClass,
    T?: TypeNextPlacesFeatureClass,
    U?: TypeNextPlacesFeatureClass,
    V?: TypeNextPlacesFeatureClass,
}

type TypeNextPlacesConfigConfigNextPlace = {
    "distance": number,
    "limit": number,
    "name": string,
    "feature_codes"?: string[],
    "feature_classes"?: string[]
}

type TypeNextPlacesConfigConfig = {
    [index: string]: TypeNextPlacesConfigConfigNextPlace
};

type TypeNextPlacesConfigEndpoint = {
    "coordinate": string,
    "list": string
};

type TypeNextPlacesConfig = {
    "config": TypeNextPlacesConfigConfig,
    "endpoints": TypeNextPlacesConfigEndpoint
};

type TypeLocation = {
    "coordinate": TypeCoordinate,
    "feature": TypeFeature,
    "geoname-id": number,
    "links": TypeLinks,
    "locations"?: TypeAdministrativeLocations,
    "name": string,
    "name-full"?: string,
    "next-places"?: TypeNextPlaces,
    "next-places-config": TypeNextPlacesConfig,
    "properties": TypeProperties,
    "timezone"?: TypeTimezone,
    "updated-at": string,
    "zip-code": string,
}

type TypeLocations = TypeLocation[];

type TypeGivenQueryParsedFeatureCode = {
    code: string,
    translated: string
}

type TypeGivenQueryParsedFeatureClass = {
    code: string,
    translated: string
}

type TypeGivenQueryParsed = {
    "type": string,
    "geoname-id"?: number,
    "search"?: string[],
    "coordinate"?: TypeGivenCoordinate,
    "feature-codes"?: TypeGivenQueryParsedFeatureCode[],
    "feature-classes"?: TypeGivenQueryParsedFeatureClass[]
};

type TypeGivenQuery = {
    "raw": string,
    "parsed": TypeGivenQueryParsed
};

type TypeGivenLanguage = {
    "raw": string,
    "parsed":  {
        "name": string
    }
}

type TypeGivenCountry = {
    "raw": string,
    "parsed":  {
        "name": string
    }
};

type TypeGivenCoordinateParsed = {
    "latitude": TypePosition,
    "longitude": TypePosition,
    "links": TypeLinksMaps,
    "srid"?: number,
};

type TypeGivenCoordinate = {
    "raw": string,
    "parsed": TypeGivenCoordinateParsed,
    "location": TypeLocation
};

type TypeGiven = {
    "query"?: TypeGivenQuery,
    "next-places"?: boolean,
    "language"?: TypeGivenLanguage,
    "country"?: TypeGivenCountry,
    "coordinate"?: TypeGivenCoordinate,
    "limit"?: number,
    "distance"?: number
};

type TypeApiData = {
    "data-licence": TypeDataLicence,
    "time-taken": string,
    "memory-taken": string,
    "performance": TypePerformance,
    "results"?: TypeResults,
    "data": TypeLocation|Array<TypeLocation>,
    "given": TypeGiven,
    "valid": boolean,
    "date": string,
    "version": string,
}

type CallableString = () => string;

/*
 * Export functions.
 */
export {
    TypeValue,
    TypeDistance,
    TypePosition,
    TypeDirection,
    TypeLocationCoordinate,
    TypeSrcSet,
    TypeBirthday,
    TypeBirthdays,
    TypeHoliday,
    TypeHolidays,
    TypePlace,
    TypeFilterConfig,
    TypeQuerFeatureCode,
    TypeErrorOwn,
    TypeLoaded,
    TypeDataVersion,
    TypeDataCalendarPage,
    TypeDataCalendar,
    TypeDataCalendars,
    TypeApiProperties,
    TypeLoadApiArguments,
    TypeSearchTypeTranslation,
    TypeAirportCodes,
    TypeAirport,
    TypeGeneral,

    /* Full API Types. */
    TypeDataLicence,
    TypePerformance,
    TypeResults,
    TypeProperties,
    TypeFeature,
    TypeFeatureClass,
    TypeFeatureCode,
    TypeCoordinate,
    TypeCurrentTime,
    TypeTimezone,
    TypeNextPlacesFeatureClassConfig,
    TypeNextPlacesFeatureClassFeature,
    TypeNextPlacesFeatureClass,
    TypeAdministrativeLocations,
    TypeLinksWikipediaLocations,
    TypeLinksWikipediaNextPlace,
    TypeLinksWikipediaNextPlaces,
    TypeLinksWikipedia,
    TypeLinksMaps,
    TypeLinksOther,
    TypeLinks,
    TypeNextPlaces,
    TypeNextPlacesConfigConfigNextPlace,
    TypeNextPlacesConfigConfig,
    TypeNextPlacesConfigEndpoint,
    TypeNextPlacesConfig,
    TypeLocation,
    TypeLocations,
    TypeGivenQueryParsedFeatureCode,
    TypeGivenQueryParsedFeatureClass,
    TypeGivenQueryParsed,
    TypeGivenQuery,
    TypeGivenLanguage,
    TypeGivenCountry,
    TypeGivenCoordinateParsed,
    TypeGivenCoordinate,
    TypeGiven,
    TypeApiData,

    typeLocations,
    typeLocation,

    CallableString
}
