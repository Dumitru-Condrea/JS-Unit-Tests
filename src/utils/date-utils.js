"use strict";

/**
 * Returns the current time in the format HH:MM:SS:MS.
 * @returns {string} The formatted current time.
 */
export function getTime() {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}





