/**
 * @file Provides logging functionality with timestamp and optional styling.
 * Supports logging to console and/or file based on configuration settings.
 *
 * This module includes:
 * - Logging messages with timestamps.
 * - Applying customizable styles to messages.
 * - Writing logs to the console, a file, or both based on configuration.
 * - Drawing separators for better log readability.
 *
 * @module logger
 * @requires ./date-time.js
 * @requires ./strings.js
 * @requires ./colors.js
 * @requires ./files.js
 * @requires ../../config/logs-config.js
 */

"use strict";

import {getTime} from "../src/utils/date-time.js";
import {checkIfNotEmptyOrNull} from "../src/utils/strings.js";
import {styleMessage} from "./colors.js";
import {logToFile} from "./files.js";
import {LOGS_CONFIG} from "../config/logs-config.js";

/* ----------------- Constants ----------------- */

/**
 * A self-invoking function that configures and returns a logger based on the application's logging configuration.
 *
 * The `writeLog` function is initialized once, and its behavior is determined by the current logging configuration
 * stored in `LOGS_CONFIG`. The logger supports three modes:
 * - `CONSOLE_ONLY`: Logs only to the console using the styled message.
 * - `FILE_ONLY`: Logs only to a file with plain text message (without styling).
 * - `BOTH`: Logs to both the console and a file, with respective formatting for each.
 *
 * Depending on the `CHALK_LEVEL` setting in `LOGS_CONFIG`, the messages are either styled with ANSI escape codes
 * (for `CHALK_LEVEL > 0`) or plain text messages are used (for `CHALK_LEVEL === 0`).
 *
 * This function is designed to return a logging function that can be called at runtime to log messages with or
 * without timestamps and styles.
 *
 * @constant
 * @type {function(string, string, boolean): void}
 * @description
 * A pre-configured logger function that uses the appropriate output mode and formatting settings from the
 * application's configuration. This function can be used throughout the application for consistent logging.
 *
 * @param {string} message - The message to be logged.
 * @param {string} [style] - The style to apply to the message. Possible values:
 *   - `'warn'`, `'error'`, `'info'`, `'success'`, etc. (styling will be applied if `CHALK_LEVEL > 0`).
 * @param {boolean} [includeTimestamp=false] - Whether to include a timestamp in the log.
 *   - If `true`, the timestamp is prepended to the log message.
 *
 * @returns {void} Logs the message based on the selected logging mode:
 *   - Logs to the console (styled message) if `LOGS_CONFIG.LOG_MODE` is set to `CONSOLE_ONLY`.
 *   - Logs to a file (plain message) if `LOGS_CONFIG.LOG_MODE` is set to `FILE_ONLY`.
 *   - Logs to both the console (styled message) and a file (plain message) if `LOGS_CONFIG.LOG_MODE` is set to `BOTH`.
 *
 * @example
 * // Example usage:
 * writeLog('This is a test message', 'warn', true); // Logs with yellow warning style and timestamp.
 * writeLog('Error message', 'error', false); // Logs error message without timestamp (plain text).
 * writeLog('Test message', 'info', true); // Logs with blue info style and timestamp.
 */
export const writeLog = (() => {
    const timestamp = (includeTimestamp) => (includeTimestamp ? `${getTime()} -- ` : '');

    const formatMessage = (() => {
        if (LOGS_CONFIG.CHALK_LEVEL === 0) {
            return (message, style, includeTimestamp) => {
                return {
                    styled: `${timestamp(includeTimestamp)}${message}`,
                    plain: `${timestamp(includeTimestamp)}${message}`,
                };
            }
        }

        return (message, style, includeTimestamp) => {
            const {styled, plain} = styleMessage(message, style);

            return {
                styled: `${timestamp(includeTimestamp)}${styled}`,
                plain: `${timestamp(includeTimestamp)}${plain}`,
            }
        };
    })();

    /**
     * Creates a logger function based on the current logging configuration.
     *
     * @function
     * @private
     * @returns {function(string, string, boolean): void} A pre-configured logger function.
     */
    const createLogger = () => {
        const toConsole = {
            isEnabled: LOGS_CONFIG.LOG_MODE === LOGS_CONFIG.OUTPUT_MODES.CONSOLE_ONLY,
            logger: (formattedMessage) => console.log(formattedMessage.styled),
        };

        const toFile = {
            isEnabled: LOGS_CONFIG.LOG_MODE === LOGS_CONFIG.OUTPUT_MODES.FILE_ONLY,
            logger: (formattedMessage) => logToFile(formattedMessage.plain),
        };

        const both = {
            isEnabled: LOGS_CONFIG.LOG_MODE === LOGS_CONFIG.OUTPUT_MODES.BOTH,
            logger: (formattedMessage) => {
                toConsole.logger(formattedMessage);
                toFile.logger(formattedMessage)
            }
        };

        if (both.isEnabled) return (message, style, includeTimestamp) =>
            both.logger(formatMessage(message, style, includeTimestamp));

        if (toConsole.isEnabled) return (message, style, includeTimestamp) =>
            toConsole.logger(formatMessage(message, style, includeTimestamp));

        if (toFile.isEnabled) return (message, style, includeTimestamp) =>
            toFile.logger(formatMessage(message, style, includeTimestamp))
    };

    return createLogger();
})();

/**
 * Returns a function that generates log grouping commands based on the test context and hook type.
 *
 * This function checks the configuration (`LOGS_CONFIG.CONSOLE_GROUPING`) to determine whether log grouping
 * is enabled in the console. If grouping is enabled, it generates the appropriate log grouping commands
 * based on the test hook type (e.g., "before each" or "after each").
 *
 * If grouping is disabled, the function simply returns the original message without modification.
 *
 * @function
 * @returns {function(Object, string): string} A function that takes the test context and hook type, and returns:
 * - `'##[group]'` followed by the message if the hook type is `before each` or `before all`.
 * - The message followed by `'\n##[endgroup]'` if the hook type is `after each` or `after all`.
 * - The original message for other cases.
 *
 * @example
 * const groupLogs = getLogGroupingByHookType();
 * const context = { test: { title: 'before each: setup test' } };
 * console.log(groupLogs(context, 'before each')); // Outputs: '##[group] before each: setup test'
 *
 * const anotherContext = { test: { title: 'after each: cleanup test' } };
 * console.log(groupLogs(anotherContext, 'after each')); // Outputs: 'after each: cleanup test\n##[endgroup]'
 */
export const getLogGroupingByHookType = (() => {
    if (LOGS_CONFIG.CONSOLE_GROUPING === 'false') {
        return (message, hookType) => message;

    } else {
        return (message, hookType) => {
            switch (hookType) {
                case 'before each':
                    return '##[group]'.concat(message);
                case 'after each':
                    return message.concat('\n##[endgroup]');
                default:
                    return message;
            }
        }
    }
})();

/* ----------------- Utility Functions ----------------- */

/**
 * Logs a message with a timestamp and optional style applied.
 *
 * @param {string} message - The message to be logged.
 * @param {string} [style] - The optional style to apply to the message.
 */
export function logWithTimestamp(message, style = '') {
    if (!checkIfNotEmptyOrNull(message)) return;

    writeLog(message, style, true);
}

/**
 * Draws a separator line in the logs for visual clarity.
 *
 * @param {string} [message] - An optional message to include in the separator line.
 *                             If not provided, only the separator will be drawn.
 * @param {string} [style=''] - An optional style string to apply formatting to the message.
 *                               Defaults to an empty string (no style).
 */
export const drawLogSeparator = (message, style = '') => {
    writeLog(`\n${"-".repeat(55)}${message ? ` ${message} ` : ''}${"-".repeat(55)}`, style, false)
};