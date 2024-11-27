"use strict";
import {generate} from "random-words";

/**
 * Generates a list of unique random words based on the specified count.
 *
 * @param {number} count - The number of unique random words to generate.
 * @returns {string[]} An array containing the generated unique random words.
 */
export const generateUniqueRandomWords = (count) => {
    if (typeof count !== 'number' || count <= 0) {
        throw new Error("Count must be a positive number.");
    }

    const uniqueWords = new Set();

    while (uniqueWords.size < count) {
        uniqueWords.add(generate(1));
    }

    return [...uniqueWords];
};