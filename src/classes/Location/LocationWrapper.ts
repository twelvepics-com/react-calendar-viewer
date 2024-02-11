/* Import types. */
import {
    TypeAdministrativeLocations,
    TypeLocation,
    TypeValue,
} from "../../types/Types";

/* Import config. */
import {
    administrativeLocationCityMunicipality,
    administrativeLocationCountry,
    administrativeLocationDistrictLocality,
    administrativeLocationState
} from "../../config/AdministrativeLocations";

/* Import classes. */
import {FeatureWrapper} from "./Feature/FeatureWrapper";
import {CoordinateWrapper} from "./Coordinate/CoordinateWrapper";

class LocationWrapper
{
    private readonly location: TypeLocation;

    /**
     * LocationApiWrapper constructor.
     *
     * @param location {TypeLocation}
     */
    constructor(location: TypeLocation)
    {
        this.location = location;
    }

    /**
     * Returns the name of the location.
     */
    getName(): string
    {
        return this.location.name;
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
     * Returns the administrative locations.
     *
     * @param key {string}
     * @return {TypeLocation|null}
     */
    getAdministrativeLocation(key: string): TypeLocation|null
    {
        const administrativeLocations = this.getAdministrativeLocations();

        if (administrativeLocations === null) {
            return null;
        }

        if (!administrativeLocations[key]) {
            return null;
        }

        return administrativeLocations[key];
    }

    /**
     * Returns the district/locality from administrative locations.
     */
    getDistrictLocality(): string|null
    {
        return this.getAdministrativeLocation(administrativeLocationDistrictLocality)?.name ?? null;
    }

    /**
     * Returns the city/municipality from administrative locations.
     */
    getCityMunicipality(): string|null
    {
        return this.getAdministrativeLocation(administrativeLocationCityMunicipality)?.name ?? null;
    }

    /**
     * Returns the state from administrative locations.
     */
    getState(): string|null
    {
        return this.getAdministrativeLocation(administrativeLocationState)?.name ?? null;
    }

    /**
     * Returns the state from administrative locations.
     */
    getCountry(): string|null
    {
        return this.getAdministrativeLocation(administrativeLocationCountry)?.name ?? null;
    }

    /**
     * Return the country code from location.
     */
    getCountryCode(): string
    {
        return this.location.properties.country;
    }

    /**
     * Return the country code from location.
     */
    getElevation(): TypeValue|null
    {
        return this.location.properties.elevation ?? null;
    }

    /**
     * Returns the coordinate of the location.
     */
    getCoordinate(): CoordinateWrapper
    {
        return new CoordinateWrapper(this.location.coordinate);
    }

    /**
     * Returns the feature of the location.
     */
    getFeature(): FeatureWrapper
    {
        return new FeatureWrapper(this.location.feature);
    }
}

/*
 * Export functions.
 */
export {
    LocationWrapper
}
