/**
 * @file Manages test hooks and step tracking for array manipulation tests.
 *
 * Provides hook setup, step counter management, and default hook configurations
 * for Mocha test framework.
 *
 * @module test-hooks
 * @requires ../src/arrays.js
 * @requires ../src/utils/performable.js
 * @requires ../src/utils/string.js
 * @requires ../src/utils/logs.js
 * @requires ../src/test/utils/test-utils.js
 */

"use strict";

import * as parent from "../src/arrays.js";
import {getTitleWithoutHook} from "../src/utils/string.js";
import {
    drawLogSeparator,
    getLogsGroupingByTestContext as startGroupTestInLog,
    getLogsGroupingByTestContext as endGroupTestInLog
} from "../src/utils/logs.js";
import {
    drawTestSuiteSeparator,
    performHookWithMessageOrDefaults as hook,
    restoreStepCounterFunction
} from "./utils/test-utils.js";

export const DEFAULT_HOOK_GROUPS = {
    'before all': {
        defaultAction: [],
        defaultMessage: "TEST EXECUTION STARTED",
    },
    'after all': {
        defaultAction: [],
        defaultMessage: "TEST EXECUTION FINISHED",
    },
    'before each': {
        defaultAction: [() => restoreStepCounterFunction()],
        defaultMessage: "Executing Test",
    },
    'after each': {
        defaultAction: [
            () => restoreStepCounterFunction(),
            () => drawLogSeparator()
        ],
        defaultMessage: "Test Finished",
    },
};

/**
 * Sets up the `before` hook to perform actions before all test in a suite.
 * This hook restores array default values and logs the test execution start message.
 */
function setupBeforeAll() {
    before(function () {
        hook({
            action: () => drawTestSuiteSeparator('Array Manipulation Functions'),
            message: ' ',
            testContext: this,
        });

        hook({
            action: () => parent.restoreArrayDefaultValues(),
            message: 'Restore array default values',
            testContext: this,
        });

        hook({
            message: `TEST EXECUTION STARTED WITH DATA: [${parent.array}]`,
            testContext: this,
        });
    });
}

/**
 * Sets up the `after` hook to perform actions after all test in a suite.
 * This hook logs the test execution completion message.
 */
function setupAfterAll() {
    after(function () {
        hook({
            testContext: this,
        });
    });
}

/**
 * Sets up the `beforeEach` hook to perform actions before each test in a suite.
 * This hook logs the start of each test execution.
 */
function setupBeforeEach() {
    beforeEach(function () {
        hook({
            message: `${startGroupTestInLog(this)}Executing Test: ${getTitleWithoutHook(this.test.title)}`,
            testContext: this
        });
    });
}

/**
 * Sets up the `afterEach` hook to perform actions after each test in a suite.
 * This hook restores array default values after each test execution.
 */
function setupAfterEach() {
    afterEach(function () {
        hook({
            action: () => parent.restoreArrayDefaultValues(),
            message: `Test Finished: ${getTitleWithoutHook(this.test.title)}\n${endGroupTestInLog(this)}`,
            testContext: this,
        });
    });
}

/**
 * Configures all hooks (`before`, `after`, `beforeEach`, `afterEach`) for the test suite.
 * These hooks manage setup, teardown, and logging for the test execution process.
 */
export function setupHooks() {
    setupBeforeAll();
    setupAfterAll();
    setupBeforeEach();
    setupAfterEach();
}