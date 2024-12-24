/**
 * @file Provides utility functions for date and time formatting.
 *
 * This module contains helper functions to:
 * - Format numbers with leading zeros for consistency.
 * - Extract and format individual components (year, month, day, etc.) from `Date` objects.
 * - Generate formatted strings for time, date, full date-time, and file-safe date-time.
 *
 * Functions:
 * - `padNumber`: Ensures numbers have a specified minimum digit length by padding with zeros.
 * - `getDateComponents`: Breaks down a `Date` object into its components and formats them.
 * - `getTime`: Returns the current time in `HH:MM:SS:MS` format.
 * - `getDate`: Returns the current date in `YYYY-MM-DD` format.
 * - `getFullDateTime`: Returns the current date and time in `YYYY-MM-DD HH:MM:SS:MS` format.
 * - `getFileSafeDateTime`: Returns a date-time string safe for use in filenames.
 *
 * @module date-time-utils
 */

"use strict";

import {Validation} from "../common/validation.js";

/**
 * Formats a number to ensure it has at least `digits` digits by padding with leading zeros.
 * @param {number} number - The number to format.
 * @param {number} digits - The minimum number of digits.
 * @returns {string} The formatted number as a string.
 */
function padNumber(number, digits) {
    return String(number).padStart(digits, '0');
}

/**
 * Extracts and formats components (date and time parts) from a Date object.
 * @param {Date} date - The date object to extract from.
 * @returns {Object} An object containing formatted parts: year, month, day, hours, minutes, seconds, milliseconds.
 */
function getDateComponents(date) {
    return {
        year: date.getFullYear(),
        month: padNumber(date.getMonth() + 1, 2), // Months are zero-based
        day: padNumber(date.getDate(), 2),
        hours: padNumber(date.getHours(), 2),
        minutes: padNumber(date.getMinutes(), 2),
        seconds: padNumber(date.getSeconds(), 2),
        milliseconds: padNumber(date.getMilliseconds(), 3),
    };
}

/**
 * Returns the current time in the format HH:MM:SS:MS.
 * @returns {string} The formatted current time.
 */
export function getTime() {
    const {hours, minutes, seconds, milliseconds} = getDateComponents(new Date());
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

/**
 * Returns the current date in the format YYYY-MM-DD.
 * @returns {string} The formatted current date.
 */
export function getDate() {
    const {year, month, day} = getDateComponents(new Date());
    return `${year}-${month}-${day}`;
}

/**
 * Returns the current date and time in the format YYYY-MM-DD HH:MM:SS:MS.
 * @returns {string} The formatted current date and time.
 */
export function getFullDateTime() {
    const {
        year, month, day, hours, minutes, seconds, milliseconds
    } = getDateComponents(new Date());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

/**
 * Returns a valid date-time string formatted for use in filenames.
 * The format is: YYYY-MM-DD_HH-MM-SS
 * @returns {string} The formatted date-time string for filenames.
 */
export function getFileSafeDateTime() {
    const {year, month, day, hours, minutes, seconds} = getDateComponents(new Date());
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

/**
 * Measures the execution duration of a function and stores it in a variable.
 *
 * @function measureExecutionTime
 * @param {Function} func - The function to measure.
 * @param {...any} args - Arguments to pass to the function.
 * @returns {any} The result of the function execution.
 * @throws {Error} If `func` is not a function.
 */
export function measureExecutionTime(func, ...args) {
    Validation.startsFor(func)
        .checkFunction('Provided argument is not a function.')
        .validate();

    const start = performance.now();
    const result = func(...args);
    const end = performance.now();

    const executionTime = end - start;

    return {result, executionTime};
}
