"use strict";

import * as testTarget from '../../../src/arrays-operations.js';
import {DEFAULT_VALUES} from '../../../src/arrays-operations.js';
import {expect} from 'chai';
import {generateUniqueRandomWordsAndNumbers} from '../../../src/utils/random-words.js';
import {performStepWithMessage as step} from "../../utils/test-utils.js";
import {measureExecutionTime} from "../../../src/utils/date-time.js";
import {logWithTimestamp} from "../../../logging/logs.js";
import {colors} from "../../../logging/colors.js";
import {processHooks} from "./hooks.js";

// Object to store test group names for easy navigation and consistency
const testGroupsNames = {
    init: 'Array Initialization',
    add: 'Elements Addition',
    remove: 'Elements Removal',
    transform: 'Data Transformation',
    sort: 'Data Sorting',
    filter: 'Data Filtering',
    aggregate: 'Data Aggregation'
};

/**
 * Test array variable initialized with default unique random words.
 * Serves as the primary data structure for array manipulation operations.
 */
export let testArray;

/**
 * Resets the global array to its original default values.
 * This function ensures test isolation by restoring the array to its initial state.
 */
export function restoreArrayDefaultValues() {
    testArray = [...DEFAULT_VALUES];
}

describe('Array', function () {
    processHooks('Array Manipulation Functions');

    /**
     * @description Tests the array initialization
     * @category Array Initialization
     */
    describe(testGroupsNames.init, function () {
        it('is not empty', () =>
            step('Validate that test default array is not empty.', () => {
                testTarget.logArray(testArray, 'Initial array:');
                expect(testArray).to.not.be.empty
            }));

        it('contains default values', () =>
            step('Validate that test default contains default values.', () =>
                expect(testArray).to.include.all.members(DEFAULT_VALUES,
                    'Actual array doesnt contain default values')
            ));
    });

    /**
     * @description Tests the addition functions
     * @category Elements Addition
     */
    describe(testGroupsNames.add, function () {
        it('should add single value to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addUniqueValues(testArray, valuesToAdd, 'start'));

            step('Validate that actual array contains expected value.', () =>
                expect(testArray).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected value'));

            step('Validate that test value is added to the start of the array.', () =>
                expect(testTarget.getElements(testArray, valuesToAdd.length, 'start'))
                    .to.include.members(valuesToAdd, 'Test value is not added to the start of array'));
        });

        it('should add single value to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addUniqueValues(testArray, valuesToAdd));

            step('Validate that actual array contains expected value.', () =>
                expect(testArray).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected value'));

            step('Validate that test value is added to the end of the array.', () =>
                expect(testTarget.getElements(testArray, valuesToAdd.length, 'end'))
                    .to.include.members(valuesToAdd, 'Test value is not added to the end of array'));
        });

        it('should add multiple values to the start of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addUniqueValues(testArray, valuesToAdd, 'start'));

            step('Validate that actual array contains expected values.', () =>
                expect(testArray).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected values'));

            step('Validate that test values is added to the start of the array.', () =>
                expect(testTarget.getElements(testArray, valuesToAdd.length, 'start'))
                    .to.include.members(valuesToAdd, 'Added test values is not added to the start of array'));
        });

        it('should add multiple values to the end of the array', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addUniqueValues(testArray, valuesToAdd));

            step('Validate that actual array contains expected values.', () =>
                expect(testArray).to.include.members(valuesToAdd,
                    'Actual array doesnt contain expected values'));

            step('Validate that values is added to the end of the array.', () =>
                expect(testTarget.getElements(testArray, valuesToAdd.length, 'end'))
                    .to.include.members(valuesToAdd, 'Added values is not added to the end of array'));
        });

        it('should not contain duplicates in the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom values.', () => {
                testTarget.logArray(testArray, 'Initial array:');
                testTarget.addUniqueValues(testArray, valueToAdd);
                testTarget.addUniqueValues(testArray, valueToAdd);
            });

            step('Validate that actual array doesnt contains duplicates.', () =>
                expect(testArray).to.satisfy(() =>
                        new Set(testArray).size === testArray.length,
                    'Actual array contains duplicates.'));
        });

        it('should throw an error when adding an unspecified value', () =>
            step('Validate that adding unspecified value throws an error.', () =>
                expect(() => testTarget.addUniqueValues(testArray, []))
                    .to.throw('Provided values is null or empty.')));

        it('should replace array with single flat value', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Replace default array with custom flat value.', () =>
                testTarget.replaceWithFlatValues(testArray, valueToAdd));

            step('Validate that actual array contains only added value.', () =>
                expect(testArray).to.have.deep.members(valueToAdd).and.have.lengthOf(valueToAdd.length));
        });

        it('should replace array with multiple flat values', function () {
            let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Replace default array with custom flat values.', () =>
                testTarget.replaceWithFlatValues(testArray, valuesToAdd));

            step('Validate that actual array contains only added values.', () =>
                expect(testArray).to.have.deep.members(valuesToAdd).and.have.lengthOf(valuesToAdd.length));
        });

        it('should throw an error when replacing an unspecified array to the flat array', () =>
            step('Validate that replacing unspecified array to the flat array throws an error.', () =>
                expect(() => testTarget.replaceWithFlatValues())
                    .to.throw('Provided array is null or empty.')));

        it('should throw an error when replacing an array with unspecified value.', () =>
            step('Validate that replacing an array with unspecified value to the flat array throws an error.', () =>
                expect(() => testTarget.replaceWithFlatValues(testArray))
                    .to.throw('Provided values is null or empty.')));
    });

    /**
     * @description Tests the removal functions
     * @category Elements Removal
     */
    describe(testGroupsNames.remove, function () {
        it('should remove single value from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(1);

            step('Populate default array with custom value.', () =>
                testTarget.addUniqueValues(testArray, valueToAdd));

            step('Remove value from actual array.', () =>
                testTarget.removeValues(testArray, valueToAdd));

            step('Validate that actual array must not contain removed value.', () =>
                expect(testArray).to.not.include.members(valueToAdd,
                    'Actual array must not contain removed value.'));
        });

        it('should remove multiple values from the array', function () {
            let valueToAdd = generateUniqueRandomWordsAndNumbers(3);

            step('Populate default array with custom values.', () =>
                testTarget.addUniqueValues(testArray, valueToAdd));

            step('Remove value from actual array.', () =>
                testTarget.removeValues(testArray, valueToAdd));

            step('Validate that actual array must not contain removed value.', () =>
                expect(testArray).to.not.include.members(valueToAdd,
                    'Actual array must not contain removed values.'));
        });

        it('should throw an error when removing an value from unspecified array', () =>
            step('Validate that removing an value from unspecified array throws an error.', () =>
                expect(() => testTarget.removeValues())
                    .to.throw('Provided array is null or empty.')));

        it('should throw an error when removing an unspecified value', () =>
            step('Validate that removing an unspecified value throws an error.', () =>
                expect(() => testTarget.removeValues(testArray, []))
                    .to.throw('Provided values is null or empty.')));

        it('should remove first element from the start of the array', function () {
            let firstValue = testArray[0];

            step('Remove first value from actual array.', () => {
                testTarget.logArray(testArray, 'Initial array:');
                testTarget.removeByCount(testArray, 1, 'start')
            });

            step('Validate that from the actual array first value is removed.', () =>
                expect(testArray).to.not.include.members([firstValue],
                    'Actual array must not contain first removed value.'));
        });

        it('should remove last element from the end of the array', function () {
            let lastValue = testArray[testArray.length - 1];

            step('Remove last value from actual array.', () => {
                testTarget.logArray(testArray, 'Initial array:');
                testTarget.removeByCount(testArray, 1, 'end')
            });

            step('Validate that from the actual array last value is removed.', () =>
                expect(testArray).to.not.include.members([lastValue],
                    'Actual array must not contain last removed value.'));
        });

        it('should remove multiple elements from the start of the array', function () {
            let values = testTarget.getElements(testArray, 3, 'start');

            step(`Remove [${values.length}] values from teh start of actual array.`, () => {
                testTarget.logArray(testArray, 'Initial array:');
                testTarget.removeByCount(testArray, values.length, 'start')
            });

            step(`Validate that from the actual array ${values.length} values is removed from the start.`, () =>
                expect(testArray).to.not.include.members([values],
                    `Actual array must not contain [${values.length}] removed values from the start.`));
        });

        it('should remove multiple elements from the end of the array', function () {
            let values = testTarget.getElements(testArray, 3, 'end');

            step(`Remove [${values.length}] values from the end of actual array.`, () => {
                testTarget.logArray(testArray, 'Initial array:');
                testTarget.removeByCount(testArray, values.length, 'end')
            });

            step(`Validate that from the actual array ${values.length} values is removed from the end.`, () =>
                expect(testArray).to.not.include.members([values],
                    `Actual array must not contain [${values.length}] removed values from the end.`));
        });

        it('should throw an error when removing from unspecified array', () =>
            step('Validate that removing with from unspecified array throws an error.', () =>
                expect(() => testTarget.removeByCount())
                    .to.throw('Provided array is invalid.')));

        it('should throw an error when removing from empty array', () =>
            step('Validate that removing with from empty array throws an error.', () =>
                expect(() => testTarget.removeByCount([]))
                    .to.throw('Array is empty.')));

        it('should throw an error when removing with unspecified count', () =>
            step('Validate that removing with unspecified count throws an error.', () =>
                expect(() => testTarget.removeByCount(testArray))
                    .to.throw('Count is required.')));

        it('should throw an error when removing with invalid count type', () =>
            step('Validate that removing with invalid count type throws an error.', () =>
                expect(() => testTarget.removeByCount(testArray, 'a'))
                    .to.throw('Provided count invalid.')));

        it('should throw an error when removing with negative count', () =>
            step('Validate that removing with negative count throws an error.', () =>
                expect(() => testTarget.removeByCount(testArray, -1))
                    .to.throw('Provided count must be positive.')));

        it('should throw an error when removing with invalid position value', () =>
            step('Validate that removing with invalid position value throws an error.', () =>
                expect(() => testTarget.removeByCount(testArray, 1, 'abc'))
                    .to.throw("Invalid position specified. Use 'start' or 'end'.")));
    });

    /**
     * @description Tests the transformation functions
     * @category Transformation
     */
    describe(testGroupsNames.transform, function () {
        it('all values in array should be converted to string', function () {
            let valuesToAdd = [1, 2, 3];

            step('Populate default array with numbers.', () =>
                testTarget.addUniqueValues(testArray, valuesToAdd));

            step('Convert actual array values to string.', () => {
                testTarget.logArray(testArray, 'Array before conversation:');
                testTarget.convertToStrings(testArray);
            });

            step('Verify that all values in array is string value.', () => {
                for (let i = 0; i < testArray.length; i++) {
                    expect(testArray[i]).to.be.a('string',
                        `Expected that value at index of [${i}] = ${testArray[i]}
                    to be a {string}, but is {${typeof testArray[i]}}`);
                }
            });
        });

        it('array should be converted to string', function () {
            let convertedArray;

            step('Convert array to string.', () =>
                convertedArray = testTarget.arrayToString(testArray));

            step('Validate that array is converted to string.', () =>
                expect(convertedArray).to.equal(testArray.join(',')));
        });
    });

    /**
     * @description Tests the sorting functions
     * @category Sorting
     */
    describe(testGroupsNames.sort, function () {
        it('should bubble sort the array in ascending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.replaceWithFlatValues(testArray, [10, "apple", 5, "banana", "3", 7]));

            step('Sort array in ascending order.', () => {
                testTarget.bubbleSort(testArray, 'asc');
                testTarget.logArray(testArray, "Print sorted array:");
            });

            step('Verify that array is sorted in ascending order.', () =>
                expect(testArray).to.deep.equal(["3", 5, 7, 10, "apple", "banana"]));
        });

        it('should bubble sort the array in descending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.replaceWithFlatValues(testArray, [10, "apple", 5, "banana", "3", 7]));

            step('Sort array in descending order.', () => {
                testTarget.bubbleSort(testArray, 'desc');
                testTarget.logArray(testArray, "Print sorted array:");
            });

            step('Verify that array is sorted in descending order.', () =>
                expect(testArray).to.deep.equal(["banana", "apple", 10, 7, 5, "3"]));
        });

        it('should throw an error when array is empty for bubble sort action', () =>
            step('Validate that bubble sort action with empty array throws an error.', () =>
                expect(() => testTarget.bubbleSort([], 'asc'))
                    .to.throw('Provided array is null or empty.')));

        it('should throw an error when array is invalid for bubble sort action', () =>
            step('Validate that bubble sort action with invalid array throws an error.', () =>
                expect(() => testTarget.bubbleSort('a', 'asc'))
                    .to.throw('Provided array is invalid.')));

        it('should throw an error when order is invalid for bubble sort action', () =>
            step('Validate that bubble sort action with invalid order throws an error.', () =>
                expect(() => testTarget.bubbleSort(testArray, 1))
                    .to.throw("Order must be 'asc' or 'desc'.")));

        it('should quick sort the array in ascending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.replaceWithFlatValues(testArray, [10, "apple", 5, "banana", "3", 7]));

            step('Sort array in ascending order.', () => {
                testTarget.quickSort(testArray, 'asc');
                testTarget.logArray(testArray, "Print sorted array:");
            });

            step('Verify that array is sorted in ascending order.', () =>
                expect(testArray).to.deep.equal(["3", 5, 7, 10, "apple", "banana"]));
        });

        it('should quick sort the array in descending order', () => {
            step('Populate array with custom values and remove previous.', () =>
                testTarget.replaceWithFlatValues(testArray, [10, "apple", 5, "banana", "3", 7]));

            step('Sort array in descending order.', () => {
                testTarget.quickSort(testArray, 'desc');
                testTarget.logArray(testArray, "Print sorted array:");
            });

            step('Verify that array is sorted in descending order.', () =>
                expect(testArray).to.deep.equal(["banana", "apple", 10, 7, 5, "3"]));
        });

        it('should throw an error when array is empty for quick sort action', () =>
            step('Validate that quick sort action with empty array throws an error.', () =>
                expect(() => testTarget.quickSort([], 'asc'))
                    .to.throw('Provided array is null or empty.')));

        it('should throw an error when array is invalid for quick sort action', () =>
            step('Validate that quick sort action with invalid array throws an error.', () =>
                expect(() => testTarget.quickSort('a', 'asc'))
                    .to.throw('Provided array is invalid.')));

        it('should throw an error when order is invalid for quick sort action', () =>
            step('Validate that quick sort action with invalid order throws an error.', () =>
                expect(() => testTarget.quickSort(testArray, 1))
                    .to.throw("Order must be 'asc' or 'desc'.")));

        it('quick sort should be faster than bubble sort in ascending mode', () => {
            let count = 5000;
            let generatedValues;
            let bubbleSortExecutionTime;
            let quickSortExecutionTime;

            let restoreTestArray = (values) => {
                testArray = [...values];
            };

            step(`Generate test ${count} values.`, () =>
                generatedValues = generateUniqueRandomWordsAndNumbers(count));

            step('Set test values to the array.', () =>
                restoreTestArray(generatedValues));

            step('Measure bubble sort execution time in ascending mode.', () =>
                bubbleSortExecutionTime = measureExecutionTime(testTarget.bubbleSort, testArray).executionTime);

            step('Measure quick sort execution time in ascending mode.', () => {
                restoreTestArray(generatedValues);
                quickSortExecutionTime = measureExecutionTime(testTarget.quickSort, testArray).executionTime;
            });

            step('Verify that quick sort faster than bubble sort in ascending mode.', () => {
                logWithTimestamp(colors.Yellow(
                    `Bubble sort duration: ${colors.YellowBold(bubbleSortExecutionTime)}ms `.concat(
                        `| Quick sort duration: ${colors.YellowBold(quickSortExecutionTime)}ms`)), 'custom')

                expect(bubbleSortExecutionTime).to.be.greaterThan(quickSortExecutionTime)
            });
        });

        it('quick sort should be faster than bubble sort in descending mode', () => {
            let count = 6000;
            let generatedValues;
            let bubbleSortExecutionTime;
            let quickSortExecutionTime;

            let restoreTestArray = (values) => {
                testArray = [...values];
            };

            step(`Generate test ${count} values.`, () =>
                generatedValues = generateUniqueRandomWordsAndNumbers(count));

            step('Set test values to the array.', () =>
                restoreTestArray(generatedValues));

            step('Measure bubble sort execution time in descending mode.', () =>
                bubbleSortExecutionTime = measureExecutionTime(testTarget.bubbleSort, testArray, 'desc').executionTime);

            step('Measure quick sort execution time in descending mode.', () => {
                restoreTestArray(generatedValues);
                quickSortExecutionTime = measureExecutionTime(testTarget.quickSort, testArray, 'desc').executionTime;
            });

            step('Verify that quick sort faster than bubble sort in descending mode.', () => {
                logWithTimestamp(colors.Green(
                    `Bubble sort duration: ${colors.GreenBold(bubbleSortExecutionTime)}ms `.concat(
                        `| Quick sort duration: ${colors.GreenBold(quickSortExecutionTime)}ms`)), 'custom')

                expect(bubbleSortExecutionTime).to.be.greaterThan(quickSortExecutionTime)
            });
        });
    });

    /**
     * @description Tests the filtering functions
     * @category Filtering
     */
    describe(testGroupsNames.filter, function () {
        it('should return only numbers from the array', () =>
            step('Verify that extracted values is numbers', () =>
                testTarget.filterNumbers(testArray).forEach(item => {
                    expect(item).to.be.a('number')
                })));

        it('should return provided single string element that exists', () => {
            let expectedValue = "TestValue_".concat(...generateUniqueRandomWordsAndNumbers(1));

            step(`Add value = [${expectedValue}] to the array.`, () => {
                testTarget.addUniqueValues(testArray, expectedValue);
                testTarget.logArray(testArray);
            });

            step(`Verify that returns expected value.`, () =>
                expect(testTarget.getElementByValue(testArray, expectedValue)).to.equal(expectedValue,
                    "Returned value doesnt match with expected."));
        });

        it('should return undefined when element does`t exists', () => {
            let expectedValue = "TestValue_".concat(...generateUniqueRandomWordsAndNumbers(1));

            step(`Verify that returns undefined for nonexistent element.`, () =>
                expect(testTarget.getElementByValue(testArray, expectedValue)).to.be.undefined);
        });

        it('should throw an error when element is not provided', () =>
            step(`Verify that throws an error.`, () =>
                expect(() => testTarget.getElementByValue(testArray)).to.throw('Element is required.')));

        it('should throw an error when array is empty', () => {
            step(`Clear the array.`, () =>
                testArray = []);

            step(`Verify that throws an error.`, () =>
                expect(() => testTarget.getElementByValue(testArray, 'a')).to.throw('Array is empty.'))
        });

        it('should return string elements that longer than provided length', () => {
            const length = 7;
            const values = ['Incredible', 'Important', 'Destination', 'Music'];
            let expectedValues = [];

            step(`Add string elements that longer than length = ${length}.`, () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((value) => {
                    if (typeof value === 'string' && value.length > length) expectedValues.push(value);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterStringsLongerThan(testArray, length);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info');

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should should throw an error then provided length is invalid', () =>
            step(`Verify that filter by invalid length throws an error`, () =>
                expect(() => testTarget.filterStringsLongerThan(testArray, 'abc'))
                    .to.throw('Provided length is invalid.')));

        it('should should throw an error then provided length is negative', () =>
            step(`Verify that filter by invalid length throws an error`, () =>
                expect(() => testTarget.filterStringsLongerThan(testArray, 0))
                    .to.throw('Provided length must be positive.')));

        it('should should throw an error then provided length is null', () =>
            step(`Verify that filter by null length throws an error`, () =>
                expect(() => testTarget.filterStringsLongerThan(testArray))
                    .to.throw('Length is required.')));

        it('should return string elements that smaller than provided length', () => {
            const length = 7;
            const values = ['Music', 'Dance', 'Light', 'Incredible'];
            let expectedValues = [];

            step(`Add string elements that smaller than length = ${length}.`, () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((val) => {
                    if (typeof val === 'string' && val.length < length) expectedValues.push(val);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterStringsShorterThan(testArray, length);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info');

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should should throw an error then provided length is invalid', () =>
            step(`Verify that filter by invalid length throws an error`, () =>
                expect(() => testTarget.filterStringsShorterThan(testArray, 'abc'))
                    .to.throw('Provided length is invalid.')));

        it('should should throw an error then provided length is negative', () =>
            step(`Verify that filter by invalid length throws an error`, () =>
                expect(() => testTarget.filterStringsShorterThan(testArray, 0))
                    .to.throw('Provided length must be positive.')));

        it('should should throw an error then provided length is null', () =>
            step(`Verify that filter by null length throws an error`, () =>
                expect(() => testTarget.filterStringsShorterThan(testArray))
                    .to.throw('Length is required.')));

        it('should return number elements that greater than provided number', () => {
            const number = 7;
            const values = [3, 5, 7, 8, 10];
            let expectedValues = [];

            step(`Add numbers that greater than ${number}.`, () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((value) => {
                    if (typeof value === 'number' && value > number) expectedValues.push(value);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterNumbersGreaterThan(testArray, number);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info');

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should should throw an error then provided number is invalid', () =>
            step(`Verify that filter by invalid number throws an error`, () =>
                expect(() => testTarget.filterNumbersGreaterThan(testArray, 'abc'))
                    .to.throw('Provided number is invalid.')));

        it('should should throw an error then provided number is null', () =>
            step(`Verify that filter by null number throws an error`, () =>
                expect(() => testTarget.filterNumbersGreaterThan(testArray))
                    .to.throw('Number is required.')));

        it('should return number elements that smaller than provided number', () => {
            const number = 7;
            const values = [3, 5, 7, 8, 10];
            let expectedValues = [];

            step(`Add numbers that smaller than ${number}.`, () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((element) => {
                    if (typeof element === 'number' && element < number) expectedValues.push(element);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterNumbersSmallerThan(testArray, number);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info');

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should should throw an error then provided number is invalid', () =>
            step(`Verify that filter by invalid number throws an error`, () =>
                expect(() => testTarget.filterNumbersSmallerThan(testArray, 'abc'))
                    .to.throw('Provided number is invalid.')));

        it('should should throw an error then provided number is null', () =>
            step(`Verify that filter by null number throws an error`, () =>
                expect(() => testTarget.filterNumbersSmallerThan(testArray))
                    .to.throw('Number is required.')));

        it('should return positive numbers from the array', () => {
            const values = [-13, -5, 0, 3, 5, 7];
            let expectedValues = [];

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((element) => {
                    if (typeof element === 'number' && element > 0) expectedValues.push(element);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterPositiveNumbers(testArray);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info');

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should return negative numbers from the array', () => {
            const values = [-13, -5, 0, 3, 5, 7];
            let expectedValues = [];

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray, values));

            step(`Prepare expected data.`, () => {
                testArray.forEach((element) => {
                    if (typeof element === 'number' && element < 0) expectedValues.push(element);
                })
                logWithTimestamp(`Expected values: [${expectedValues}]`, 'info');
            });

            step(`Verify that extracted values matches condition`, () => {
                let actualValues = testTarget.filterNegativeNumbers(testArray);
                logWithTimestamp(`Actual values: [${actualValues}]`, 'info',);

                expect(actualValues).to.have.deep.members(expectedValues,
                    'Extracted values doesnt match with expected')
            });
        });

        it('should should throw an error then filer by custom condition with empty array', () => {
            step('Clear array', () =>
                testArray = []);

            step(`Verify that filer by custom condition with empty array throws an error`, () =>
                expect(() => testTarget.filterByCondition(testArray, () => true))
                    .to.throw('Array is empty.'))
        });

        it('should should throw an error then filer by custom condition with null condition', () =>
            step(`Verify that filer by custom condition with null condition throws an error`, () =>
                expect(() => testTarget.filterByCondition(testArray))
                    .to.throw('Condition is required.')));

        it('should should throw an error then filer by custom condition with invalid condition', () =>
            step(`Verify that filer by custom condition with invalid condition throws an error`, () =>
                expect(() => testTarget.filterByCondition(testArray, 123))
                    .to.throw('Provided argument is not a function')));
    });

    /**
     * @description Tests the aggregate functions
     * @category Aggregation
     */
    describe(testGroupsNames.aggregate, function () {

        it('should return minimal number value from the array', () => {
            let expectedValue;

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray, [1, 2, 3]));

            step('Prepare expected data.', () => {
                expectedValue = Math.min(...testTarget.filterNumbers(testArray));
                logWithTimestamp(`Expected minimal value is: ${expectedValue}`, 'info');
            });

            step('Verify that extracted value matches with expected', () => {
                let actualValue = testTarget.calculateStats(testArray).min;
                logWithTimestamp(`Actual minimal value is: ${actualValue}`, 'info');

                expect(actualValue).to.equal(expectedValue,
                    'Actual minimal value is doesnt match with expected');
            });
        });

        it('should return maximal number value from the array', () => {
            let expectedValue;

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray,[1, 2, 3]));

            step('Prepare expected data.', () => {
                expectedValue = Math.max(...testTarget.filterNumbers(testArray));
                logWithTimestamp(`Expected maximal value is: ${expectedValue}`, 'info');
            });

            step('Verify that extracted value matches with expected', () => {
                let actualValue = testTarget.calculateStats(testArray).max;
                logWithTimestamp(`Actual minimal value is: ${actualValue}`, 'info');

                expect(actualValue).to.equal(expectedValue,
                    'Actual maximal value is doesnt match with expected');
            });
        });

        it('should return average number value from the array', () => {
            let expectedValue;

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray,[1, 2, 3]));

            step('Prepare expected data.', () => {
                let numbers = testTarget.filterNumbers(testArray);
                expectedValue = numbers.reduce((acc, item) => acc + item, 0) / numbers.length;

                logWithTimestamp(`Expected average value is: ${expectedValue}`, 'info');
            });

            step('Verify that extracted value matches with expected', () => {
                let actualValue = testTarget.calculateStats(testArray).average;
                logWithTimestamp(`Actual average value is: ${actualValue}`, 'info');

                expect(actualValue).to.equal(expectedValue,
                    'Actual average value is doesnt match with expected');
            });
        });

        it('should return sum of the numbers from the array', () => {
            let expectedValue;

            step('Add test values to the array.', () =>
                testTarget.addUniqueValues(testArray,[1, 2, 3]));

            step('Prepare expected data.', () => {
                expectedValue = testTarget.filterNumbers(testArray).reduce((acc, item) => acc + item, 0);
                logWithTimestamp(`Expected sum value is: ${expectedValue}`, 'info');
            });

            step('Verify that extracted value matches with expected', () => {
                let actualValue = testTarget.calculateStats(testArray).sum;
                logWithTimestamp(`Actual sum value is: ${actualValue}`, 'info');

                expect(actualValue).to.equal(expectedValue,
                    'Actual sum value is doesnt match with expected');
            });
        });
    });
});