import {DEFAULT_HOOK_GROUPS} from "../hook-defaults.js";
import {performActionsWithMessage} from "../../src/common/performable.js";
import {getHookType, getTitleWithoutHook, replaceDynamicallyTestTitleFromTestContext} from "../../src/utils/strings.js";
import {drawLogSeparator, getLogGroupingByHookType} from "../../logging/logs.js";
import {Validation} from "../../src/common/validation.js";

let stepCounter = 0;
const incrementStepCounterFunction = () => stepCounter++;
export const restoreStepCounterFunction = () => stepCounter = 0;

/**
 * Draws a visually distinctive separator for test test-suites in the logs.
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
 * It combines default actions for the hook with any custom actions provided and logs a message.
 *
 * @param {Object} params - The parameters for the hook action.
 * @param {Function|Array<Function>} [params.action] - The action(s) to be performed, can be a function or an array of functions.
 * @param {string} [params.concatMessage] - The message to be concatenated to the default message.
 * @param {string} [params.overrideMessage] - The message to override the default message.
 * @param {Object} params.testContext - The test context containing information about the test.
 *
 * @throws {Error} Throws an error if an unknown hook type is encountered.
 * @throws {Error} Throws an error if the test context is invalid.
 */
export function performHookWithMessageOrDefaults(
    {
        action = undefined,
        concatMessage = undefined,
        overrideMessage = undefined,
        testContext
    }) {

    let hookType = getHookType(testContext?.test?.title);

    Validation.startsFor(hookType)
        .checkNullOrEmpty(`Unknown hook type: ${hookType}`)
        .check(DEFAULT_HOOK_GROUPS[hookType], `Unknown hook type: ${hookType}`)
        .validate();

    const isDefined = (value) => value !== undefined;

    const messageBuilder = (concatMsg, overrideMsg, hookType) => {
        if (concatMsg) {
            return getLogGroupingByHookType(defaultHook.defaultMessage + (`: ${concatMsg}`), hookType);

        } else if (overrideMsg) {
            return getLogGroupingByHookType(overrideMsg, hookType);
        }

        return getLogGroupingByHookType(defaultHook.defaultMessage, hookType);
    };

    let defaultHook = DEFAULT_HOOK_GROUPS[hookType];
    let modifiedAction = isDefined(action)
        ? [...defaultHook.defaultAction, ...[].concat(action)]
        : [...defaultHook.defaultAction];


    let modifiedMessage = messageBuilder(concatMessage, overrideMessage, hookType);
    modifiedMessage = replaceDynamicallyTestTitleFromTestContext(
        modifiedMessage, getTitleWithoutHook(testContext.test.title));

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