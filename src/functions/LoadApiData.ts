import axios from "axios";
import semver from "semver";
import { TFunction } from "i18next";

/* Import types. */
import {
    TypeApiProperties,
    TypeLoadApiArguments
} from "../types/Types";

/**
 * API data load function.
 */
const loadApiData = (
    parameters: TypeLoadApiArguments,
    t:  TFunction<"translation", undefined>
) =>
{
    const type = parameters.type;
    const path = parameters.path;

    const setDataApi = parameters.setDataApi ?? null;
    const setProperties = parameters.setProperties;
    const setLoaded = parameters.setLoaded;
    const setError = parameters.setError;

    const setDataVersion = parameters.setDataVersion ?? null;

    const setDataCalendars = parameters.setDataCalendars ?? null;
    const setDataCalendar = parameters.setDataCalendar ?? null;
    const setDataCalendarPage = parameters.setDataCalendarPage ?? null;

    const setDataPhotoSetPage = parameters.setDataPhotoSetPage ?? null;
    const setDataPhotoSet = parameters.setDataPhotoSet ?? null;

    const callback = parameters.callback ?? null;

    let url: string|null = null;
    let name: string|null = null;

    switch (type) {
        case process.env.REACT_APP_TYPE_CALENDAR_BUILDER:
            url = process.env.REACT_APP_CALENDAR_BUILDER_URL !== undefined ?
                process.env.REACT_APP_CALENDAR_BUILDER_URL :
                null;
            name = 'PHP Calendar Builder';
            break;

        case process.env.REACT_APP_TYPE_LOCATION_API:
            url = process.env.REACT_APP_LOCATION_API_URL !== undefined ?
                process.env.REACT_APP_LOCATION_API_URL :
                null;
            name = 'PHP Location API';
            break;

        default:
            url = null;
            break;
    }

    if (!url) {
        alert(t('TEXT_ERROR_API_WRONG_TYPE' as any));
        return;
    }

    let apiUrl = url + path;

    axios.get(apiUrl)
        .then(response =>
        {
            let versionResponse = !!path.match(/version.json/);
            let data = response.data;

            /* Use raw data */
            if (versionResponse) {
                setLoaded(true);

                if (setDataApi !== null) {
                    setDataApi(data);
                }
                if (setDataVersion !== null) {
                    setDataVersion(data);
                }
                if (setDataCalendars !== null) {
                    setDataCalendars(data);
                }
                if (setDataCalendar !== null) {
                    setDataCalendar(data);
                }
                if (setDataCalendarPage !== null) {
                    setDataCalendarPage(data);
                }
                if (setDataPhotoSetPage !== null) {
                    setDataPhotoSetPage(data);
                }
                if (setDataPhotoSet !== null) {
                    setDataPhotoSet(data);
                }

                return;
            }

            let version = data.version;
            let valid = data.valid;

            /* Check API response */
            if (!valid) {
                setLoaded(false);
                setError({message: data.error || t('TEXT_ERROR_API_RESPONSE_INVALID' as any)});
                return;
            }

            let calendarBuilderVersion: string = process.env.REACT_APP_CALENDAR_BUILDER_VERSION !== undefined ?
                process.env.REACT_APP_CALENDAR_BUILDER_VERSION :
                '0.1.0';

            /* Check required api version */
            if (!semver.satisfies(version, calendarBuilderVersion)) {
                setLoaded(false);
                setError({
                    message:
                        t('TEXT_ERROR_API_REQUIRED' as any) + ' ' +
                        t('TEXT_WORD_REQUIRED_VERSION' as any) + ': ' +
                        process.env.REACT_APP_CALENDAR_BUILDER_VERSION + '. ' +
                        t('TEXT_WORD_CURRENT_VERSION' as any) + ': ' + version
                });
                return;
            }

            /* Set data */
            setLoaded(true);

            if (setDataApi !== null) {
                setDataApi(data);
            }
            if (setDataVersion !== null) {
                setDataVersion(data.data);
            }
            if (setDataCalendars !== null) {
                setDataCalendars(data.data);
            }
            if (setDataCalendar !== null) {
                setDataCalendar(data.data);
            }
            if (setDataCalendarPage !== null) {
                setDataCalendarPage(data.data);
            }
            if (setDataPhotoSetPage !== null) {
                setDataPhotoSetPage(data.data);
            }
            if (setDataPhotoSet !== null) {
                setDataPhotoSet(data.data);
            }

            if (setProperties) {
                let propertiesApi: TypeApiProperties = {
                    "date": data['date'],
                    "given": data['given'],
                    "memory-taken": data['memory-taken'],
                    "time-taken": data['time-taken'],
                    "valid": data['valid'],
                    "version": data['version'],
                    "name": name,
                    "url": url,
                    "path": path,
                    "type": type,
                    "api-url": apiUrl
                };

                if (data['results']) {
                    propertiesApi['results'] = data['results'];
                }

                setProperties(propertiesApi);
            }

            if (callback !== null) {
                callback();
            }
        })
        .catch(error =>
        {
            setLoaded(false);
            setError(error);
            if (setProperties) {
                setProperties({
                    "valid": false,
                    "name": name,
                    "url": url,
                    "path": path,
                    "type": type,
                    "api-url": apiUrl
                });
            }
        });
}

export default loadApiData;