"use strict";

import {assert, expect} from 'chai';
import * as testTarget from '../src/arrays.js';
import {performActionsWithMessage} from '../src/utils/performable.js';
import {generateUniqueRandomWordsAndNumbers} from '../src/utils/random-words.js';
import {setupHooks} from "./hooks.js";
import {performStepWithMessage as step} from "./utils/test-utils.js";
import {measureExecutionTime} from "../src/utils/date-time.js";
import {logWithTimestamp} from "../src/utils/logs.js";
import {colors} from "../src/utils/colors.js";

describe('Array', function () {
    performActionsWithMessage(' ', () => setupHooks())

    describe('Initialization', function () {
        it('is not empty', () =>
            step('Validate that test default array is not empty.', () => {
                testTarget.printArray('Initial array:');
                expect(testTarget.array).to.not.be.empty
            }));

        it('contains default values', () =>
            step('Validate that test default contains default values.', () =>
                expect(testTarget.array).to.include.all.members(testTarget.DEFAULT_VALUES,
                    'Actual array doesnt contain default values')
            ));
    });

    describe('Element Addition', function () {
        it('should add single value to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addValuesToArray(valuesToAdd, 'start'));

            step('Validate that actual array contains expected value.', () =>
                expect(testTarget.array).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected value'));

            step('Validate that test value is added to the start of the array.', () =>
                expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'start'))
                    .to.include.members(valuesToAdd, 'Test value is not added to the start of array'));
        });

        it('should add single value to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addValuesToArray(valuesToAdd));

            step('Validate that actual array contains expected value.', () =>
                expect(testTarget.array).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected value'));

            step('Validate that test value is added to the end of the array.', () =>
                expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'end'))
                    .to.include.members(valuesToAdd, 'Test value is not added to the end of array'));
        });

        it('should add multiple values to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addValuesToArray(valuesToAdd, 'start'));

            step('Validate that actual array contains expected values.', () =>
                expect(testTarget.array).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected values'));

            step('Validate that test values is added to the start of the array.', () =>
                expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'start'))
                    .to.include.members(valuesToAdd, 'Added test values is not added to the start of array'));
        });

        it('should add multiple values to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addValuesToArray(valuesToAdd));

            step('Validate that actual array contains expected values.', () =>
                expect(testTarget.array).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected values'));

            step('Validate that values is added to the end of the array.', () =>
                expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'end'))
                    .to.include.members(valuesToAdd, 'Added values is not added to the end of array'));
        });

        it('should not contain duplicates in the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom values.', () => {
                testTarget.printArray('Initial array:');
                testTarget.addValuesToArray(valueToAdd);
                testTarget.addValuesToArray(valueToAdd);
            });

            step('Validate that actual array doesnt contains duplicates.', () =>
                expect(testTarget.array).to.satisfy(() =>
                        new Set(testTarget.array).size === testTarget.array.length,
                    'Actual array contains duplicates.'));
        });

        it('should throw an error when adding an unspecified value', () =>
            step('Validate that adding unspecified value throws an error.', () =>
                expect(() => testTarget.addValuesToArray([]))
                    .to.throw('Provided values is null or empty.')));

        it('should add single value to the flat array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom flat value.', () =>
                testTarget.addValuesToFlatArray(valueToAdd));

            step('Validate that actual array contains only added value.', () =>
                expect(testTarget.array).to.have.deep.members(valueToAdd).and.have.lengthOf(valueToAdd.length));
        });

        it('should add multiple values to the flat array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom flat values.', () =>
                testTarget.addValuesToFlatArray(valuesToAdd));

            step('Validate that actual array contains only added values.', () =>
                expect(testTarget.array).to.have.deep.members(valuesToAdd).and.have.lengthOf(valuesToAdd.length));
        });

        it('should throw an error when adding an unspecified value to the flat array', () =>
            step('Validate that adding unspecified value to the flat array throws an error.', () =>
                expect(() => testTarget.addValuesToFlatArray())
                    .to.throw('Provided values is null or empty.')));
    });

    describe('Element Removal', function () {
        it('should remove single value from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addValuesToArray(valueToAdd));

            step('Remove value from actual array.', () =>
                testTarget.removeValuesFromArray(valueToAdd));

            step('Validate that actual array must not contain removed value.', () =>
                expect(testTarget.array).to.not.include.members(valueToAdd,
                    'Actual array must not contain removed value.'));
        });

        it('should remove multiple values from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addValuesToArray(valueToAdd));

            step('Remove value from actual array.', () =>
                testTarget.removeValuesFromArray(valueToAdd));

            step('Validate that actual array must not contain removed value.', () =>
                expect(testTarget.array).to.not.include.members(valueToAdd,
                    'Actual array must not contain removed values.'));
        });

        it('should throw an error when removing with an unspecified value', () =>
            step('Validate that removing with an unspecified value throws an error.', () =>
                expect(() => testTarget.removeValuesFromArray([]))
                    .to.throw('Provided values is null or empty.')));

        it('should remove first element from the start of the array', function () {
            let firstValue = testTarget.array[0];

            step('Remove first value from actual array.', () => {
                testTarget.printArray('Initial array:');
                testTarget.removeValuesFromArrayByCount(1, 'start')
            });

            step('Validate that from the actual array first value is removed.', () =>
                expect(testTarget.array).to.not.include.members([firstValue],
                    'Actual array must not contain first removed value.'));
        });

        it('should remove last element from the end of the array', function () {
            let lastValue = testTarget.array[testTarget.array.length - 1];

            step('Remove last value from actual array.', () => {
                testTarget.printArray('Initial array:');
                testTarget.removeValuesFromArrayByCount(1, 'end')
            });

            step('Validate that from the actual array last value is removed.', () =>
                expect(testTarget.array).to.not.include.members([lastValue],
                    'Actual array must not contain last removed value.'));
        });

        it('should remove multiple elements from the start of the array', function () {
            let values = testTarget.getElementsByCountFromArray(3, 'start');

            step(`Remove [${values.length}] values from teh start of actual array.`, () => {
                testTarget.printArray('Initial array:');
                testTarget.removeValuesFromArrayByCount(values.length, 'start')
            });

            step(`Validate that from the actual array ${values.length} values is removed from the start.`, () =>
                expect(testTarget.array).to.not.include.members([values],
                    `Actual array must not contain [${values.length}] removed values from the start.`));
        });

        it('should remove multiple elements from the end of the array', function () {
            let values = testTarget.getElementsByCountFromArray(3, 'end');

            step(`Remove [${values.length}] values from the end of actual array.`, () => {
                testTarget.printArray('Initial array:');
                testTarget.removeValuesFromArrayByCount(values.length, 'end')
            });

            step(`Validate that from the actual array ${values.length} values is removed from the end.`, () =>
                expect(testTarget.array).to.not.include.members([values],
                    `Actual array must not contain [${values.length}] removed values from the end.`));
        });

        it('should throw an error when removing with unspecified count', () =>
            step('Validate that removing with unspecified count throws an error.', () =>
                expect(() => testTarget.removeValuesFromArrayByCount())
                    .to.throw('Provided count is null or invalid.')));

        it('should throw an error when removing with unspecified count', () =>
            step('Validate that removing with unspecified count throws an error.', () =>
                expect(() => testTarget.removeValuesFromArrayByCount())
                    .to.throw('Provided count is null or invalid.')));

        it('should throw an error when removing with invalid count type', () =>
            step('Validate that removing with invalid count type throws an error.', () =>
                expect(() => testTarget.removeValuesFromArrayByCount(''))
                    .to.throw('Provided count is null or invalid.')));

        it('should throw an error when removing with negative count', () =>
            step('Validate that removing with negative count throws an error.', () =>
                expect(() => testTarget.removeValuesFromArrayByCount(-1))
                    .to.throw('Provided count is null or invalid.')));

        it('should throw an error when removing with invalid position value', () =>
            step('Validate that removing with invalid position value throws an error.', () =>
                expect(() => testTarget.removeValuesFromArrayByCount(1, 'abc'))
                    .to.throw("Invalid position specified. Use 'start' or 'end'.")));
    });

    describe('Transformation', function () {
        it('all values in array should be converted to string', function () {
            let valuesToAdd = [1, 2, 3];

            step('Populate default array with numbers.', () =>
                testTarget.addValuesToArray(valuesToAdd));

            step('Convert actual array values to string.', () => {
                testTarget.printArray('Array before conversation:');
                testTarget.convertAllValuesInArrayToString();
            });

            step('Verify that all values in array is string value.', () => {
                for (let i = 0; i < testTarget.array.length; i++) {
                    expect(testTarget.array[i]).to.be.a('string',
                        `Expected that value at index of [${i}] = ${testTarget.array[i]}
                    to be a {string}, but is {${typeof testTarget.array[i]}}`);
                }
            });
        });

        it('array should be converted to string', function () {
            let initialArray = [...testTarget.array];

            step('Convert array to string.', () =>
                testTarget.convertArrayToString());

            step('Validate that array is converted to string.', () =>
                expect(testTarget.array).to.equal(initialArray.join(',')));
        });
    });

    describe('Sorting', function () {
        it('should bubble sort the array in ascending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.addValuesToFlatArray([10, "apple", 5, "banana", "3", 7]));

            step('Sort array in ascending order.', () => {
                testTarget.bubbleSortMixedArray('asc');
                testTarget.printArray("Print sorted array:");
            });

            step('Verify that array is sorted in ascending order.', () =>
                expect(testTarget.array).to.deep.equal(["3", 5, 7, 10, "apple", "banana"]));
        });

        it('should bubble sort the array in descending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.addValuesToFlatArray([10, "apple", 5, "banana", "3", 7]));

            step('Sort array in descending order.', () => {
                testTarget.bubbleSortMixedArray('desc');
                testTarget.printArray("Print sorted array:");
            });

            step('Verify that array is sorted in descending order.', () =>
                expect(testTarget.array).to.deep.equal(["banana", "apple", 10, 7, 5, "3"]));
        });

        it('should throw an error when bubble sorting in invalid mode', () =>
            step('Validate that bubble sorting in invalid mode throws an error.', () =>
                expect(() => testTarget.bubbleSortMixedArray(1))
                    .to.throw("Order must be 'asc' or 'desc'.")));

        it('should quick sort the array in ascending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.addValuesToFlatArray([10, "apple", 5, "banana", "3", 7]));

            step('Sort array in ascending order.', () => {
                testTarget.quickSortMixedArray('asc');
                testTarget.printArray("Print sorted array:");
            });

            step('Verify that array is sorted in ascending order.', () =>
                expect(testTarget.array).to.deep.equal(["3", 5, 7, 10, "apple", "banana"]));
        });

        it('should quick sort the array in descending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.addValuesToFlatArray([10, "apple", 5, "banana", "3", 7]));

            step('Sort array in descending order.', () => {
                testTarget.quickSortMixedArray('desc');
                testTarget.printArray("Print sorted array:");
            });

            step('Verify that array is sorted in descending order.', () =>
                expect(testTarget.array).to.deep.equal(["banana", "apple", 10, 7, 5, "3"]));
        });

        it('should throw an error when quick sorting in invalid mode', () =>
            step('Validate that quick sorting in invalid mode throws an error.', () =>
                expect(() => testTarget.quickSortMixedArray(1))
                    .to.throw("Order must be 'asc' or 'desc'.")));

        it('quick sort should be faster than bubble sort in ascending mode', () => {
            let count = 5000;
            let generatedValues;
            let bubbleSortExecutionTime;
            let quickSortExecutionTime;

            let restoreTestArray = (values) => {
                testTarget.setValuesDirectly(values);
            };

            step(`Generate test ${count} values.`, () =>
                generatedValues = generateUniqueRandomWordsAndNumbers(count));

            step('Set test values to the array.', () =>
                restoreTestArray(generatedValues));

            step('Measure bubble sort execution time.', () =>
                bubbleSortExecutionTime = measureExecutionTime(testTarget.bubbleSortMixedArray).executionTime);

            step('Measure quick sort execution time in ascending mode.', () => {
                restoreTestArray(generatedValues);
                quickSortExecutionTime = measureExecutionTime(testTarget.quickSortMixedArray).executionTime;
            });

            step('Verify that quick sort faster than bubble sort in ascending mode.', () => {
                logWithTimestamp(colors.Green(
                    `Bubble sort duration: ${colors.GreenBold(bubbleSortExecutionTime)}ms `.concat(
                        `| Quick sort duration: ${colors.GreenBold(quickSortExecutionTime)}ms`)), 'custom')

                expect(bubbleSortExecutionTime).to.be.greaterThan(quickSortExecutionTime)
            });
        });

        it('quick sort should be faster than bubble sort in descending mode', () => {
            let count = 6000;
            let generatedValues;
            let bubbleSortExecutionTime;
            let quickSortExecutionTime;

            let restoreTestArray = (values) => {
                testTarget.setValuesDirectly(values);
            };

            step(`Generate test ${count} values.`, () =>
                generatedValues = generateUniqueRandomWordsAndNumbers(count));

            step('Set test values to the array.', () =>
                restoreTestArray(generatedValues));

            step('Measure bubble sort execution time.', () =>
                bubbleSortExecutionTime = measureExecutionTime(testTarget.bubbleSortMixedArray, 'desc').executionTime);

            step('Measure quick sort execution time.', () => {
                restoreTestArray(generatedValues);
                quickSortExecutionTime = measureExecutionTime(testTarget.quickSortMixedArray, 'desc').executionTime;
            });

            step('Verify that quick sort faster than bubble sort in descending mode.', () => {
                logWithTimestamp(colors.Green(
                    `Bubble sort duration: ${colors.GreenBold(bubbleSortExecutionTime)}ms `.concat(
                        `| Quick sort duration: ${colors.GreenBold(quickSortExecutionTime)}ms`)), 'custom')

                expect(bubbleSortExecutionTime).to.be.greaterThan(quickSortExecutionTime)
            });
        });
    });

    describe('Array utils', () => {

        /**
         * Tests for {@link arrayIsNullOrEmpty}
         */
        describe('check that array is null or empty utility function', () => {
            const assertMessage = (flag, value) => `Expected ${flag} for [${value}]`

            it('should return true for null', () =>
                step('Verify that function returns true for null value.', () =>
                    assert.isTrue(testTarget.arrayIsNullOrEmpty(null),
                        assertMessage(true, null))));

            it('should return true for undefined', () =>
                step('Verify that function returns true for undefined value.', () =>
                    assert.isTrue(testTarget.arrayIsNullOrEmpty(undefined),
                        assertMessage(true, undefined))));

            it('should return true for an empty array', () =>
                step('Verify that function returns true for empty array value.', () =>
                    assert.isTrue(testTarget.arrayIsNullOrEmpty([]),
                        assertMessage(true, []))));

            it('should return false for a non-null value', () =>
                step('Verify that function returns false for non-null value.', () =>
                    assert.isFalse(testTarget.arrayIsNullOrEmpty(1),
                        assertMessage(false, 1))));

            it('should return false for a non-empty array', () =>
                step('Verify that function returns false for non-empty array value.', () =>
                    assert.isFalse(testTarget.arrayIsNullOrEmpty([1, 2, 3]),
                        assertMessage(false, [1, 2, 3]))));
        });

        /**
         * Tests for {@link getElementsByCountFromArray}
         */
        describe('get elements by count from array utility function', () => {
            it('should return first value from the start', () => {
                let actual = testTarget.getElementsByCountFromArray(1, 'start');
                let expected = testTarget.array[0];

                step('Verify that function returns first value from the array.', () =>
                    expect(actual).to.have.deep.members([expected]).and.have.lengthOf(1));
            });

            it('should return lats value from the start', () => {
                let actual = testTarget.getElementsByCountFromArray(1, 'end');
                let expected = testTarget.array[testTarget.array.length - 1];

                step('Verify that function returns lat value from the array.', () =>
                    expect(actual).to.have.deep.members([expected]).and.have.lengthOf(1));
            });

            it('should return multiple values from the start of the array', () => {
                let actual = testTarget.getElementsByCountFromArray(3, 'start');
                let expected = [];

                expected.push(testTarget.array[0]);
                expected.push(testTarget.array[1]);
                expected.push(testTarget.array[2]);

                step('Verify that function returns multiple values from the start of the array.', () =>
                    expect(actual).to.have.deep.members(expected).and.have.lengthOf(expected.length));
            });

            it('should return multiple values from the end of the array', () => {
                let actual = testTarget.getElementsByCountFromArray(3, 'end');
                let expected = [];

                expected.push(testTarget.array[testTarget.array.length - 1]);
                expected.push(testTarget.array[testTarget.array.length - 2]);
                expected.push(testTarget.array[testTarget.array.length - 3]);

                step('Verify that function returns multiple values from the end of the array.', () =>
                    expect(actual).to.have.deep.members(expected).and.have.lengthOf(expected.length));
            });

            it('should return null if array is empty', () => {
                step('Clear array.', () =>
                    testTarget.clearArray());

                step('Verify that function returns null for empty array.', () =>
                    assert.isNull(testTarget.getElementsByCountFromArray(1)));
            });

            it('should throw an error for invalid count type', () =>
                step('Verify that function throw an error for invalid count type.', () =>
                    expect(() => testTarget.getElementsByCountFromArray('abc'))
                        .to.throw("Count must be a non-negative number.")));

            it('should throw an error for negative count', () =>
                step('Verify that function throw an error for negative count.', () =>
                    expect(() => testTarget.getElementsByCountFromArray(-1))
                        .to.throw("Count must be a non-negative number.")));

            it('should throw an error for negative count', () =>
                step('Verify that function throw an error for negative count.', () =>
                    expect(() => testTarget.getElementsByCountFromArray(-1))
                        .to.throw("Count must be a non-negative number.")));

            it('should throw an error for invalid position type', () =>
                step('Verify that function throw an error for invalid position type.', () =>
                    expect(() => testTarget.getElementsByCountFromArray(1, 'abc'))
                        .to.throw("Invalid type. Use 'start' or 'end'.")));
        });

        /**
         * Tests for {@link clearArray}
         */
        describe('Clear array utility function', () =>
            it('array should be cleared', () => {
                step('Clear array.', () =>
                    testTarget.clearArray());

                step('Verify that array is cleared.', () =>
                    expect(testTarget.array)
                        .to.have.length(0));
            })
        );
    });
});