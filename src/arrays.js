"use strict";

import {performActionsWithMessage, performActionToArrayOrValue} from "./utils/performable-utils.js";
import Colors from "./utils/colors.js";
import {generateUniqueRandomWords} from "./utils/random-words.js";

export let array;
export const DEFAULT_VALUES = generateUniqueRandomWords(5);

export function restoreArrayDefaultValues() {
    array = [...DEFAULT_VALUES];
}

export function addValuesToArray(values) {
    let addValueIfNotIncluded = (value) => {
        if (!array.includes(value)) array.push(value);
    };

    performActionsWithMessage(() => {
            performActionToArrayOrValue(values, addValueIfNotIncluded);
            printArray("Print modified array:");
        },
        `Add values action triggered with values to add: [${values}]`);
}

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

export function convertAllValuesInArrayToString() {
    performActionsWithMessage(() => {
            array = array.map(value => String(value));
            printArray("Print modified array:");
        },
        "Convert array values to string action is triggered");
}

export function printArray(msg) {
    performActionsWithMessage(() =>
            console.log((Colors.Blue(array.map(num => `#${num} (type: ${typeof num})`).join(", ")))),
        msg || "Print array action is triggered:");
}
