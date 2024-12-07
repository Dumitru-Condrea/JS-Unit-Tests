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
 * Checks if a message is non-null and not an empty or whitespace-only string.
 *
 * This utility function validates the input message. If the message is `null`, `undefined`, or an empty string (`''`),
 * the function will return the same value as the result. For any non-falsy value, it checks if the string is
 * not empty and does not consist only of whitespace characters.
 *
 * @param {string|null|undefined} message - The message to check.
 * @returns {boolean|null|undefined|string} - Returns:
 *   - `false` if the message consists only of whitespace characters.
 *   - The original value (`null`, `undefined`, or `''`) if the input is a falsy value.
 *   - `true` if the message is non-null, non-empty, and not whitespace-only.
 */
export const checkIfNotEmptyOrNull = (message) => message && !/^\s*$/.test(message);

/**
 * Removes ANSI escape codes from a string.
 *
 * ANSI escape codes are commonly used for text styling in terminal output
 * (e.g., colors, bold, etc.). This function removes such sequences,
 * returning a plain text string without formatting.
 *
 * @param {string} input - The string containing ANSI escape codes.
 * @returns {string} - The cleaned string with all ANSI escape codes removed.
 *
 * @example
 * const coloredString = '\u001b[31mThis is red text\u001b[0m';
 * const plainString = stripANSIEscapeCodes(coloredString);
 * console.log(plainString); // Output: "This is red text"
 */
export const stripANSIEscapeCodes = (input) => input.replace(/\u001b\[[0-9;]*m/g, "");

/**
 * Removes the "hook title" part from a message string.
 * This is typically used to clean up test hook titles.
 * @param {string} message - The message string containing the hook title.
 * @returns {string} - The cleaned-up message with the hook title removed.
 */
export const getTitleWithoutHook = (message) => message.replace(/^.*? "/, '"');

/**
 * Replaces all occurrences of `this.test.title` in a message with a specified replacement string.
 * This is typically used to dynamically replace test titles in logs or messages.
 *
 * @param {string} message - The message string containing occurrences of `this.test.title`.
 * @param {string} replacement - The string that will replace `this.test.title` in the message.
 * @returns {string} - The updated message with `this.test.title` replaced by the provided `replacement`.
 */
export const replaceDynamicallyTestTitleFromTestContext = (message, replacement) =>
    message.replace(/this\.test\.title/g, replacement);

/**
 * Extracts the hook type value from a given string.
 *
 * @param {string} input - The input string to process.
 * @returns {string} - The first semicolon-separated value.
 */
export function getHookType(input) {
    const match = input.match(/^"([^"]+)"|^([^"\s]+)/);
    return match ? match[1] || match[2] : null;
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