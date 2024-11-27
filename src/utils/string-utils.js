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

