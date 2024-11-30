/**
 * This function is used to convert the date and time into a German format.
 * - Uses an ISO date format as input.
 *
 * @param dateTime
 * @returns {`${string}${number}.${string}${number}.${number} ${string}${number}:${string}${number}`}
 */
const convertToGermanFormat = (dateTime: string): string =>
{
    /* Convert date and time into a Date object */
    const dateTimeObject = new Date(dateTime);

    // Extract day, month, and year
    const day = dateTimeObject.getDate();
    const month = dateTimeObject.getMonth() + 1; // Months are 0-based
    const year = dateTimeObject.getFullYear();

    // Extract hour and minute
    const hour = dateTimeObject.getHours();
    const minute = dateTimeObject.getMinutes();

    // Create the German format: DD.MM.YYYY HH:MM:SS Timezone
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
}

/**
 * This function is used to convert the date and time into a German format:
 * - Uses the simple english format "YYYY-mm-dd" as input.
 *
 * @param date
 */
const convertToGermanFormatFromDate = (date: string|null): string =>
{
    if (date === null) {
        return 'n/a';
    }

    const parts = date.split('-');

    return parts[2] + '.' + parts[1] + '.' + parts[0];
}

/**
 * Returns if the given day is reached.
 *
 * @param day
 * @param month
 * @param year
 */
const isDayReached = (day: number, month: number, year: number): boolean =>
{
    //const dateToday = new Date(2025, 11, 2);
    const dateToday = new Date();
    const dateGiven = new Date(year, month - 1, day);

    return dateToday >= dateGiven;
}

/*
 * Export functions.
 */
export {
    convertToGermanFormat,
    convertToGermanFormatFromDate,
    isDayReached
}
