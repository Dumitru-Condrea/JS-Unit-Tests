/**
 * @file Provides utility functions for string processing, hook type extraction, and environment variable handling.
 *
 * This file contains several utility functions used for checking if a string is non-empty,
 * extracting hook types, cleaning up message strings, and converting environment variables into boolean values.
 *
 * Functions:
 * - `checkIfNotEmptyOrNull`: Checks if a string is non-null and non-empty.
 * - `getHookType`: Extracts the hook type from a given string.
 * - `getTitleWithoutHook`: Cleans up the hook title from a message string.
 * - `envStringToBooleanNumber`: Converts a string value from an environment variable to a boolean-like number.
 *
 * @module string-utils
 */

"use strict";

/**
 * Checks if a message is not empty or null.
 *
 * This utility function is used to check if a message is neither null nor an empty or whitespace-only string.
 *
 * @param {string} message - The message to check.
 * @returns {boolean} - Returns true if the message is non-null and non-empty, false otherwise.
 */
export const checkIfNotEmptyOrNull = (message) => message && !/^\s*$/.test(message);

/**
 * Extracts the hook type value from a given string.
 *
 * @param {string} input - The input string to process.
 * @returns {string} - The first semicolon-separated value.
 */export function getHookType(input) {
    const match = input.match(/^"([^"]+)"|^([^"\s]+)/);
    return match ? (match[1] || match[2]) : null;
}

/**
 * Removes the "hook title" part from a message string.
 * This is typically used to clean up test hook titles.
 * @param {string} message - The message string containing the hook title.
 * @returns {string} - The cleaned-up message with the hook title removed.
 */
export function getTitleWithoutHook(message) {
    return message.replace(/^.*? "/, '"');
}

/**
 * Converts a string value from an environment variable to a boolean-like number.
 * Supports common truthy and falsy string representations, case-insensitive.
 *
 * Truthy values (returns 1): "true", "1", "yes", "on".
 * Falsy values (returns 0): "false", "0", "no", "off".
 *
 * Any other value is treated as falsy (returns 0).
 *
 * @param {string} value - The string value to convert (usually from an environment variable).
 * @returns {number} 1 for truthy values, 0 for falsy or invalid values.
 */
export function envStringToBooleanNumber(value) {
    if (typeof value !== "string") return 0;

    const truthyValues = ["true", "1", "yes", "on"];
    const falsyValues = ["false", "0", "no", "off"];

    const normalizedValue = value.trim().toLowerCase();

    if (truthyValues.includes(normalizedValue)) return 1;
    if (falsyValues.includes(normalizedValue)) return 0;

    return 0;
}
