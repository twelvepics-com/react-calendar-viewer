/* Import types. */
import {
    TypeAdministrativeLocations,
    TypeLocation,
    TypeNextPlaces,
} from "../../../../types/Types";

/* Import config. */
import {
    administrativeLocationCityMunicipality,
    administrativeLocationCountry,
    administrativeLocationDistrictLocality,
    administrativeLocationState
} from "../../../../config/AdministrativeLocations";

/* Import classes. */
import {ApiLocationWrapper} from "../ApiLocationWrapper";
import {FeatureWrapper} from "./Feature/FeatureWrapper";
import {CoordinateWrapper} from "./Coordinate/CoordinateWrapper";
import {PropertiesWrapper} from "./Properties/PropertiesWrapper";
import {TimezoneWrapper} from "./Timezone/TimezoneWrapper";
import {LinksWrapper} from "./Links/LinksWrapper";
import {NextPlacesWrapper} from "./NextPlaces/NextPlacesWrapper";
import {NextPlacesConfigWrapper} from "./NextPlacesConfig/NextPlacesConfigWrapper";
import {NextPlaceWrapper} from "./NextPlaces/NextPlaceWrapper";

/**
 * Class LocationWrapper
 *
 * @author Björn Hempel <bjoern@hempel.li>
 * @version 0.1.0 (2024-02-11)
 * @since 0.1.0 (2024-02-11) First version.
 */
class LocationWrapper
{
    private readonly location: TypeLocation;

    private readonly apiLocationWrapper: ApiLocationWrapper|null;

    /**
     * @param location {TypeLocation}
     * @param apiLocationWrapper {ApiLocationWrapper}
     */
    constructor(location: TypeLocation, apiLocationWrapper: ApiLocationWrapper|null = null)
    {
        this.location = location;
        this.apiLocationWrapper = apiLocationWrapper;
    }

    /**
     * Returns the full location data of the location.
     */
    get(): TypeLocation
    {
        return this.location;
    }

    /**
     * Returns the name of the location.
     */
    getName(): string
    {
        return this.location.name;
    }

    /**
     * Returns the full name of the location.
     *
     * @return {string|null}
     */
    getNameFull(): string|null
    {
        return this.location['name-full'] ?? null;
    }

    /**
     * Returns the full name of the location.
     *
     * @return {number}
     */
    getGeonameId(): number
    {
        return this.location["geoname-id"];
    }

    /**
     * Returns the full name of the location.
     *
     * @return {number}
     */
    getZipCode(): string
    {
        return this.location["zip-code"];
    }

    /**
     * Returns the updated at of the location.
     */
    getUpdateAt(): string
    {
        return this.location["updated-at"];
    }



    /**
     * Returns the administrative locations.
     */
    getAdministrativeLocations(): TypeAdministrativeLocations|null
    {
        if (!this.location.locations) {
            return null;
        }

        return this.location.locations;
    }

    /**
     * Returns if the administrative locations exist given by key name.
     *
     * @param key {string}
     * @return {boolean}
     */
    hasAdministrativeLocation<K extends keyof TypeAdministrativeLocations>(key: K): boolean
    {
        const administrativeLocations = this.getAdministrativeLocations();

        if (administrativeLocations === null) {
            return false;
        }

        return !!administrativeLocations[key];
    }

    /**
     * Returns the administrative locations.
     *
     * @param key {string}
     * @return {TypeLocation|null}
     */
    getAdministrativeLocation<K extends keyof TypeAdministrativeLocations>(key: K): LocationWrapper|null
    {
        const administrativeLocations = this.getAdministrativeLocations();

        if (administrativeLocations === null) {
            return null;
        }

        if (!administrativeLocations[key]) {
            return null;
        }

        return new LocationWrapper(administrativeLocations[key], this.apiLocationWrapper);
    }

    /**
     * Returns if the district/locality from administrative locations exist.
     */
    hasDistrictLocality(): boolean
    {
        return this.hasAdministrativeLocation(administrativeLocationDistrictLocality);
    }

    /**
     * Returns the district/locality from administrative locations.
     */
    getDistrictLocality(): LocationWrapper|null
    {
        return this.getAdministrativeLocation(administrativeLocationDistrictLocality);
    }

    /**
     * Returns if the city/municipality from administrative locations exist.
     */
    hasCityMunicipality(): boolean
    {
        return this.hasAdministrativeLocation(administrativeLocationCityMunicipality);
    }

    /**
     * Returns the city/municipality from administrative locations.
     */
    getCityMunicipality(): LocationWrapper|null
    {
        return this.getAdministrativeLocation(administrativeLocationCityMunicipality);
    }

    /**
     * Returns if the state from administrative locations exists.
     */
    hasState(): boolean
    {
        return this.hasAdministrativeLocation(administrativeLocationState);
    }

    /**
     * Returns the state from administrative locations.
     */
    getState(): LocationWrapper|null
    {
        return this.getAdministrativeLocation(administrativeLocationState);
    }

    /**
     * Returns if the state from administrative locations exists.
     */
    hasCountry(): boolean
    {
        return this.hasAdministrativeLocation(administrativeLocationCountry);
    }

    /**
     * Returns the state from administrative locations.
     */
    getCountry(): LocationWrapper|null
    {
        return this.getAdministrativeLocation(administrativeLocationCountry);
    }



    /**
     * Returns the coordinate of the location.
     */
    getCoordinate(): CoordinateWrapper
    {
        return new CoordinateWrapper(this.location.coordinate, this.apiLocationWrapper);
    }

    /**
     * Returns the feature of the location.
     */
    getFeature(): FeatureWrapper
    {
        return new FeatureWrapper(this.location.feature, this.apiLocationWrapper);
    }

    /**
     * Returns the properties of the location
     */
    getProperties(): PropertiesWrapper
    {
        return new PropertiesWrapper(this.location.properties, this.apiLocationWrapper);
    }



    /**
     * Returns if the timezone of the location exists.
     */
    hasTimezone(): boolean
    {
        return !!this.location.timezone;
    }

    /**
     * Returns the timezone of the location.
     */
    getTimezone(): TimezoneWrapper|null
    {
        if (!this.location.timezone) {
            return null;
        }

        return new TimezoneWrapper(this.location.timezone, this.apiLocationWrapper);
    }



    /**
     * Returns the links of the location.
     */
    getLinks(): LinksWrapper
    {
        return new LinksWrapper(this.location.links, this.apiLocationWrapper);
    }



    /**
     * Returns if the next places of the location exist.
     */
    hasNextPlaces(): boolean
    {
        return !!this.location["next-places"];
    }

    /**
     * Returns the next places of the location.
     */
    getNextPlaces(): NextPlacesWrapper|null
    {
        if (!this.location["next-places"]) {
            return null;
        }

        return new NextPlacesWrapper(this.location["next-places"], this.apiLocationWrapper);
    }

    /**
     * Returns all next places feature classes, which can be used with getNextPlace.
     */
    getNextPlacesFeatureClasses(pClassFirst: boolean = false): Array<keyof TypeNextPlaces>
    {
        if (!this.location["next-places"]) {
            return [];
        }

        let featureClasses = Object.keys(this.location['next-places']) as Array<keyof TypeNextPlaces>;

        /* Returns the sorted list. */
        if (!pClassFirst) {
            return featureClasses;
        }

        /* Sort with p class first. */
        featureClasses.sort((a, b) => {
            if (a === 'P') return -1;
            if (b === 'P') return 1;
            return a.localeCompare(b);
        });

        return featureClasses;
    }

    /**
     * Returns a single next place by given feature class.
     *
     * @param key
     */
    getNextPlace<K extends keyof TypeNextPlaces>(key: K): NextPlaceWrapper|null
    {
        if (!this.location["next-places"]) {
            return null;
        }

        const nextPlace = this.location["next-places"][key] ?? null;

        if (nextPlace === null) {
            return null;
        }

        return new NextPlaceWrapper(nextPlace, this.apiLocationWrapper);
    }



    /**
     * Returns the next places config of the location.
     */
    getNextPlacesConfig(): NextPlacesConfigWrapper
    {
        return new NextPlacesConfigWrapper(this.location["next-places-config"], this.apiLocationWrapper);
    }
}

/*
 * Export functions.
 */
export {
    LocationWrapper
}
