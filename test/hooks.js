"use strict";
import * as parent from "../src/arrays.js";
import {performHookWithMessageOrDefaults} from "../src/utils/performable.js";
import {getTitleWithoutHook} from "../src/utils/string.js";
import {drawTestSeparator} from "../src/utils/logs.js";

export let stepCounter = 0;
export const restoreStepCounterFunction = () => stepCounter = 0;
export const incrementStepCounterFunction = () => stepCounter++;

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
            () => drawTestSeparator()
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
        performHookWithMessageOrDefaults({
            action: () => parent.restoreArrayDefaultValues(),
            message: 'Restore array default values',
            testContext: this,
        });

        performHookWithMessageOrDefaults({
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
        performHookWithMessageOrDefaults({
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
        performHookWithMessageOrDefaults({
            message: `Executing Test: ${getTitleWithoutHook(this.test.title)}`,
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
        performHookWithMessageOrDefaults({
            action: () => parent.restoreArrayDefaultValues(),
            message: `Test Finished: ${getTitleWithoutHook(this.test.title)}`,
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