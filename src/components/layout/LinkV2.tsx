import React, {ReactNode, useMemo} from 'react';
import {Link, LinkProps, To, useNavigate, useSearchParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";

/* Import classes. */
import {Query} from "../../classes/Query";

/* Import components. */
import {useLoader} from "./LoaderContext";

/* Import types. */
import {CallableString} from "../../types/Types";

/* Interface definitions. */
interface LinkV2Props extends LinkProps {
    to: To,
    scrollTo?: number,
    children: ReactNode,
    useCurrentPosition?: boolean,
    queryString?: string|null,
    setQuery?: boolean,
    textLoader?: string|null,
    textInformation?: CallableString|string|null,
    textInformationAdditional?: CallableString|string|null
}

/**
 * This is the LinkV2 component. This extends the Link component with additional functionality.
 *
 * @param to
 * @param children
 * @param boolean
 * @param props
 * @constructor
 */
const LinkV2: React.FC<LinkV2Props> = ({
    to,
    scrollTo = null,
    children,
    useCurrentPosition = false,
    queryString = null,
    setQuery = false,
    textLoader = null,
    textInformation = null,
    textInformationAdditional = null,
    ...props
}) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    let navigate = useNavigate();

    const { showLoader, hideLoader } = useLoader();

    /* API types */
    const env = useMemo(() => {
        return process.env;
    }, []);

    /* Memorized variables. */
    const [searchParams] = useSearchParams();

    let query = new Query(searchParams, env);

    /**
     * Round function.
     *
     * @param value
     * @param decimals
     */
    const round = (value: number, decimals: number): number =>
    {
        return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
    };

    /**
     * Get position string from GeolocationPosition.
     *
     * @param position
     */
    const getPosition = (position: GeolocationPosition): string =>
    {
        return round(position.coords.latitude, 6) + ',' + round(position.coords.longitude, 6);
    }

    /**
     * ScrollToTop function.
     *
     * @param top
     */
    const scrollToTop = (top: number|null = null): void =>
    {
        if (top === null) {
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    /**
     * Handles the click event.
     *
     * @param event
     */
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
    {
        /* Do not handle external links. */
        if (to.toString().startsWith('http')) {
            return;
        }

        /* Use the "to" link directly. */
        if (!useCurrentPosition) {
            navigate(to);
            scrollToTop(scrollTo);

            event.preventDefault();
            return;
        }

        /* Check the current position. Maybe add current position to "to" link. */
        let filterConfig = query.getFilterConfig();

        filterConfig.setByLink(to);
        filterConfig.setDoNotResetOrClear();

        /* Extract the path name from the "to" link. */
        let pathName = filterConfig.getPathname(to);

        if (queryString !== null && queryString !== '') {
            pathName = filterConfig.getLinkQuery(queryString);
        }

        // /* The current position is set. Force to use the current one. */
        // if (filterConfig.getCurrentPosition()) {
        //     navigate(query.getFilterConfig().getCurrentLinkWithLanguage(null, null, pathName));
        //     scrollToTop(scrollTo);
        //     event.preventDefault();
        //     return;
        // }

        /* Shows the loader before querying the current position. */
        showLoader(
            textLoader !== null ? textLoader : t('TEXT_WORD_LOAD'),
            textInformation,
            textInformationAdditional
        );

        /* Add current position to query. */
        navigator.geolocation.getCurrentPosition((position) =>
        {
            const positionString = getPosition(position);

            filterConfig.setDoNotResetOrClear();
            filterConfig.setCurrentPosition(positionString);

            if (setQuery && queryString === null) {
                filterConfig.setQuery(positionString);
            }

            if (setQuery && queryString !== null) {
                filterConfig.setQuery(queryString !== '' ? queryString : positionString);
            }

            navigate(query.getFilterConfig().getLinkTo(pathName));
            scrollToTop(scrollTo);
            hideLoader(textInformation, t('TEXT_WORD_POSITION') + ': ' + positionString);

            return;
        });

        event.preventDefault();
        return;
    };

    return (
        <Link to={to} {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default LinkV2;
