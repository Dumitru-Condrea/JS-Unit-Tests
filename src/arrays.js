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
import {generateUniqueRandomWords} from "./utils/random-words.js";
import {logWithTimestamp, styleMessage} from "./utils/logs.js";

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
export const DEFAULT_VALUES = generateUniqueRandomWords(10);

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
 * Logs the current state of the array with type information and highlights changes.
 *
 * This function iterates over an array and:
 * - Checks each element using `checkIfValueIsNotDefault`.
 * - Builds a detailed message for each element, including its value and type.
 * - Highlights new elements or those whose types have changed in **green** for better visibility in logs.
 *
 * The final message is logged with a timestamp, preceded by an optional custom context message.
 *
 * @param {string} [msg="Print array action is triggered:"] - An optional message providing context for the log action.
 *
 * @function
 *
 * @example
 * // Logs the array contents with context
 * printArray("Array state after update:");
 *
 * // Example output in logs:
 * // #42 (type: number) [highlighted in green for new or changed elements]
 * // #true (type: boolean) [normal style for unchanged elements]
 */
export function printArray(msg) {
    let buildModifiedArrayMessage = () => {
        let message = ''
        for (let i = 0; i < array.length; i++) {
            message += checkIfValueIsNotDefault(array[i])
                ? styleMessage(`#${array[i]} (type: ${typeof array[i]}) `, 'new')
                : styleMessage(`#${array[i]} (type: ${typeof array[i]}) `, 'info')
        }
        return message;
    };

    performActionsWithMessage(() => logWithTimestamp(buildModifiedArrayMessage()),
        msg || "Print array action is triggered:");
}

/**
 * Checks if a given value is not a default value.
 *
 * This function determines whether a given value is absent from the
 * `DEFAULT_VALUES` array or if the type of the value in the `DEFAULT_VALUES`
 * array does not match the type of the value in the `array` parameter.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is not default or the types mismatch, otherwise `false`.
 */
export function checkIfValueIsNotDefault(value) {
    if (DEFAULT_VALUES.indexOf(value) === -1) {
        return true;
    }

    return typeof DEFAULT_VALUES[DEFAULT_VALUES.indexOf(value)] !== typeof array[array.indexOf(value)];
}
