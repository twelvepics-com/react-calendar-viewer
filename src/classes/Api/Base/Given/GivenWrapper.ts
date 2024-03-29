/* Import types. */
import {
    TypeGiven
} from "../../../../types/Types";

/* Import classes. */
import {QueryWrapper} from "./Query/QueryWrapper";
import {LanguageWrapper} from "./Language/LanguageWrapper";
import {CountryWrapper} from "./Country/CountryWrapper";
import {CoordinateWrapper} from "./Coordinate/CoordinateWrapper";

/**
 * Class GivenWrapper
 *
 * @author Björn Hempel <bjoern@hempel.li>
 * @version 0.1.0 (2024-02-15)
 * @since 0.1.0 (2024-02-15) First version.
 */
class GivenWrapper
{
    private readonly given: TypeGiven;

    /**
     * @param given {TypeGiven}
     */
    constructor(given: TypeGiven)
    {
        this.given = given;
    }

    /**
     * Returns the full location data of the location.
     */
    get(): TypeGiven
    {
        return this.given;
    }



    /**
     * Returns if the next places were requested.
     */
    showNextPlaces(): boolean
    {
        return this.given["next-places"] ? this.given["next-places"] : false;
    }



    /**
     * Returns if the given property query exists.
     */
    hasQuery(): boolean
    {
        return !!this.given.query;
    }

    /**
     * Returns the given property query.
     */
    getQuery(): QueryWrapper|null
    {
        return this.given.query ? new QueryWrapper(this.given.query) : null;
    }

    /**
     * Returns if the given property query exists.
     */
    hasLimit(): boolean
    {
        return !!this.given.limit;
    }

    /**
     * Returns the given property query.
     */
    getLimit(): number|null
    {
        return this.given.limit ? this.given.limit : null;
    }

    /**
     * Returns if the given property query exists.
     */
    hasDistance(): boolean
    {
        return !!this.given.distance;
    }

    /**
     * Returns the given property query.
     */
    getDistance(): number|null
    {
        return this.given.distance ? this.given.distance : null;
    }

    /**
     * Returns if the given property language exists.
     */
    hasLanguage(): boolean
    {
        return !!this.given.language;
    }

    /**
     * Returns the given property language.
     */
    getLanguage(): LanguageWrapper|null
    {
        return this.given.language ? new LanguageWrapper(this.given.language) : null;
    }

    /**
     * Returns if the given property country exists.
     */
    hasCountry(): boolean
    {
        return !!this.given.country;
    }

    /**
     * Returns the given property country.
     */
    getCountry(): CountryWrapper|null
    {
        return this.given.country ? new CountryWrapper(this.given.country) : null;
    }

    /**
     * Returns if the given property coordinate exists.
     */
    hasCoordinate(): boolean
    {
        return !!this.given.coordinate;
    }

    /**
     * Returns the given property coordinate.
     */
    getCoordinate(): CoordinateWrapper|null
    {
        return this.given.coordinate ? new CoordinateWrapper(this.given.coordinate) : null;
    }
}

/*
 * Export functions.
 */
export {
    GivenWrapper
}
