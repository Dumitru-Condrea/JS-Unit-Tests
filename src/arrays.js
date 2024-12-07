/**
 * @file Provides array manipulation utilities with logging and random word generation.
 *
 * This module offers functions to modify and interact with an array,
 * including adding/removing values, converting types, and printing array contents.
 *
 * @module array-utils
 * @requires ./utils/performable.js
 * @requires ./utils/random-words.js
 * @requires ./utils/logs.js
 */

"use strict";

import {performActionsWithMessage, performActionToArrayOrValue} from './utils/performable.js';
import {generateUniqueRandomWordsAndNumbers} from './utils/random-words.js';
import {logWithTimestamp} from './utils/logs.js';
import Colors from './utils/colors.js';

/**
 * Global array variable initialized with default unique random words.
 * Serves as the primary data structure for array manipulation operations.
 *
 * @type {Array<string>}
 * @global
 */
export let array;

/**
 * Predefined set of unique random words used as default array values.
 *
 * Generated once during module initialization to provide consistent
 * test data across different test scenarios.
 *
 * @type {Array<string>}
 * @constant
 */
export const DEFAULT_VALUES = generateUniqueRandomWordsAndNumbers(5);

/**
 * Resets the global array to its original default values.
 *
 * This function ensures test isolation by restoring the array to its initial state.
 *
 * @function
 * @returns {void}
 */
export function restoreArrayDefaultValues() {
    array = [...DEFAULT_VALUES];
}

/* --------------------- Array Manipulation Functions --------------------- */

/**
 * Adds one or multiple values to the array, avoiding duplicates.
 *
 * @param {*|Array<*>} values - Value(s) to be added to the array.
 * @param {string} [position='end'] - The position where the values should be added. Can be `'start'` or `'end'`.
 * @throws {Error} If the provided values are null or empty.
 * @function
 * @returns {void}
 */
export function addValuesToArray(values, position = 'end') {
    if (arrayIsNullOrEmpty(values)) throw new Error('Provided values is null or empty.');

    let addValueIfNotIncluded = (value) => {
        if (!array.includes(value)) {
            if (position === 'end') {
                array.push(value);
            } else if (position === 'start') {
                array.unshift(value);
            }
        }
    };

    performActionsWithMessage(() => {
            performActionToArrayOrValue(values, addValueIfNotIncluded);
            printArray('Print modified array:');
        },
        `Add values action triggered with values to add: [${values}]`);
}

/**
 * Removes one or multiple values from the array.
 *
 * @param {string|Array<string>} values - Value(s) to be removed from the array.
 * @throws {Error} If the provided values are null or empty.
 * @function
 * @returns {void}
 */
export function removeValuesFromArray(values) {
    if (arrayIsNullOrEmpty(values)) throw new Error('Provided values is null or empty.');

    let removeValueIfIncluded = (value) => {
        let valueToRemove = array.indexOf(value);
        if (valueToRemove > -1) array.splice(valueToRemove, 1);
    };

    performActionsWithMessage(() => {
            performActionToArrayOrValue(values, removeValueIfIncluded);
            printArray('Print modified array:');
        },
        `Remove values from array action triggered with values to remove: [${values}]`);
}

/**
 * Removes a specified number of values from the array, either from the start or the end.
 *
 * @param {number} count - The number of elements to remove.
 * @param {string} [position='start'] - The position from which to remove elements (`'start'` or `'end'`).
 * @throws {Error} If the count is invalid or null.
 * @returns {Array<*>} The removed elements as an array.
 */
export function removeValuesFromArrayByCount(count, position = 'start') {
    if (arrayIsNullOrEmpty(count) || typeof count !== 'number' || count <= 0) {
        throw new Error('Provided count is null or invalid.');
    }

    let action = () => {
        if (position === 'start') {
            array.splice(0, count);
        } else if (position === 'end') {
            array.splice(-count, count);
        } else {
            throw new Error(`Invalid position specified. Use 'start' or 'end'.`);
        }
    };

    performActionsWithMessage(() => {
            action();
            printArray('Print modified array:');
        },
        `Remove values from array action triggered to remove ${count} values from the ${position}`);
}

/**
 * Converts all array elements to string type.
 *
 * @function
 * @returns {void}
 */
export function convertAllValuesInArrayToString() {
    performActionsWithMessage(() => {
            array = array.map(value => String(value));
            printArray('Print modified array:');
        },
        'Convert array values to string action triggered');
}

/**
 * Retrieves a specified number of elements from the start or end of the array.
 *
 * @param {number} count - The number of elements to retrieve.
 * @param {string} [type='start'] - The position from which to retrieve elements ('start' or 'end').
 * @throws {Error} If the count is invalid.
 * @returns {Array|null} The requested elements or null if the count exceeds the array length.
 */
export function getElementsByCountFromArray(count, type = 'start') {
    if (typeof count !== 'number' || count < 0) {
        throw new Error('Count must be a non-negative number.');
    }

    if (count > array.length) {
        return null;
    }

    let values = [];
    if (type === 'start') {
        values = array.slice(0, count);
    } else if (type === 'end') {
        values = array.slice(-count);
    } else {
        throw new Error('Invalid type. Use \'start\' or \'end\'.');
    }

    return values;
}

/* --------------------- Utility Functions --------------------- */

/**
 * Logs the current state of the array with type information, highlighting changes.
 *
 * @param {string} [msg='Print array action triggered:'] - A custom message for the log action.
 * @function
 * @returns {void}
 */
export function printArray(msg) {
    performActionsWithMessage(() =>
            logWithTimestamp(getFormattedArrayWithChanges().join(', ')),
        msg || 'Print array action triggered:');
}

/**
 * Returns an array of values with colorized formatting based on changes compared to default values.
 *
 * @returns {string[]} An array of colorized strings representing the formatted values.
 */
function getFormattedArrayWithChanges() {
    const formattedArray = [];

    array.forEach((value) => {
        const comparisonResult = compareWithDefaultValues(value);

        if (comparisonResult.isDefaultValue && !comparisonResult.isTypeChanged) {
            formattedArray.push(Colors.Blue(`#${value} (type: ${typeof value})`));
        } else if (comparisonResult.isTypeChanged) {
            formattedArray.push(Colors.Blue(`#${value} (${Colors.Green(`type: ${typeof value}`)})`));
        } else {
            formattedArray.push(Colors.Green(`#${value} (type: ${typeof value})`));
        }
    });

    return formattedArray;
}

/**
 * Compares a value against default values to determine if it is default and/or its type has changed.
 *
 * @param {*} value - The value to compare.
 * @returns {Object} The comparison result:
 *                   - `isDefaultValue` (boolean): True if the value is a default value.
 *                   - `isTypeChanged` (boolean): True if the type of the value has changed.
 */
function compareWithDefaultValues(value) {
    const comparisonResult = {
        isDefaultValue: true,
        isTypeChanged: false
    };

    if (!DEFAULT_VALUES.includes(value)) {
        const defaultValuesAsStrings = [...DEFAULT_VALUES].map(String);

        if (defaultValuesAsStrings.includes(String(value))) {
            comparisonResult.isTypeChanged = true;
        } else {
            comparisonResult.isDefaultValue = false;
        }
    }

    return comparisonResult;
}

/**
 * Checks if a value (single or array) is null, undefined, or empty.
 *
 * @param {*|Array<*>|null|undefined} array - The value to check.
 * @returns {boolean} True if the value is null, undefined, or empty; otherwise, false.
 */
export function arrayIsNullOrEmpty(array) {
    return array == null || (Array.isArray(array) && array.length === 0);
}