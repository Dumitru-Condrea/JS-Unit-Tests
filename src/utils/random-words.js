/**
 * @file Provides a utility function to generate unique random words.
 *
 * This module includes a function that generates a list of unique random words based on a given count.
 * The words are generated using the `random-words` library and stored in a set to ensure uniqueness.
 *
 * Function:
 * - `generateUniqueRandomWords`: Generates a list of unique random words based on the specified count.
 *
 * @module random-word-generator
 */

"use strict";

import {generate} from "random-words";

/**
 * Generates a list of unique random words and numbers based on the specified count.
 *
 * This function generates unique random words using the `random-words` library
 * and unique random numbers. The total count of unique values (words and numbers)
 * is determined by the `count` parameter.
 *
 * @param {number} count - The total number of unique random words and numbers to generate.
 * @returns {(string|number)[]} An array containing the generated unique random words and numbers.
 */
export function generateUniqueRandomWordsAndNumbers(count) {
    if (typeof count !== 'number' || count <= 0) {
        throw new Error("Count must be a positive number.");
    }

    const uniqueValues = new Set();

    while (uniqueValues.size < count) {
        if (Math.random() < 0.5) {
            const [word] = generate(1);
            uniqueValues.add(word);
        } else {
            const number = Math.floor(Math.random() * 10000);
            uniqueValues.add(number);
        }
    }

    return [...uniqueValues];
}