'use strict'

import {performStepWithMessage as step} from "../../utils/test-utils.js";
import {assert, expect} from "chai";
import * as testTarget from "../../../src/arrays-operations.js";
import {processHooks} from "./hooks.js";
import {testArray} from "./arrays-operations-test.js";

describe('Array Utilities', () => {
    processHooks('Array Utils Functions');

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
     * Tests for {@link getElements}
     */
    describe('get elements by count from array utility function', () => {
        it('should return first value from the start', () => {
            let actual = testTarget.getElements(testArray, 1, 'start');
            let expected = testArray[0];

            step('Verify that function returns first value from the array.', () =>
                expect(actual).to.have.deep.members([expected]).and.have.lengthOf(1));
        });

        it('should return lats value from the start', () => {
            let actual = testTarget.getElements(testArray, 1, 'end');
            let expected = testArray[testArray.length - 1];

            step('Verify that function returns lat value from the array.', () =>
                expect(actual).to.have.deep.members([expected]).and.have.lengthOf(1));
        });

        it('should return multiple values from the start of the array', () => {
            let actual = testTarget.getElements(testArray, 3, 'start');
            let expected = [];

            expected.push(testArray[0]);
            expected.push(testArray[1]);
            expected.push(testArray[2]);

            step('Verify that function returns multiple values from the start of the array.', () =>
                expect(actual).to.have.deep.members(expected).and.have.lengthOf(expected.length));
        });

        it('should return multiple values from the end of the array', () => {
            let actual = testTarget.getElements(testArray, 3, 'end');
            let expected = [];

            expected.push(testArray[testArray.length - 1]);
            expected.push(testArray[testArray.length - 2]);
            expected.push(testArray[testArray.length - 3]);

            step('Verify that function returns multiple values from the end of the array.', () =>
                expect(actual).to.have.deep.members(expected).and.have.lengthOf(expected.length));
        });

        it('should throw an error when array is empty', () =>
            step('Verify that function throw an error when array is empty.', () =>
                expect(() => testTarget.getElements([], 1, 'abc'))
                    .to.throw('Array is empty.')));

        it('should throw an error for invalid count type', () =>
            step('Verify that function throw an error for invalid count type.', () =>
                expect(() => testTarget.getElements(testArray, 'abc'))
                    .to.throw('Count is invalid.')));

        it('should throw an error for negative count', () =>
            step('Verify that function throw an error for negative count.', () =>
                expect(() => testTarget.getElements(testArray, -1))
                    .to.throw('Count must be positive.')));

        it('should throw an error for unspecified count', () =>
            step('Verify that function throw an error for unspecified count.', () =>
                expect(() => testTarget.getElements(testArray))
                    .to.throw('Count is required.')));

        it('should throw an error for invalid position type', () =>
            step('Verify that function throw an error for invalid position type.', () =>
                expect(() => testTarget.getElements(testArray, 1, 'abc'))
                    .to.throw("Invalid position specified. Use 'start' or 'end'")));
    });
});