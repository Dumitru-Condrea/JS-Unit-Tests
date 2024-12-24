import {performHookWithMessageOrDefaults as hook} from "./test-utils.js";
import {
    registerDefaultAfterEachHook,
    registerDefaultAfterHook,
    registerDefaultBeforeEachHook,
    registerDefaultBeforeHook
} from "../hook-defaults.js";

export let testSuiteName = "testSuite";
export const setTestSuiteName = (name) => testSuiteName = name;

/**
 * Registers default hooks (before, after, beforeEach, afterEach) for a Mocha test suite.
 *
 * This function sets up default hooks that execute specified operations at different stages of the test lifecycle.
 *
 * @param {string} title - The title for the test suite, displayed as a separator.
 */
export function processDefaultHooks(title) {
    registerDefaultBeforeHook(title);
    registerDefaultAfterHook();
    registerDefaultBeforeEachHook();
    registerDefaultAfterEachHook();
}

/**
 * Registers custom "before all" hooks for a test suite.
 *
 * @param {string} title - The title for the test suite, displayed as a separator.
 * @param {Array<Object>} hooks - An array of hook objects to register.
 * @param {Function} hooks[].action - The custom action to execute in the hook.
 * @param {string} [hooks[].concatMessage] - Additional message to append to the default message.
 * @param {string} [hooks[].overrideMessage] - Custom message to override the default message.
 * @returns {Function} A function that registers the hooks when invoked.
 */
export function registerCustomBeforeHook(title, hooks) {
    setTestSuiteName(title);

    return () => before(function () {
        hooks.forEach(({action, concatMessage, overrideMessage}) => {
            hook({
                action: action,
                concatMessage: concatMessage,
                overrideMessage: overrideMessage,
                testContext: this,
            });
        });
    });
}

/**
 * Registers custom "after all" hooks for a test suite.
 *
 * @param {Array<Object>} hooks - An array of hook objects to register.
 * @param {Function} hooks[].action - The custom action to execute in the hook.
 * @param {string} [hooks[].concatMessage] - Additional message to append to the default message.
 * @param {string} [hooks[].overrideMessage] - Custom message to override the default message.
 * @returns {Function} A function that registers the hooks when invoked.
 */
export function registerCustomAfterHook(hooks) {
    return () => after(function () {
        hooks.forEach(({action, concatMessage, overrideMessage}) => {
            hook({
                action: action,
                concatMessage: concatMessage,
                overrideMessage: overrideMessage,
                testContext: this,
            });
        });
    });
}

/**
 * Registers custom "before each" hooks for individual tests in a test suite.
 *
 * @param {Array<Object>} hooks - An array of hook objects to register.
 * @param {Function} hooks[].action - The custom action to execute in the hook.
 * @param {string} [hooks[].concatMessage] - Additional message to append to the default message.
 * @param {string} [hooks[].overrideMessage] - Custom message to override the default message.
 * @returns {Function} A function that registers the hooks when invoked.
 */
export function registerCustomBeforeEachHook(hooks) {
    return () => beforeEach(function () {
        hooks.forEach(({action, concatMessage, overrideMessage}) => {
            hook({
                action: action,
                concatMessage: concatMessage,
                overrideMessage: overrideMessage,
                testContext: this,
            });
        });
    });
}

/**
 * Registers custom "after each" hooks for individual tests in a test suite.
 *
 * @param {Array<Object>} hooks - An array of hook objects to register.
 * @param {Function} hooks[].action - The custom action to execute in the hook.
 * @param {string} [hooks[].concatMessage] - Additional message to append to the default message.
 * @param {string} [hooks[].overrideMessage] - Custom message to override the default message.
 * @returns {Function} A function that registers the hooks when invoked.
 */
export function registerCustomAfterEachHook(hooks) {
    return () => afterEach(function () {
        hooks.forEach(({action, concatMessage, overrideMessage}) => {
            hook({
                action: action,
                concatMessage: concatMessage,
                overrideMessage: overrideMessage,
                testContext: this,
            });
        });
    });
}