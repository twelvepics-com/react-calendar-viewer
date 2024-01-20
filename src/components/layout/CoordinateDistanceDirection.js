import React from "react";

/**
 * This is the coordinate, distance and direction part.
 */
const CoordinateDistanceDirection = ({location}) => {
    let hasCoordinate = !!location.coordinate;
    let latitudeDms = hasCoordinate ? location.coordinate.latitude.dms : null;
    let longitudeDms = hasCoordinate ? location.coordinate.longitude.dms : null;
    let latitudeDecimal = hasCoordinate ? location.coordinate.latitude.decimal : null;
    let longitudeDecimal = hasCoordinate ? location.coordinate.longitude.decimal : null;

    let nameDistance = 'distance';
    let nameDirection = 'direction';
    let hasDistance = !!location.coordinate[nameDistance];
    let distance = hasDistance ? location.coordinate[nameDistance].kilometers['value-formatted'] : null;
    let hasDirection =!!location.coordinate[nameDirection];
    let direction = hasDirection? location.coordinate[nameDirection]['cardinal-direction'] : null;

    let nameDistanceUser = 'distance-user';
    let nameDirectionUser = 'direction-user';
    let hasDistanceUser = !!location.coordinate[nameDistanceUser];
    let distanceUser = hasDistanceUser? location.coordinate[nameDistanceUser].kilometers['value-formatted'] : null;
    let hasDirectionUser =!!location.coordinate[nameDirectionUser];
    let directionUser = hasDirectionUser? location.coordinate[nameDirectionUser]['cardinal-direction'] : null;

    return (
        hasCoordinate ?
            <>
                <strong>Position</strong>: <span title={latitudeDecimal}>{latitudeDms}</span>, <span title={longitudeDecimal}>{longitudeDms}</span>
                {
                    hasDistance || hasDirection ?
                        <>
                            <br/><span title="Abstand und Richtung zur gesuchten Position"><strong>Abstand</strong>: </span>
                            {
                                hasDistance ?
                                    <span title="Abstand zur gesuchten Position">{distance}</span> :
                                    <></>
                            }
                            {
                                hasDirection ?
                                    <span title="Richtung zur gesuchten Position"> - {direction}</span> :
                                    <></>
                            }
                        </> :
                        <></>
                }
                {
                    hasDistanceUser || hasDirectionUser ?
                        <>
                            <br/><span title="Abstand und Richtung zur eigenen Position"><strong>Abstand eigene Postion</strong>: </span>
                            {
                                hasDistanceUser ?
                                    <span title="Abstand zur eigenen Position">{distanceUser}</span> :
                                    <></>
                            }
                            {
                                hasDirectionUser ?
                                    <span title="Richtung zur eigenen Position"> - {directionUser}</span> :
                                    <></>
                            }
                        </> :
                        <></>
                }
            </> :
            <></>
    )
}

export default CoordinateDistanceDirection;