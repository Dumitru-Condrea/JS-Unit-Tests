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

import {performActionsWithMessage, performActionToArrayOrValue} from "./utils/performable.js";
import {generateUniqueRandomWordsAndNumbers} from "./utils/random-words.js";
import {logWithTimestamp} from "./utils/logs.js";
import Colors from "./utils/colors.js";

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
 * Generated once during module initialization to provide consistent
 * test data across different test scenarios.
 *
 * @type {Array<string>}
 * @constant
 * @example
 * // DEFAULT_VALUES might look like: ["apple", "banana", "cherry", ...]
 */
export const DEFAULT_VALUES = generateUniqueRandomWordsAndNumbers(5);

/**
 * Resets the global array to its original default values.
 *
 * This function is crucial for maintaining test isolation by ensuring
 * each test starts with a clean, predictable array state. It uses the
 * pre-generated DEFAULT_VALUES to repopulate the array.
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Before each test, restore the array to its initial state
 * restoreArrayDefaultValues();
 * // array is now reset to DEFAULT_VALUES
 */
export function restoreArrayDefaultValues() {
    array = [...DEFAULT_VALUES];
}

/**
 * Adds one or multiple values to the end of the array, avoiding duplicates.
 *
 * This function demonstrates a robust method of array population:
 * - Supports adding single values or arrays of values
 * - Prevents duplicate entries
 * - Provides comprehensive logging of the action
 *
 * @param {*|Array<*>} values - Value(s) to be added to the array
 * @function
 *
 * @example
 * // Add a single value
 * addValuesToArray("NewItem");
 *
 * @example
 * // Add multiple values
 * addValuesToArray(["Item1", "Item2"]);
 */
export function addValuesToEndOfArray(values) {
    let addValueIfNotIncluded = (value) => {
        if (!array.includes(value)) array.push(value);
    };

    performActionsWithMessage(() => {
            performActionToArrayOrValue(values, addValueIfNotIncluded);
            printArray("Print modified array:");
        },
        `Add values action triggered with values to add: [${values}]`);
}

/**
 * Removes one or multiple values from the array.
 *
 * Provides a flexible mechanism for array element removal:
 * - Can remove single or multiple values
 * - Uses index-based removal to handle existing elements
 * - Includes detailed logging of removal process
 *
 * @param {string|Array<string>} values - Value(s) to be removed from the array
 * @function
 *
 * @example
 * // Remove a single value
 * removeValuesFromArray("ItemToRemove");
 *
 * @example
 * // Remove multiple values
 * removeValuesFromArray(["Item1", "Item2"]);
 */
export function removeValuesFromArray(values) {
    let removeValueIfIncluded = (value) => {
        let valueToRemove = array.indexOf(value);
        if (valueToRemove > -1) array.splice(valueToRemove, 1);
    };

    performActionsWithMessage(() => {
            performActionToArrayOrValue(values, removeValueIfIncluded);
            printArray("Print modified array:");
        },
        `Remove values from array action is triggered with values to remove: [${values}]`)
}

/**
 * Converts all array elements to string type.
 *
 * This function demonstrates type conversion for array elements:
 * - Uses Array.map() for transformation
 * - Converts each element to its string representation
 * - Provides logging of the conversion process
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Before: array = [1, 2, 3]
 * convertAllValuesToString();
 * // After: array = ["1", "2", "3"]
 */
export function convertAllValuesInArrayToString() {
    performActionsWithMessage(() => {
            array = array.map(value => String(value));
            printArray("Print modified array:");
        },
        "Convert array values to string action is triggered");
}

/**
 * Logs the current state of the array with type information, highlighting changes.
 *
 * This function:
 * - Iterates over an array and compares each element against default values using `compareWithDefaultValues`.
 * - Formats the array with visual highlights:
 *   - New elements or elements with changed types are displayed in **green**.
 *   - Unchanged default values are displayed in **blue**.
 * - Joins the formatted array into a comma-separated string and logs it with a timestamp.
 * - Optionally includes a custom context message to provide clarity in the logs.
 *
 * @param {string} [msg="Print array action is triggered:"] - A custom message to add context for the log action.
 * @function
 *
 * @example
 * // Logs the array contents with a custom context message
 * printArray("Array state after update:");
 *
 * // Example output in logs:
 * // Array state after update:
 * // #42 (type: number), #test (type: string), #true (type: boolean)
 *
 * // Output highlights:
 * // - New elements or type changes are in green.
 * // - Unchanged default values are in blue.
 */
export function printArray(msg) {
    performActionsWithMessage(() =>
            logWithTimestamp(getFormattedArrayWithChanges().join(', ')),
        msg || "Print array action is triggered:");
}

/**
 * Returns an array of values with colorized formatting based on their changes compared to default values.
 *
 * - Default values with no type changes are displayed in blue.
 * - Values with type changes are displayed with the type highlighted in green.
 * - New values (not default) are displayed entirely in green.
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
 * Compares a value against a set of default values to determine if it is default and/or its type has changed.
 *
 * - A value is considered default if it exists in `DEFAULT_VALUES`.
 * - A type change is detected if the value exists in `DEFAULT_VALUES` as a string,
 *   but not as the original type.
 *
 * @param {*} value - The value to compare against default values.
 * @returns {Object} An object with the comparison result:
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