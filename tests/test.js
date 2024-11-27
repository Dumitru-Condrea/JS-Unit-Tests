"use strict";
import {expect} from 'chai';
import * as parent from "../src/arrays.js";
import {setupHooks} from "./hooks.js";
import {performActionsWithMessage, performStepWithMessage} from "../src/utils/performable-utils.js";
import {printArray} from "../src/arrays.js";

describe('Array', function () {
    performActionsWithMessage(() =>
        setupHooks(), "Setup Hooks")

    describe('Initialization', function () {
        it('is not empty', () =>
            performStepWithMessage(() => {
                    printArray("Initial array:");
                    expect(parent.array).to.not.be.empty
                },
                'Validate that test default array is not empty.'));

        it('contains default values', () =>
            performStepWithMessage(() =>
                    expect(parent.array).to.include.all.members(parent.DEFAULT_VALUES,
                        "Actual array doesn't contain default values"),
                'Validate that test default contains default values.'));
    });

    describe('CRUD Actions', function () {
        it('should add values to the array', function () {
            let valuesToAdd = ["House", "Glass", "Fan"];

            performStepWithMessage(() =>
                    parent.addValuesToArray(valuesToAdd),
                'Populate default array with custom values.');


            performStepWithMessage(() =>
                    expect(parent.array).to.include.members(valuesToAdd,
                        "Actual array doesn't contain expected values"),
                'Validate that actual array contains expected values.');
        });

        it('should not contain duplicates in the array', function () {
            let valueToAdd = ["House"];

            performStepWithMessage(() => {
                    parent.printArray("Initial array:");
                    parent.addValuesToArray(valueToAdd);
                    parent.addValuesToArray(valueToAdd);
                },
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    expect(parent.array).to.satisfy(() =>
                            new Set(parent.array).size === parent.array.length,
                        "Actual array contains duplicates."),
                'Validate that actual array doesnt contains duplicates.');
        });

        it('should remove values from the array', function () {
            performStepWithMessage(() =>
                    parent.addValuesToArray("Remove"),
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    parent.removeValuesFromArray("Remove"),
                'Remove value from actual array.');

            performStepWithMessage(() =>
                    expect(parent.array).to.not.include.members(["Remove"],
                        'Actual array must not contain removed values.'),
                'Validate that actual array must not contain removed value.');
        });

        it("all values in array should be converted to string", function () {
            let valuesToAdd = [1, 2, 3];

            performStepWithMessage(() =>
                    parent.addValuesToArray(valuesToAdd),
                'Populate default array with numbers.');

            performStepWithMessage(() => {
                    performActionsWithMessage(() => parent.printArray(),
                        "Array before conversation:")
                    parent.convertAllValuesInArrayToString();
                },
                'Convert actual array values to string.');

            performStepWithMessage(() => {
                    for (let i = 0; i < parent.array.length; i++) {
                        expect(parent.array[i]).to.be.a("string",
                            `Expected that value at index of [${i}] = ${parent.array[i]}
                    to be a {string}, but is {${typeof parent.array[i]}}`);
                    }
                },
                'Verify that all values in array is string value.');
        });
    });
});