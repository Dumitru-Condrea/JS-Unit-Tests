/**
 * @file Provides utility functions for executing hook actions with logging and step tracking.
 *
 * This module includes functions that perform actions for specific hook types, step actions, and
 * actions with messages, logging the time and handling step increments. It supports both default
 * actions and custom actions, logging relevant messages with custom or default styles.
 *
 * Functions:
 * - `performHookWithMessageOrDefaults`: Executes hook actions with custom or default messages.
 * - `performStepWithMessage`: Performs a step action and logs it, incrementing the step counter.
 * - `performActionsWithMessage`: Performs an array of actions and logs them with a message.
 * - `performActions`: Executes a list of actions provided as functions.
 * - `performActionToArrayOrValue`: Executes an action on an array or individual value.
 *
 * @module performable-utils
 */

"use strict";

import {logWithTimestamp} from "./logs.js";
import {DEFAULT_HOOK_GROUPS, incrementStepCounterFunction, stepCounter} from "../../test/hooks.js";
import {getHookType} from "./string.js";

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
    if (!hookType || !DEFAULT_HOOK_GROUPS[hookType]) {
        throw new Error(`Unknown hook type: ${hookType}`);
    }

    let isDefined = (value) => value !== undefined;

    let defaultHook = DEFAULT_HOOK_GROUPS[hookType];
    let modifiedAction = isDefined(action)
        ? [...defaultHook.defaultAction, ...[].concat(action)]
        : [...defaultHook.defaultAction];

    let modifiedMessage = isDefined(message) ? message : defaultHook.defaultMessage;

    performActionsWithMessage(modifiedAction, modifiedMessage, hookType);
}

/**
 * Performs a step action with a message, incrementing the step counter for each step.
 *
 * @param {Function|Array<Function>} action - The action(s) to be performed for the step.
 * @param {string} message - The message to be logged for the step.
 */
export function performStepWithMessage(action, message) {
    incrementStepCounterFunction();
    message = `    STEP ${stepCounter}: ${message}`;
    performActionsWithMessage(action, message, "step");
}

/**
 * Performs an array of actions with a given message and style.
 *
 * @param {Function|Array<Function>} actionsToPerform - The action(s) to be performed.
 * @param {string} [message] - The message to be logged, optional.
 * @param {string} [style] - The style to be used for logging (e.g., 'step', 'error'), optional.
 */
export function performActionsWithMessage(actionsToPerform, message, style) {
    if (!Array.isArray(actionsToPerform)) {
        actionsToPerform = [actionsToPerform];
    }

    logWithTimestamp(message, style);
    performActions(actionsToPerform);
}

/**
 * Executes a list of actions, where each action is expected to be a function.
 *
 * @param {Array<Function>} actions - The list of actions to be executed.
 */
export function performActions(actions) {
    let execAction = (action) => isFunction(action) && action();

    let isFunction = (value) => typeof value === 'function' ||
        (logWithTimestamp(`Action has been skipped because its typeof is ${typeof value}`, "warn") && false);

    if (Array.isArray(actions) && actions.length > 0) {
        actions.forEach(execAction); // Executes each action in the array
    }
}

/**
 * Performs an action on each item in the provided value, or on the value itself if it's not an array.
 *
 * @param {Array|*} value - The value or array of values on which the action is to be performed.
 * @param {Function} actionToPerform - The action to be executed on the value(s).
 */
export function performActionToArrayOrValue(value, actionToPerform) {
    Array.isArray(value)
        ? value.forEach(value => actionToPerform(value))
        : actionToPerform(value);
}
