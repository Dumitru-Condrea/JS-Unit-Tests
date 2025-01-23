/**
 * @file Provides array manipulation utilities with logging and random word generation.
 * @module array-utils
 */

"use strict";

import {performActionsWithMessage, performActionToArrayOrValue} from './common/performable.js';
import {logWithTimestamp} from '../logging/logs.js';
import {colors} from "../logging/colors.js";
import {Validation} from "./common/validation.js"
import {generateUniqueRandomWordsAndNumbers} from "./utils/random-words.js";

/**
 * Predefined set of unique random words used as default array values.
 * @type {Array<string>}
 */
export const DEFAULT_VALUES = generateUniqueRandomWordsAndNumbers(5);

/* --------------------- Array Manipulation Functions --------------------- */

/**
 * Adds unique values to an array without duplicates.
 * @param {Array} array - The array to modify.
 * @param {*|Array} values - Values to add.
 * @param {string} [position='end'] - Position to add values ('start' or 'end').
 */
export function addUniqueValues(array, values, position = 'end') {
    Validation.startsFor(array)
        .checkArray('Provided array is invalid.')
        .validate();

    Validation.startsFor(values)
        .checkNullOrEmpty('Provided values is null or empty.')
        .validate();

    let addValueIfNotIncluded = (value) => {
        if (!array.includes(value)) {
            if (position === 'end') {
                array.push(value);
            } else if (position === 'start') {
                array.unshift(value);
            }
        }
    };

    performActionsWithMessage(`Add values action triggered with values to add: [${values}]`,
        () => {
            performActionToArrayOrValue(values, addValueIfNotIncluded);
            logArray(array, 'Print modified array:');
        });
}

/**
 * Replaces the contents of an array with flat values.
 * @param {Array} array - The target array.
 * @param {...*} values - New values or arrays of values.
 */
export function replaceWithFlatValues(array, values) {
    Validation.startsFor(array)
        .checkNullOrEmpty('Provided array is null or empty.')
        .validate();

    Validation.startsFor(values)
        .checkNullOrEmpty('Provided values is null or empty.')
        .validate();

    performActionsWithMessage(`Replacing array contents with values: [${values}]`,
        () => {
            array.length = 0;
            performActionToArrayOrValue(values, (value) => array.push(value));
            logArray(array, 'Modified array:');
        });
}

/**
 * Removes specified values from an array.
 * @param {Array} array - The array to modify.
 * @param {*|Array} values - Values to remove.
 */
export function removeValues(array, values) {
    Validation.startsFor(array)
        .checkNullOrEmpty('Provided array is null or empty.')
        .validate();

    Validation.startsFor(values)
        .checkNullOrEmpty('Provided values is null or empty.')
        .validate();

    let removeValueIfIncluded = (value) => {
        let valueToRemove = array.indexOf(value);
        if (valueToRemove > -1) array.splice(valueToRemove, 1);
    };

    performActionsWithMessage(`Remove values from array action triggered with values to remove: [${values}]`,
        () => {
            performActionToArrayOrValue(values, removeValueIfIncluded);
            logArray(array, 'Print modified array:');
        });
}

/**
 * Removes a specified number of values from the start or end of an array.
 * @param {Array} array - The array to modify.
 * @param {number} count - Number of elements to remove.
 * @param {string} [position='start'] - Position to remove from ('start' or 'end').
 */
export function removeByCount(array, count, position = 'start') {
    const POSITION_HANDLERS = {
        'start': (arr, cnt) => arr.splice(0, cnt),
        'end': (arr, cnt) => arr.splice(-cnt, cnt),
    };

    Validation.startsFor(array)
        .checkArray('Provided array is invalid.')
        .checkNullOrEmpty('Array is empty.')
        .validate();

    Validation.startsFor(count)
        .checkNullOrEmpty('Count is required.')
        .checkNumber('Provided count invalid.')
        .checkPositiveNumber('Provided count must be positive.')
        .check(POSITION_HANDLERS[position], `Invalid position specified. Use 'start' or 'end'.`)
        .validate();

    performActionsWithMessage(`Remove values from array action triggered to remove ${count} values from the ${position}`,
        () => {
            POSITION_HANDLERS[position](array, count);
            logArray(array, 'Print modified array:');
        });
}

/**
 * Converts all array elements to string type.
 * @param {Array} array - The array to modify.
 */
export function convertToStrings(array) {
    performActionsWithMessage('Convert array values to string action triggered',
        () => {
            const newArray = array.map(value => String(value));
            array.length = 0;
            array.push(...newArray);
            logArray(array, 'Print modified array:');
        });
}

/**
 * Retrieves a specified number of elements from the start or end of an array.
 * @param {Array} array - The array to retrieve from.
 * @param {number} count - Number of elements to retrieve.
 * @param {string} [position='start'] - Position to retrieve from ('start' or 'end').
 * @returns {Array|null} Retrieved elements or null if count exceeds array length.
 */
export function getElements(array, count, position = 'start') {
    const POSITION_HANDLERS = {
        'start': (arr, cnt) => arr.slice(0, cnt),
        'end': (arr, cnt) => arr.slice(-cnt),
    };

    Validation.startsFor(count)
        .checkNullOrEmpty('Count is required.')
        .checkNumber('Count is invalid.')
        .checkPositiveNumber('Count must be positive.')
        .check(Array.isArray(array), 'Array is invalid.')
        .check(array.length > 0, 'Array is empty.')
        .check(POSITION_HANDLERS[position], `Invalid position specified. Use 'start' or 'end'.`)
        .validate();

    return POSITION_HANDLERS[position](array, count);
}

/* --------------------- Sorting Functions --------------------- */

/**
 * Sorts a mixed array of numbers and strings using the Bubble Sort algorithm.
 * @param {Array} array - The array to sort.
 * @param {string} [order='asc'] - Sorting order ('asc' or 'desc').
 */
export function bubbleSort(array, order = 'asc') {
    Validation.startsFor(array)
        .checkArray('Provided array is invalid.')
        .checkNullOrEmpty('Provided array is null or empty.')
        .validate();

    Validation.startsFor(order)
        .check(['asc', 'desc'].includes(order), "Order must be 'asc' or 'desc'.")
        .validate();

    performActionsWithMessage(`Bubble sort action in ${order} mode is triggered`, () => {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                const comparison = compareValues(array[j], array[j + 1]);
                if ((order === 'asc' && comparison > 0) || (order === 'desc' && comparison < 0)) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
    });
}

/**
 * Sorts a mixed array of numbers and strings using the Quick Sort algorithm.
 * @param {Array} array - The array to sort.
 * @param {string} [order='asc'] - Sorting order ('asc' or 'desc').
 */
export function quickSort(array, order = 'asc') {
    Validation.startsFor(array)
        .checkArray('Provided array is invalid.')
        .checkNullOrEmpty('Provided array is null or empty.')
        .validate();

    Validation.startsFor(order)
        .check(['asc', 'desc'].includes(order), "Order must be 'asc' or 'desc'.")
        .validate();

    /**
     * Recursively sorts the array using Quick Sort.
     * @param {Array<number|string>} arr - The array to be sorted.
     * @returns {Array<number|string>} The sorted array.
     */
    function sort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];
        const equal = [];

        for (const item of arr) {
            const comparison = compareValues(item, pivot);

            if ((order === 'asc' && comparison < 0) || (order === 'desc' && comparison > 0)) {
                left.push(item);
            } else if ((order === 'asc' && comparison > 0) || (order === 'desc' && comparison < 0)) {
                right.push(item);
            } else {
                equal.push(item);
            }
        }

        return [...sort(left), ...equal, ...sort(right)];
    }

    performActionsWithMessage(`Quick sort action in ${order} mode is triggered`, () => {
        const sortedArray = sort(array);
        array.length = 0;
        array.push(...sortedArray);
    });
}

/**
 * Compares two values for sorting.
 * @param {*} a - First value.
 * @param {*} b - Second value.
 * @returns {number} Comparison result.
 */
function compareValues(a, b) {
    const numA = Number(a);
    const numB = Number(b);

    if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
    }

    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    }

    return numA.toString().localeCompare(b.toString());
}

/* --------------------- Filtering Functions --------------------- */

/**
 * Retrieves an element from an array by its value.
 * @param {Array} array - The array to search.
 * @param {*} element - The element to find.
 * @returns {*|undefined} The found element, or undefined if not found.
 */
export function getElementByValue(array, element) {
    Validation.startsFor(element)
        .checkNullOrEmpty('Element is required.')
        .validate();

    Validation.startsFor(array)
        .checkNullOrEmpty('Array is empty.')
        .validate();

    const index = array.indexOf(element);
    return index !== -1 ? array[index] : undefined;
}

/**
 * Filters string elements longer than a specified length.
 * @param {Array} array - The array to filter.
 * @param {number} length - The minimum length of strings to keep.
 * @returns {Array<string>} Filtered array of strings.
 */
export function filterStringsLongerThan(array, length) {
    Validation.startsFor(length)
        .checkNullOrEmpty('Length is required.')
        .checkNumber('Provided length is invalid.')
        .checkPositiveNumber('Provided length must be positive.')
        .validate();

    return filterByCondition(array, (item) => typeof item === 'string' && item.length > length);
}

/**
 * Filters string elements shorter than a specified length.
 * @param {Array} array - The array to filter.
 * @param {number} length - The maximum length of strings to keep.
 * @returns {Array<string>} Filtered array of strings.
 */
export function filterStringsShorterThan(array, length) {
    Validation.startsFor(length)
        .checkNullOrEmpty('Length is required.')
        .checkNumber('Provided length is invalid.')
        .checkPositiveNumber('Provided length must be positive.')
        .validate();

    return filterByCondition(array, (item) => typeof item === 'string' && item.length < length);
}

/**
 * Filters numbers from the array.
 * @param {Array} array - The array to filter.
 * @returns {Array<number>} An array of numbers.
 */
export function filterNumbers(array) {
    return filterByCondition(array, (item) => typeof item === 'number');
}

/**
 * Filters numbers greater than a specified value.
 * @param {Array} array - The array to filter.
 * @param {number} threshold - The minimum value to keep.
 * @returns {Array<number>} Filtered numbers.
 */
export function filterNumbersGreaterThan(array, threshold) {
    Validation.startsFor(threshold)
        .checkNullOrEmpty('Number is required.')
        .checkNumber('Provided number is invalid.')
        .validate();

    return filterByCondition(array, (item) => typeof item === 'number' && item > threshold);
}

/**
 * Filters numbers smaller than a specified value.
 * @param {Array} array - The array to filter.
 * @param {number} threshold - The maximum value to keep.
 * @returns {Array<number>} Filtered numbers.
 */
export function filterNumbersSmallerThan(array, threshold) {
    Validation.startsFor(threshold)
        .checkNullOrEmpty('Number is required.')
        .checkNumber('Provided number is invalid.')
        .validate();

    return filterByCondition(array, (item) => typeof item === 'number' && item < threshold);
}

/**
 * Filters positive numbers from the array.
 * @param {Array} array - The array to filter.
 * @returns {Array<number>} An array of positive numbers.
 */
export function filterPositiveNumbers(array) {
    return filterByCondition(array, (item) => typeof item === 'number' && item > 0);
}

/**
 * Filters negative numbers from the array.
 * @param {Array} array - The array to filter.
 * @returns {Array<number>} An array of negative numbers.
 */
export function filterNegativeNumbers(array) {
    return filterByCondition(array, (item) => typeof item === 'number' && item < 0);
}

/**
 * Filters elements in the array based on a condition.
 * @param {Array} array - The array to filter.
 * @param {Function} condition - A function to determine if an element should be included.
 * @returns {Array} Filtered array.
 */
export function filterByCondition(array, condition) {
    Validation.startsFor(condition)
        .checkNullOrEmpty('Condition is required.')
        .checkFunction('Provided argument is not a function.')
        .validate();

    Validation.startsFor(array)
        .checkNullOrEmpty('Array is empty.')
        .validate();

    return array.filter(condition);
}

/* --------------------- Aggregation Functions --------------------- */

/**
 * Calculates the maximum, minimum, sum, and average of numeric values in an array.
 * @param {Array} array - The array to process.
 * @returns {Object} An object containing max, min, sum, and average.
 */
export function calculateStats(array) {
    let numbers = filterNumbers(array);

    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const sum = numbers.reduce((acc, item) => acc + item, 0);
    const average = sum / numbers.length;

    return {max, min, sum, average};
}

/* --------------------- Utility Functions --------------------- */

/**
 * Logs the contents of an array with type information.
 * @param {Array} array - The array to log.
 * @param {string} [msg='Array log:'] - Custom message for the log.
 */
export function logArray(array, msg) {
    performActionsWithMessage(msg || 'Print array action triggered:',
        () => logWithTimestamp(formatArrayWithChanges(array).join(', '), 'custom'));
}

/**
 * Formats an array with colorized changes based on default values.
 * @param {Array} array - The array to format.
 * @returns {Array<string>} The formatted array as strings.
 */
function formatArrayWithChanges(array) {
    const formattedArray = [];

    array.forEach((value) => {
        const comparisonResult = compareWithDefaultValues(value);

        if (comparisonResult.isDefaultValue && !comparisonResult.isTypeChanged) {
            formattedArray.push(colors.Blue(`#${value} (type: ${typeof value})`));
        } else if (comparisonResult.isTypeChanged) {
            formattedArray.push(colors.Blue(`#${value} (${colors.Green(`type: ${typeof value}`)})`));
        } else {
            formattedArray.push(colors.Green(`#${value} (type: ${typeof value})`));
        }
    });

    return formattedArray;
}

/**
 * Compares a value with default values to determine changes.
 * @param {*} value - The value to compare.
 * @returns {Object} Comparison result with isDefaultValue and isTypeChanged.
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
 * Converts an array to a string.
 * @param {Array} array - The array to convert.
 * @returns {string} The array as a comma-separated string.
 */
export function arrayToString(array) {
    let convertedArray;

    performActionsWithMessage('Convert array to string action triggered',
        () => {
            convertedArray = array.join(',')
            logWithTimestamp(`Converted array to string: [${colors.Green(array)}]`, 'custom');
        });

    return convertedArray;
}

/**
 * Checks if an array is null, undefined, or empty.
 * @param {Array} array - The array to check.
 * @returns {boolean} True if null, undefined, or empty; otherwise false.
 */
export function arrayIsNullOrEmpty(array) {
    return array == null || (Array.isArray(array) && array.length === 0);
}