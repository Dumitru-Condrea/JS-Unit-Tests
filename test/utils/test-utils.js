import {DEFAULT_HOOK_GROUPS} from "../hooks.js";
import {performActionsWithMessage} from "../../src/utils/performable.js";
import {getHookType} from "../../src/utils/string.js";
import {drawLogSeparator} from "../../src/utils/logs.js";
import {Validation} from "../../src/utils/validation.js";

export let stepCounter = 0;
export const restoreStepCounterFunction = () => stepCounter = 0;
export const incrementStepCounterFunction = () => stepCounter++;

/**
 * Draws a visually distinctive separator for test suites in the logs.
 *
 * This function creates a log entry consisting of a separator line
 * with the specified `name` prominently displayed in the center.
 * The separator is intended to make test suite sections easily distinguishable in the logs.
 *
 * @param {string} name - The name or title of the test suite to be displayed within the separator.
 */
export const drawTestSuiteSeparator = (name) => drawLogSeparator(name, 'test suite');

/**
 * Performs an action with a message or applies default actions for the given hook type.
 *
 * This function is used to execute a series of actions for a specific hook type (e.g., 'before all', 'after each').
 * It combines default actions for the hook with any custom actions provided, and logs a message.
 *
 * @param {Object} params - The parameters for the hook action.
 * @param {Function|Array<Function>} [params.action] - The action(s) to be performed, can be a function or an array of functions.
 * @param {string} [params.message] - The message to be logged alongside the action.
 * @param {Object} params.testContext - The test context containing information about the test.
 *
 * @throws {Error} Throws an error if an unknown hook type is encountered.
 */
export function performHookWithMessageOrDefaults({action = undefined, message = undefined, testContext}) {
    let hookType = getHookType(testContext?.test?.title);

    Validation.startsFor(hookType)
        .checkNullOrEmpty(`Unknown hook type: ${hookType}`)
        .check(DEFAULT_HOOK_GROUPS[hookType], `Unknown hook type: ${hookType}`)
        .validate();

    let isDefined = (value) => value !== undefined;

    let defaultHook = DEFAULT_HOOK_GROUPS[hookType];
    let modifiedAction = isDefined(action)
        ? [...defaultHook.defaultAction, ...[].concat(action)]
        : [...defaultHook.defaultAction];

    let modifiedMessage = isDefined(message) ? message : defaultHook.defaultMessage;

    performActionsWithMessage(modifiedMessage, modifiedAction, hookType);
}

/**
 * Performs a step action with a message, incrementing the step counter for each step.
 *
 * @param {Function|Array<Function>} action - The action(s) to be performed for the step.
 * @param {string} message - The message to be logged for the step.
 */
export function performStepWithMessage(message, action) {
    incrementStepCounterFunction();
    message = `    STEP ${stepCounter}: ${message}`;
    performActionsWithMessage(message, action, "step");
}