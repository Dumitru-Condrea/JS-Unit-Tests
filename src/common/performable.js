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
 * @module performable
 */

"use strict";

import {logWithTimestamp} from "../../logging/logs.js";

/**
 * Performs an array of actions with a given message and style.
 *
 * @param {string} [message] - The message to be logged, optional.
 * @param {Function|Array<Function>} actionsToPerform - The action(s) to be performed.
 * @param {string} [style] - The style to be used for logging (e.g., 'step', 'error'), optional.
 */
export function performActionsWithMessage(message, actionsToPerform, style) {
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
        actions.forEach(execAction);
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
