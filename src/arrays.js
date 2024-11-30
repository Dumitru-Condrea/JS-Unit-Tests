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
import {logWithTimestamp} from "./utils/logs.js";

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
 * Prints the current array state with additional type information.
 *
 * Provides a detailed view of array contents:
 * - Displays each element's value
 * - Shows the type of each element
 * - Supports optional custom message for context
 *
 * @param {string} [msg="Print array action is triggered:"] - Optional message to provide context
 * @function
 *
 * @example
 * // Prints array contents with their types
 * printArray("Checking array after modification");
 */
export function printArray(msg) {
    performActionsWithMessage(() =>
            logWithTimestamp(array.map(num => `#${num} (type: ${typeof num})`).join(", "), 'info'),
        msg || "Print array action is triggered:");
}
