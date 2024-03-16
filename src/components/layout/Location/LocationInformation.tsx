import React from "react";
import {useTranslation} from "react-i18next";

/* Import configuration. */
import {ClassNames} from "../../../config/ClassNames";

/* Import functions. */
import {convertToGermanFormat} from "../../../functions/Date";
import {numberToRoman} from "../../../functions/Number";

/* Import classes. */
import {LocationWrapper} from "../../../classes/Api/Location/Location/LocationWrapper";

/* Add component parts. */
import CollapsibleCard from "../CollapsibleCard";

type LocationInformationProps = {
    location: LocationWrapper,
    number: number
}

/**
 * This is the LocationInformation part.
 */
const LocationInformation = ({location, number}: LocationInformationProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    const classNamesRow1 = ClassNames.Row1;
    const classNamesRow2 = ClassNames.Row2;

    return (
        <CollapsibleCard title={numberToRoman(number) + ') ' + t('TEXT_WORD_LOCATION_INFORMATION')} collapsed={true}>
            <table
                className="table table-responsive table-last-line location-detail mb-0"
                style={{
                    borderCollapse: 'collapse',
                    backgroundColor: "transparent"
                }}
            >
                <tbody>
                <tr>
                    <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_MASTER_CODE')}</td>
                    <td className={classNamesRow2.join(' ')} colSpan={2}>
                        <code>{location.getFeature().getClass().getCode()}</code> - {location.getFeature().getClass().getName()}
                    </td>
                </tr>
                <tr>
                    <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_CODE')}</td>
                    <td className={classNamesRow2.join(' ')} colSpan={2}>
                        <code>{location.getFeature().getCode().getCode()}</code> - {location.getFeature().getCode().getName()}
                    </td>
                </tr>
                {
                    location.hasTimezone() ?
                        <tr>
                            <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_TIME_ZONE')}</td>
                            <td
                                className={classNamesRow2.join(' ')}
                                colSpan={2}
                                title={location.getTimezone()?.getCoordinate().getDMS() ?? ''}
                            >{location.getTimezone()?.getTimezone()}&nbsp;
                                <code>{location.getTimezone()?.getOffset()}</code></td>
                        </tr> : <></>
                }
                {
                    location.getProperties().hasElevation() ? <tr>
                        <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_ELEVATION')}</td>
                        <td className={classNamesRow2.join(' ')}
                            colSpan={2}>{location.getProperties().getElevation()?.["value-formatted"]}</td>
                    </tr> : <></>
                }
                {
                    location.getProperties().hasPopulation() ? <tr>
                        <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_POPULATION')}</td>
                        <td className={classNamesRow2.join(' ')}
                            colSpan={2}>{location.getProperties().getPopulation()?.["value-formatted"]} {t('TEXT_WORD_INHABITANTS')}</td>
                    </tr> : <></>
                }
                <tr>
                    <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_GEONAME_ID')}</td>
                    <td className={classNamesRow2.join(' ')}
                        colSpan={2}>{location.getGeonameId()}</td>
                </tr>
                <tr>
                    <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_ZIP_CODE')}</td>
                    <td className={classNamesRow2.join(' ')}
                        colSpan={2}>{location.getZipCode()}</td>
                </tr>
                <tr>
                    <td className={classNamesRow1.join(' ')}>{t('TEXT_CAPTION_LAST_UPDATE')}</td>
                    <td className={classNamesRow2.join(' ')}
                        colSpan={2}>{convertToGermanFormat(location.getUpdateAt())}</td>
                </tr>
                </tbody>
            </table>
        </CollapsibleCard>
    );
}

export default LocationInformation;
