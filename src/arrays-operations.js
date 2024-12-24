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
 * @requires ./utils/validation.js
 */

"use strict";

import {performActionsWithMessage, performActionToArrayOrValue} from './common/performable.js';
import {generateUniqueRandomWordsAndNumbers} from './utils/random-words.js';
import {logWithTimestamp} from '../logging/logs.js';
import {colors} from "../logging/colors.js";
import {Validation} from "./common/validation.js"

/**
 * Global array variable initialized with default unique random words.
 * Serves as the primary data structure for array manipulation operations.
 *
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

/**
 * Sets the global array to the specified values.
 *
 * This function directly updates the global `array` variable with the provided values.
 * Useful for resetting the array during testing or initializing it with specific data.
 *
 * @function setValuesDirectly
 * @param {Array<*>} values - The values to set as the new contents of the global `array`.
 * @returns {void}
 */
export function setValuesDirectly(values) {
    array = [...values];
}

/**
 * Resets the global array to its original default values.
 *
 * This function ensures test isolation by restoring the array to its initial empty state.
 * It is useful in scenarios where the array needs to be cleared before running each test to avoid side effects from previous tests.
 *
 * @function
 * @name clearArray
 * @returns {void}
 */
export function clearArray() {
    array = [];
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
            printArray('Print modified array:');
        });
}

/**
 * Adds values to an array while ensuring the result remains a flat array.
 * If the input values are arrays, they are flattened into the result.
 *
 * @function addValuesToFlatArray
 * @param {...*} values - Values or arrays of values to add to the target array.
 * @throws {Error} If the provided values are null or empty.
 * @returns {Array} The updated flat array with the new values added.
 * @example
 * let myArray = [1, 2, 3];
 * addValuesToFlatArray(myArray, 4, [5, 6], [7, [8, 9]]);
 * console.log(myArray); // Output: [1, 2, 3, 4, 5, 6, 7, [8, 9]]
 */
export function addValuesToFlatArray(values) {
    Validation.startsFor(values)
        .checkNullOrEmpty('Provided values is null or empty.')
        .validate();

    performActionsWithMessage(`Add flat values action triggered with values to add: [${values}]`,
        () => {
            clearArray();
            performActionToArrayOrValue(values, (value) => array.push(value));
            printArray('Print modified array:');
        });
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
            printArray('Print modified array:');
        });
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
    const POSITION_HANDLERS = {
        'start': (arr, cnt) => arr.splice(0, cnt),
        'end': (arr, cnt) => arr.splice(-cnt, cnt),
    };

    Validation.startsFor(count)
        .checkNullOrEmpty('Count is required.')
        .checkNumber('Provided count invalid.')
        .checkPositiveNumber('Provided count must be positive.')
        .check(array.length > 0, 'Array is empty')
        .check(POSITION_HANDLERS[position], `Invalid position specified. Use 'start' or 'end'.`)
        .validate();

    performActionsWithMessage(`Remove values from array action triggered to remove ${count} values from the ${position}`,
        () => {
            POSITION_HANDLERS[position](array, count);
            printArray('Print modified array:');
        });
}

/**
 * Converts all array elements to string type.
 *
 * @function
 * @returns {void}
 */
export function convertAllValuesInArrayToString() {
    performActionsWithMessage('Convert array values to string action triggered',
        () => {
            array = array.map(value => String(value));
            printArray('Print modified array:');
        });
}

/**
 * Retrieves a specified number of elements from the start or end of the array.
 *
 * @param {number} count - The number of elements to retrieve.
 * @param {string} [position='start'] - The position from which to retrieve elements ('start' or 'end').
 * @throws {Error} If the count is invalid.
 * @returns {Array|null} The requested elements or null if the count exceeds the array length.
 */
export function getElementsByCountFromArray(count, position = 'start') {
    const POSITION_HANDLERS = {
        'start': (arr, cnt) => arr.slice(0, cnt),
        'end': (arr, cnt) => arr.slice(-cnt),
    };

    Validation.startsFor(count)
        .checkNullOrEmpty('Count is required.')
        .checkNumber('Count is invalid.')
        .checkPositiveNumber('Count must be positive.')
        .check(array.length > 0, 'Array is empty')
        .check(POSITION_HANDLERS[position], `Invalid position specified. Use 'start' or 'end'.`)
        .validate();

    return POSITION_HANDLERS[position](array, count);
}

/* --------------------- Sorting Functions --------------------- */

/**
 * Sorts a mixed array of numbers and strings using the Bubble Sort algorithm in ascending or descending order.
 *
 * @function bubbleSortMixedArray
 * @param {string} order - The sorting order, either 'asc' for ascending or 'desc' for descending.
 * @throws {Error} If the `order` parameter is not 'asc' or 'desc'.
 */
export function bubbleSortMixedArray(order = 'asc') {
    Validation.startsFor(order)
        .check(['asc', 'desc'].includes(order), "Order must be 'asc' or 'desc'.")
        .validate();

    performActionsWithMessage(`Bubble sort action in ${order} mode is triggered`, () => {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                const comparison = compareMixed(array[j], array[j + 1]);
                if ((order === 'asc' && comparison > 0) || (order === 'desc' && comparison < 0)) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
    });
}

/**
 * Sorts a mixed array of numbers and strings using the Quick Sort algorithm in ascending or descending order.
 *
 * @function quickSortMixedArray
 * @param {string} order - The sorting order, either 'asc' for ascending or 'desc' for descending.
 * @throws {Error} If the `order` parameter is not 'asc' or 'desc'.
 */
export function quickSortMixedArray(order = 'asc') {
    Validation.startsFor(order)
        .check(['asc', 'desc'].includes(order), "Order must be 'asc' or 'desc'.")
        .validate();

    /**
     * Recursively sorts the array using Quick Sort.
     * @param {Array<number|string>} arr - The array to be sorted.
     * @returns {Array<number|string>} The sorted array.
     */
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];
        const equal = [];

        for (const item of arr) {
            const comparison = compareMixed(item, pivot);

            if ((order === 'asc' && comparison < 0) || (order === 'desc' && comparison > 0)) {
                left.push(item);
            } else if ((order === 'asc' && comparison > 0) || (order === 'desc' && comparison < 0)) {
                right.push(item);
            } else {
                equal.push(item);
            }
        }

        return [...quickSort(left), ...equal, ...quickSort(right)];
    }

    performActionsWithMessage(`Quick sort action in ${order} mode is triggered`, () => {
        array = [...quickSort(array)];
    });
}

/**
 * Compares two values (numbers or strings) and determines their relative order.
 *
 * @function compareMixed
 * @param {number|string} a - The first value to compare.
 * @param {number|string} b - The second value to compare.
 * @returns {number} A negative value if `a < b`, a positive value if `a > b`, or 0 if they are equal.
 */
function compareMixed(a, b) {
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
 *
 * This function searches for the provided element in the array and returns it if found, or `undefined` if the element is not present.
 * It also checks if the array is not empty and if the element is provided.
 *
 * @param {any} element - The element to search for in the array.
 * @throws {Error} If the element is not provided or if the array is empty.
 * @returns {any|undefined} Returns the found element if it exists in the array, or `undefined` if not found.
 */
export function getElement(element) {
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
 * Filters string elements longer than the specified length.
 *
 * @param {number} length - The length to compare.
 * @returns {Array} Filtered array of strings.
 * @throws {Error} If the length is invalid or the array is empty.
 */
export function filterStringElementsLongerThan(length) {
    Validation.startsFor(length)
        .checkNullOrEmpty('Length is required.')
        .checkNumber('Provided length is invalid.')
        .checkPositiveNumber('Provided length must be positive.')
        .validate();

    return filterElementsByCondition((item) => typeof item === 'string' && item.length > length);
}

/**
 * Filters string elements smaller than the specified length.
 *
 * @param {number} length - The length to compare.
 * @returns {Array} Filtered array of strings.
 * @throws {Error} If the length is invalid or the array is empty.
 */
export function filterStringElementsSmallerThan(length) {
    Validation.startsFor(length)
        .checkNullOrEmpty('Length is required.')
        .checkNumber('Provided length is invalid.')
        .checkPositiveNumber('Provided length must be positive.')
        .validate();

    return filterElementsByCondition((item) => typeof item === 'string' && item.length < length);
}

/**
 * Filters numbers from the array.
 *
 * @returns {Array<number>} An array of numbers from the array.
 */
export function filterNumbers() {
    return filterElementsByCondition((item) => typeof item === 'number');
}

/**
 * Filters numbers greater than the specified value.
 *
 * @param {number} number - The threshold number.
 * @returns {Array<number>} An array of numbers greater than the specified value.
 * @throws {Error} If the array is empty or invalid, or the number is not a valid number.
 */
export function filterNumbersThatGreaterThan(number) {
    Validation.startsFor(number)
        .checkNullOrEmpty('Number is required.')
        .checkNumber('Provided number is invalid.')
        .validate();

    return filterElementsByCondition((item) => typeof item === 'number' && item > number);
}

/**
 * Filters numbers smaller than the specified value.
 *
 * @param {number} number - The threshold number.
 * @returns {Array<number>} An array of numbers smaller than the specified value.
 * @throws {Error} If the array is empty or invalid, or the number is not a valid number.
 */
export function filterNumbersThatSmallerThan(number) {
    Validation.startsFor(number)
        .checkNullOrEmpty('Number is required.')
        .checkNumber('Provided number is invalid.')
        .validate();

    return filterElementsByCondition((item) => typeof item === 'number' && item < number);
}

/**
 * Filters positive numbers from the array.
 *
 * @returns {Array<number>} An array of positive numbers.
 * @throws {Error} If the array is empty or invalid.
 */
export function filterPositiveNumbersFromArray() {
    return filterElementsByCondition((item) => typeof item === 'number' && item > 0);
}

/**
 * Filters negative numbers from the array.
 *
 * @returns {Array<number>} An array of negative numbers.
 * @throws {Error} If the array is empty or invalid.
 */
export function filterNegativeNumbersFromArray() {
    return filterElementsByCondition((item) => typeof item === 'number' && item < 0);
}

/**
 * Filters elements from the array based on a provided condition.
 *
 * This function iterates over the array and applies the given condition to each element.
 * If the condition returns `true` for an element, the element is included in the resulting array.
 *
 * @param {Function} condition - A function that determines whether an element should be included.
 * The function is called with two arguments: the current element and its index.
 * @throws {Error} If the condition is not provided, is not a function, or if the array is null or empty.
 * @returns {Array} An array containing elements that satisfy the given condition.
 *
 * @example
 * // Example array
 * const array = [1, 2, 3, 4];
 *
 * // Filter elements greater than 2
 * const result = filterElementsByCondition((item) => item > 2);
 * console.log(result); // Output: [3, 4]
 */
export function filterElementsByCondition(condition) {
    Validation.startsFor(condition)
        .checkNullOrEmpty('Condition is required.')
        .checkFunction('Provided argument is not a function.')
        .validate();

    Validation.startsFor(array)
        .checkNullOrEmpty('Array is empty.')
        .validate();

    let values = [];
    let performCondition = (...args) => condition(...args);

    array.forEach((item, index) => {
        if (performCondition(item, index)) {
            values.push(item);
        }
    })

    return values;
}

/* --------------------- Aggregation Functions --------------------- */

/**
 * Calculates the maximum, minimum, sum, and average values from an array of numbers filtered by a specific condition.
 * It filters out all elements that are not of type 'number' and then calculates these values.
 *
 * @function
 * @returns {Object} An object containing the maximum, minimum, sum, and average values from the filtered array.
 *
 * @example
 * const result = getStatsFromArray();
 * console.log(result); // Output: { max: 10, min: 1, average: 5.0 }
 */
export function getStatsFromArray() {
    let numbers = filterNumbers();

    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const sum = numbers.reduce((acc, item) => acc + item, 0);
    const average = sum / numbers.length;

    return {max, min, sum, average};
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
    performActionsWithMessage(msg || 'Print array action triggered:',
        () => logWithTimestamp(getFormattedArrayWithChanges().join(', '), 'custom'));
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
 * Converts array to string type.
 *
 * @function
 * @returns {void}
 */
export function convertArrayToString() {
    performActionsWithMessage('Convert array to string action triggered',
        () => {
            array = array.join(',')
            logWithTimestamp(`Converted array to string: [${colors.Green(array)}]`, 'custom');
        });
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