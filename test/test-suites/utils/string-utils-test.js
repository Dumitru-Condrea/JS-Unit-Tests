'use strict'

import {processDefaultHooks} from "../../utils/hook-utils.js";
import {performStepWithMessage as step} from "../../utils/test-utils.js";
import {assert, expect} from "chai";
import {
    checkIfNotEmptyOrNull,
    envStringToBooleanNumber,
    getHookType,
    getTitleWithoutHook,
    replaceDynamicallyTestTitleFromTestContext,
    stripANSIEscapeCodes
} from "../../../src/utils/strings.js";
import {colors as Colors} from "../../../logging/colors.js";
import {LOGS_CONFIG} from "../../../config/logs-config.js";
import {logWithTimestamp} from "../../../logging/logs.js";

describe('String Utilities', () => {
    processDefaultHooks('String Utilities');

    /**
     * Tests for {@link checkIfNotEmptyOrNull}
     */
    describe('Check if string not empty or null utility function', () => {
        const assertMessage = (flag, value) => `Expected ${flag} for [${value}]`

        it('should return true for an string', () =>
            step('Verify that function returns true for string.', () =>
                assert.isTrue(checkIfNotEmptyOrNull('string'), assertMessage(true, 'string'))));

        it('should return false for an blank string', () =>
            step('Verify that function returns false for blank string.', () =>
                assert.isFalse(checkIfNotEmptyOrNull(' '), assertMessage(false, 'blank string'))));

        it('should return empty string for an empty string', () =>
            step('Verify that function returns empty string for empty string.', () =>
                assert.isEmpty(checkIfNotEmptyOrNull(''), assertMessage('empty string', 'empty string'))));

        it('should return null for an null string', () =>
            step('Verify that function returns null for null string.', () =>
                assert.isNull(checkIfNotEmptyOrNull(null), assertMessage(null, 'null string'))));

        it('should return undefined for an undefined string', () =>
            step('Verify that function returns undefined for undefined string.', () =>
                assert.isUndefined(checkIfNotEmptyOrNull(undefined), assertMessage(undefined, 'undefined string'))));
    });

    /**
     * Tests for {@link stripANSIEscapeCodes}
     */
    describe('Remove ANSI escape codes utility function', () => {

// This test will run only if colorized output is enabled (when LOGS_CONFIG.CHALK_LEVEL is truthy).
// If chalk colors are enabled, it checks that the ANSI escape codes are removed from colorized strings.
        (LOGS_CONFIG.CHALK_LEVEL ? it : it.skip)
        ('should remove all escape codes from colorized strings when colors are enabled', () => {
            let initialString = 'Example string';

            step('Verify that function removes all ANSI escape codes from colorized strings.', () => {
                Object.entries(Colors).forEach(([key, func]) => {
                    expect(stripANSIEscapeCodes(func(initialString)))
                        .to.be.equal(initialString, 'String contains ANSI escape codes.');
                });
            });
        });

// This test serves as a fallback and will run when colorized output is disabled (when LOGS_CONFIG.CHALK_LEVEL is falsy).
// It checks that the function removes ANSI escape codes from a manually colorized string.
        it('should remove all escape codes from string when colors are disabled', () => {
            let initialString = 'Example string';
            let colorizedString = `\u001b[4m${initialString}\u001b[24m`; // Adding an ANSI escape code for underlining.

            step('Verify that function removes all ANSI escape codes from the string.', () => {
                expect(stripANSIEscapeCodes(colorizedString))
                    .to.be.equal(initialString, 'String contains ANSI escape codes.');
            });
        });
    });

    /**
     * Tests for {@link getTitleWithoutHook}
     */
    describe('Remove hook name from test title utility function', () => {
        let testTitleFromBeforeEachHook;
        let testTitleFromAfterEachHook;

        before(function () {
            logWithTimestamp('Define variables that contains test titles with each hooks.', 'info');
        });

        beforeEach(function () {
            testTitleFromBeforeEachHook = this.test.title;
        });

        afterEach(function () {
            testTitleFromAfterEachHook = this.test.title;
        });

        const testTitle = 'should remove before each hook name from test title';
        it(testTitle, () => {
            step('Verify that function removes before each hook name from test title.', () =>
                expect(getTitleWithoutHook(testTitleFromBeforeEachHook))
                    .to.be.equal(`"${testTitle}"`, 'Test title contains before each hook name'))
        });

        it('should remove after each hook name from test title', () =>
            step('Verify that function removes after each hook name from test title.', () =>
                expect(getTitleWithoutHook(testTitleFromAfterEachHook))
                    .to.be.equal(`"${testTitle}"`, 'Test title contains after each hook name')));

        it('should return initial string when hook is not present in test title', function () {
            step('should return original test title when hook name is no present in string.', () =>
                expect(getTitleWithoutHook(this.test.title))
                    .to.be.equal(this.test.title, 'Actual test title doesnt match with expected.'));
        });
    });

    /**
     * Tests for {@link replaceDynamicallyTestTitleFromTestContext}
     */
    describe('Replace dynamically test title by pattern utility function', () => {
        it('should replace raw string with `this.test.title` to actual test title', function () {
            step('Verify that processed string contains actual test title.', () =>
                expect(replaceDynamicallyTestTitleFromTestContext('this.test.title', this.test.title))
                    .to.be.equal(this.test.title, 'Actual string doesnt match with expected.'));
        });

        it('should replace `this.test.title` in string that contains other words to actual test title', function () {
            step('Verify that processed string contains actual test title.', () =>
                expect(replaceDynamicallyTestTitleFromTestContext('test: [this.test.title]', this.test.title))
                    .to.be.equal(`test: [${this.test.title}]`, 'Actual string doesnt match with expected.'));
        });

        it('should return original string when it doesnt match with pattern', () => {
            step('Verify that function returns original string when it doesnt match with pattern.', () =>
                expect(replaceDynamicallyTestTitleFromTestContext("test", 'test'))
                    .to.be.equal('test', 'Actual test title doesnt match with expected.'));
        });
    });

    /**
     * Tests for {@link getHookType}
     */
    describe('Get hook type from test title utility function', () => {
        let testTitleFromBeforeAllHook;
        let testTitleFromBeforeEachHook;
        let testTitleFromAfterAllHook;
        let testTitleFromAfterEachHook;

        describe('define variables', function () {
            before(function () {
                logWithTimestamp('Define variables that contains test titles with hook names.', 'info');
                testTitleFromBeforeAllHook = this.test.title;
            });

            after(function () {
                testTitleFromAfterAllHook = this.test.title;
            });

            beforeEach(function () {
                testTitleFromBeforeEachHook = this.test.title;
            });

            afterEach(function () {
                testTitleFromAfterEachHook = this.test.title;
            });

            describe('should be present', () => {
                it('title with before all, before each hooks should be present to test', function () {
                    step('Verify that test title with before all hook is present.', () =>
                        expect(testTitleFromBeforeAllHook).is.not.undefined);

                    step('Verify that test title with before each hook is present.', () =>
                        expect(testTitleFromBeforeEachHook).is.not.undefined);
                });

                it('title with after each hook should be present to test', () =>
                    step('Verify that test title with after each hook is present.', () =>
                        expect(testTitleFromAfterEachHook).is.not.undefined));
            });

        });

        describe('verify get hook type function', () => {
            it('title with after all hook should be present to test', () =>
                step('Verify that test title with after all hook is present.', () =>
                    expect(testTitleFromAfterAllHook).is.not.undefined));

            it('get hook name function should return before all hook name', () =>
                step('Verify that function returns before all hook name.', () =>
                    expect(getHookType(testTitleFromBeforeAllHook)).to.be.equal('before all')));

            it('get hook name function should return before each hook name', () =>
                step('Verify that function returns before each hook name.', () =>
                    expect(getHookType(testTitleFromBeforeEachHook)).to.be.equal('before each')));

            it('get hook name function should return after all hook name', () =>
                step('Verify that function returns after all hook name.', () =>
                    expect(getHookType(testTitleFromAfterAllHook)).to.be.equal('after all')));

            it('get hook name function should return after each hook name', () =>
                step('Verify that function returns after each hook name.', () =>
                    expect(getHookType(testTitleFromAfterEachHook)).to.be.equal('after each')));
        });
    });

    /**
     * Tests for {@link envStringToBooleanNumber}
     */
    describe('Parse environment string to boolean number utility function', () => {
        it('should return 1(truthyValue) for value = true', () =>
            step('Verify that function returns 1', () =>
                expect(envStringToBooleanNumber('true')).to.equal(1)));

        it('should return 1(truthyValue) for value = 1', () =>
            step('Verify that function returns 1', () =>
                expect(envStringToBooleanNumber('1')).to.equal(1)));

        it('should return 1(truthyValue) for value = yes', () =>
            step('Verify that function returns 1', () =>
                expect(envStringToBooleanNumber('yes')).to.equal(1)));

        it('should return 1(truthyValue) for value = on', () =>
            step('Verify that function returns 1', () =>
                expect(envStringToBooleanNumber('on')).to.equal(1)));

        it('should return 0(falsyValue) for value = false', () =>
            step('Verify that function returns 0', () =>
                expect(envStringToBooleanNumber('false')).to.equal(0)));

        it('should return 0(falsyValue) for value = 0', () =>
            step('Verify that function returns 0', () =>
                expect(envStringToBooleanNumber('0')).to.equal(0)));

        it('should return 0(falsyValue) for value = no', () =>
            step('Verify that function returns 0', () =>
                expect(envStringToBooleanNumber('no')).to.equal(0)));

        it('should return 0(falsyValue) for value = off', () =>
            step('Verify that function returns 0', () =>
                expect(envStringToBooleanNumber('off')).to.equal(0)));
    });
});