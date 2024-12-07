"use strict";

import {assert, expect} from 'chai';
import * as testTarget from '../src/arrays.js';
import {performActionsWithMessage} from '../src/utils/performable.js';
import {generateUniqueRandomWordsAndNumbers} from '../src/utils/random-words.js';
import {setupHooks} from "./hooks.js";
import {performStepWithMessage} from "./utils/test-utils.js";

describe('Array', function () {
    performActionsWithMessage(() =>
        setupHooks(), ' ')

    describe('Initialization', function () {
        it('is not empty', () =>
            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    expect(testTarget.array).to.not.be.empty
                },
                'Validate that test default array is not empty.'));

        it('contains default values', () =>
            performStepWithMessage(() =>
                    expect(testTarget.array).to.include.all.members(testTarget.DEFAULT_VALUES,
                        'Actual array doesnt contain default values'),
                'Validate that test default contains default values.'));
    });

    describe('Element Addition', function () {
        it('should add single value to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valuesToAdd, 'start'),
                'Populate default array with custom value.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.include.members(valuesToAdd,
                        'Actual array doesnt contain expected value'),
                'Validate that actual array contains expected value.');

            performStepWithMessage(() =>
                    expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'start'))
                        .to.include.members(valuesToAdd, 'Test value is not added to the start of array'),
                'Validate that test value is added to the start of the array.');
        });

        it('should add single value to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valuesToAdd),
                'Populate default array with custom value.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.include.members(valuesToAdd,
                        'Actual array doesnt contain expected value'),
                'Validate that actual array contains expected value.');

            performStepWithMessage(() =>
                    expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'end'))
                        .to.include.members(valuesToAdd, 'Test value is not added to the end of array'),
                'Validate that test value is added to the end of the array.');
        });

        it('should add multiple values to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valuesToAdd, 'start'),
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.include.members(valuesToAdd,
                        'Actual array doesnt contain expected values'),
                'Validate that actual array contains expected values.');

            performStepWithMessage(() =>
                    expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'start'))
                        .to.include.members(valuesToAdd, 'Added test values is not added to the start of array'),
                'Validate that test values is added to the start of the array.');
        });

        it('should add multiple values to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valuesToAdd),
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.include.members(valuesToAdd,
                        'Actual array doesnt contain expected values'),
                'Validate that actual array contains expected values.');

            performStepWithMessage(() =>
                    expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'end'))
                        .to.include.members(valuesToAdd, 'Added values is not added to the end of array'),
                'Validate that values is added to the end of the array.');
        });

        it('should not contain duplicates in the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    testTarget.addValuesToArray(valueToAdd);
                    testTarget.addValuesToArray(valueToAdd);
                },
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.satisfy(() =>
                            new Set(testTarget.array).size === testTarget.array.length,
                        'Actual array contains duplicates.'),
                'Validate that actual array doesnt contains duplicates.');
        });

        it('should throw an error when adding an unspecified value', () =>
            performStepWithMessage(() =>
                    expect(() => testTarget.addValuesToArray([]))
                        .to.throw('Provided values is null or empty.'),
                'Validate that adding unspecified value throws an error.'));
    });

    describe('Element Removal', function () {
        it('should remove single value from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valueToAdd),
                'Populate default array with custom value.');

            performStepWithMessage(() =>
                    testTarget.removeValuesFromArray(valueToAdd),
                'Remove value from actual array.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members(valueToAdd,
                        'Actual array must not contain removed value.'),
                'Validate that actual array must not contain removed value.');
        });

        it('should remove multiple values from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(3);

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valueToAdd),
                'Populate default array with custom values.');

            performStepWithMessage(() =>
                    testTarget.removeValuesFromArray(valueToAdd),
                'Remove value from actual array.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members(valueToAdd,
                        'Actual array must not contain removed values.'),
                'Validate that actual array must not contain removed value.');
        });

        it('should throw an error when removing with an unspecified value', () =>
            performStepWithMessage(() =>
                    expect(() => testTarget.removeValuesFromArray([]))
                        .to.throw('Provided values is null or empty.'),
                'Validate that removing with an unspecified value throws an error.'));

        it('should remove first element from the start of the array', function () {
            let firstValue = testTarget.array[0];

            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    testTarget.removeValuesFromArrayByCount(1, 'start')
                },
                'Remove first value from actual array.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members([firstValue],
                        'Actual array must not contain first removed value.'),
                'Validate that from the actual array first value is removed.');
        });

        it('should remove last element from the end of the array', function () {
            let lastValue = testTarget.array[testTarget.array.length - 1];

            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    testTarget.removeValuesFromArrayByCount(1, 'end')
                },
                'Remove last value from actual array.');

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members([lastValue],
                        'Actual array must not contain last removed value.'),
                'Validate that from the actual array last value is removed.');
        });

        it('should remove multiple elements from the start of the array', function () {
            let values = testTarget.getElementsByCountFromArray(3, 'start');

            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    testTarget.removeValuesFromArrayByCount(values.length, 'start')
                },
                `Remove [${values.length}] values from teh start of actual array.`);

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members([values],
                        `Actual array must not contain [${values.length}] removed values from the start.`),
                `Validate that from the actual array ${values.length} values is removed from the start.`);
        });

        it('should remove multiple elements from the end of the array', function () {
            let values = testTarget.getElementsByCountFromArray(3, 'end');

            performStepWithMessage(() => {
                    testTarget.printArray('Initial array:');
                    testTarget.removeValuesFromArrayByCount(values.length, 'end')
                },
                `Remove [${values.length}] values from the end of actual array.`);

            performStepWithMessage(() =>
                    expect(testTarget.array).to.not.include.members([values],
                        `Actual array must not contain [${values.length}] removed values from the end.`),
                `Validate that from the actual array ${values.length} values is removed from the end.`);
        });

        it('should throw an error when removing with unspecified count', () =>
            performStepWithMessage(() =>
                    expect(() => testTarget.removeValuesFromArrayByCount())
                        .to.throw('Provided count is null or invalid.'),
                'Validate that removing with unspecified count throws an error.'));

        it('should throw an error when removing with invalid count type', () =>
            performStepWithMessage(() =>
                    expect(() => testTarget.removeValuesFromArrayByCount(''))
                        .to.throw('Provided count is null or invalid.'),
                'Validate that removing with invalid count type throws an error.'));

        it('should throw an error when removing with negative count', () =>
            performStepWithMessage(() =>
                    expect(() => testTarget.removeValuesFromArrayByCount(-1))
                        .to.throw('Provided count is null or invalid.'),
                'Validate that removing with negative count throws an error.'));
    });

    describe('Transformation', function () {
        it('all values in array should be converted to string', function () {
            let valuesToAdd = [1, 2, 3];

            performStepWithMessage(() =>
                    testTarget.addValuesToArray(valuesToAdd),
                'Populate default array with numbers.');

            performStepWithMessage(() => {
                    performActionsWithMessage(() => testTarget.printArray(),
                        'Array before conversation:')
                    testTarget.convertAllValuesInArrayToString();
                },
                'Convert actual array values to string.');

            performStepWithMessage(() => {
                    for (let i = 0; i < testTarget.array.length; i++) {
                        expect(testTarget.array[i]).to.be.a('string',
                            `Expected that value at index of [${i}] = ${testTarget.array[i]}
                    to be a {string}, but is {${typeof testTarget.array[i]}}`);
                    }
                },
                'Verify that all values in array is string value.');
        });
    });

    describe('Array utils', () => {

        describe('isNullOrEmpty()', () => {
            const assertMessage = (flag, value) => `Expected ${flag} for [${value}]`

            it('should return true for null', () =>
                performStepWithMessage(() =>
                        assert.isTrue(testTarget.arrayIsNullOrEmpty(null), assertMessage(true, null)),
                    'Verify that function returns true for null value.'));

            it('should return true for undefined', () =>
                performStepWithMessage(() =>
                        assert.isTrue(testTarget.arrayIsNullOrEmpty(undefined), assertMessage(true, undefined)),
                    'Verify that function returns true for undefined value.'));

            it('should return true for an empty array', () =>
                performStepWithMessage(() =>
                        assert.isTrue(testTarget.arrayIsNullOrEmpty([]), assertMessage(true, [])),
                    'Verify that function returns true for empty array value.'));

            it('should return false for a non-null value', () =>
                performStepWithMessage(() =>
                        assert.isFalse(testTarget.arrayIsNullOrEmpty(1), assertMessage(false, 1)),
                    'Verify that function returns false for non-null value.'));

            it('should return false for a non-empty array', () =>
                performStepWithMessage(() =>
                        assert.isFalse(testTarget.arrayIsNullOrEmpty([1, 2, 3]), assertMessage(false, [1, 2, 3])),
                    'Verify that function returns false for non-empty array value.'));
        });
    });
});