import {TFunction} from "i18next";

/* Import types. */
import {
    TypeProperties,
    TypeValue,
} from "../../../../../types/Types";

/* Import translations. */
import {translateCountryCode} from "../../../../../translations/Country";

/* Import classes. */
import {ApiLocationWrapper} from "../../ApiLocationWrapper";
import {LocationWrapper} from "../LocationWrapper";
import {AirportCodesWrapper} from "../../../Base/AirportCodes/AirportCodesWrapper";
import {AirportWrapper} from "../../../Base/Airport/AirportWrapper";
import {RiverLengthWrapper} from "../../../Base/RiverLength/RiverLengthWrapper";

/**
 * Class PropertiesWrapper
 *
 * @author Björn Hempel <bjoern@hempel.li>
 * @version 0.1.0 (2024-02-11)
 * @since 0.1.0 (2024-02-11) First version.
 */
class PropertiesWrapper
{
    private readonly properties: TypeProperties;

    private readonly apiLocationWrapper: ApiLocationWrapper|null;

    /**
     * @param properties {TypeProperties}
     * @param apiLocationWrapper {ApiLocationWrapper}
     */
    constructor(properties: TypeProperties, apiLocationWrapper: ApiLocationWrapper|null)
    {
        this.properties = properties;

        this.apiLocationWrapper = apiLocationWrapper;
    }

    /**
     * Returns the property data.
     */
    get(): TypeProperties
    {
        return this.properties;
    }

    /**
     * Return the country code from location.
     */
    getCountryCode(): string
    {
        return this.properties.country;
    }

    /**
     * Returns the translated country name from location.
     */
    getCountryCodeTranslated(): string
    {
        return translateCountryCode(this.getCountryCode());
    }

    /**
     * Returns if the country code from location exist.
     */
    hasElevation(): boolean
    {
        return !!this.properties.elevation;
    }

    /**
     * Return the elevation from location.
     */
    getElevation(): TypeValue|null
    {
        return this.properties.elevation ?? null;
    }

    /**
     * Returns if the elevation text from location should be shown.
     */
    showElevationText(location: LocationWrapper): boolean
    {
        return [
            'HLL',
            'MT',
            'PK'
        ].includes(location.getFeature().getCode().getCode());
    }

    /**
     * Return the elevation text from location.
     */
    getElevationText(location: LocationWrapper, t: TFunction<"translation", undefined>): string|null
    {
        if (!this.showElevationText(location)) {
            return null;
        }

        if (!location.getProperties().hasElevation()) {
            return null;
        }

        return location.getProperties().getElevation()?.["value-formatted"] ?? null;
    }

    /**
     * Returns if the population from location exists.
     */
    hasPopulation(): boolean
    {
        return !!this.properties.population;
    }

    /**
     * Returns the population from location.
     */
    getPopulation(): TypeValue|null
    {
        return this.properties.population ?? null;
    }

    /**
     * Returns if the population text from location should be shown.
     */
    showPopulationText(location: LocationWrapper): boolean
    {
        return [
            'A',
            'P'
        ].includes(location.getFeature().getClass().getCode());
    }

    /**
     * Returns the population text from location.
     */
    getPopulationText(location: LocationWrapper, t: TFunction<"translation", undefined>): string|null
    {
        if (!this.showPopulationText(location)) {
            return null;
        }

        if (!location.getProperties().hasPopulation()) {
            return null;
        }

        const inhabitants = location.getProperties().getPopulation()?.["value-formatted"];

        return t('TEXT_NEXT_PLACE_INHABITANTS_TEXT', {inhabitants});
    }

    /**
     * Returns if the airport codes exists.
     */
    hasAirportCodes(): boolean
    {
        return !!this.properties.airport_codes;
    }

    /**
     * Returns the airport codes.
     */
    getAirportCodes(): AirportCodesWrapper|null
    {
        return this.properties.airport_codes ? new AirportCodesWrapper(this.properties.airport_codes) : null;
    }

    /**
     * Returns if the airport exists.
     */
    hasAirport(): boolean
    {
        return !!this.properties.airport;
    }

    /**
     * Returns the airport.
     */
    getAirport(): AirportWrapper|null
    {
        return this.properties.airport ? new AirportWrapper(this.properties.airport) : null;
    }

    /**
     * Returns if the airport code should be shown for the given feature code.
     *
     * @param {string} location
     */
    showAirportCode(location: LocationWrapper): boolean
    {
        return [
            'AIRP'
        ].includes(location.getFeature().getCode().getCode());
    }

    /**
     * Returns the population for the given place.
     */
    getAirportCodeText = (location: LocationWrapper, t: TFunction<"translation", undefined>): JSX.Element|string|null =>
    {
        let showMissingAirportCode: boolean = false;

        if (!this.showAirportCode(location)) {
            return null;
        }

        if (!this.hasAirportCodes() || !this.getAirportCodes()?.hasIata()) {
            return showMissingAirportCode ? t('TEXT_NEXT_PLACE_NO_IATA_CODE_SPECIFIED') : null;
        }

        return this.getAirportCodes()?.getIata() ?? '';
    }

    /**
     * Returns if the river length exists.
     */
    hasRiverLength(): boolean
    {
        return !!this.properties["river-length"];
    }

    /**
     * Returns the river length.
     */
    getRiverLength(): RiverLengthWrapper|null
    {
        return this.properties["river-length"] ? new RiverLengthWrapper(this.properties["river-length"]) : null;
    }

    /**
     * Returns if the river length should be shown for the given feature code.
     *
     * @param {string} location
     */
    showRiverLength(location: LocationWrapper): boolean
    {
        return [
            'STM'
        ].includes(location.getFeature().getCode().getCode());
    }

    /**
     * Returns the river length for the given place.
     *
     * @param location
     * @param t
     */
    getRiverLengthText = (location: LocationWrapper, t: TFunction<"translation", undefined>): JSX.Element|string|null =>
    {
        let showMissingRiverLength: boolean = false;

        if (!this.showRiverLength(location)) {
            return null;
        }

        if (!this.hasRiverLength()) {
            return showMissingRiverLength ? t('TEXT_NEXT_PLACE_NO_RIVER_LENGTH_SPECIFIED') : null;
        }

        return this.getRiverLength()?.getFormatted() ?? '';
    }
}

/*
 * Export functions.
 */
export {
    PropertiesWrapper
}
