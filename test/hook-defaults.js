/**
 * @file Manages test hooks and step tracking for array manipulation tests.
 *
 * Provides hook setup, step counter management, and default hook configurations
 * for Mocha test framework.
 *
 * @module test-hooks-defaults
 * @requires ../src/utils/logs.js
 * @requires ../src/test/utils/test-utils.js
 */

"use strict";

import {drawLogSeparator, logWithTimestamp} from "../logging/logs.js";
import {
    drawTestSuiteSeparator,
    performHookWithMessageOrDefaults as hook,
    restoreStepCounterFunction
} from "./utils/test-utils.js";
import {setTestSuiteName, testSuiteName} from "./utils/hook-utils.js";

export const DEFAULT_HOOK_GROUPS = {
    'before all': {
        defaultAction: [() => drawTestSuiteSeparator(testSuiteName)],
        defaultMessage: '',
    },
    'after all': {
        defaultAction: [() => logWithTimestamp(`[${testSuiteName}] Suite Finished`, 'after all')],
        defaultMessage: '',
    },
    'before each': {
        defaultAction: [() => restoreStepCounterFunction()],
        defaultMessage: 'Executing Test: this.test.title',
    },
    'after each': {
        defaultAction: [
            () => restoreStepCounterFunction(),
            () => drawLogSeparator(),
        ],
        defaultMessage: 'Test Finished: this.test.title',
    },
};

/**
 * Registers a default "before all" hook for a test suite.
 *
 * This hook is executed once before all tests in the suite. It draws a separator with the given title
 * and performs a default setup action using the test context.
 *
 * @param {string} title - The title to display as a separator.
 */
export const registerDefaultBeforeHook = (title) =>
    before(function () {
        setTestSuiteName(title);
        hook({testContext: this});
    });

/**
 * Registers a default "after all" hook for a test suite.
 *
 * This hook is executed once after all tests in the suite and performs a default teardown action
 * using the test context.
 */
export const registerDefaultAfterHook = () =>
    after(function () {
        hook({testContext: this});
    });

/**
 * Registers a default "before each" hook for a test suite.
 *
 * This hook is executed before each individual test in the suite and performs a default setup action
 * using the test context.
 */
export const registerDefaultBeforeEachHook = () =>
    beforeEach(function () {
        hook({testContext: this});
    });

/**
 * Registers a default "after each" hook for a test suite.
 *
 * This hook is executed after each individual test in the suite and performs a default teardown action
 * using the test context.
 */
export const registerDefaultAfterEachHook = () =>
    afterEach(function () {
        hook({testContext: this});
    });