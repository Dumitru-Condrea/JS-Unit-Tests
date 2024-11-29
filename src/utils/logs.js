/**
 * @file Provides logging functionality with timestamp and optional styling,
 * and supports logging to console and/or file based on configuration.
 *
 * This module includes functions for logging messages with timestamps, applying styles,
 * and writing logs either to the console, a file, or both based on configuration settings.
 *
 * Functions:
 * - `logWithTime`: Logs a message with a timestamp and optional style.
 * - `applyStyle`: Applies the appropriate style to a message based on the style argument.
 * - `writeLogUsingConfig`: Writes the log message to the console or a file, depending on the configuration.
 * - `drawTestSeparator`: Draws a separator line to visually separate sections of logs.
 *
 * @module logger
 * @requires ./date-time.js
 * @requires ./string.js
 * @requires ./colors.js
 * @requires ./files.js
 * @requires ../../config/logs-config.js
 */

"use strict";

import {getTime} from "./date-time.js";
import {checkIfNotEmptyOrNull} from "./string.js";
import Colors from "./colors.js";
import {logToFile} from "./files.js";
import {CONFIG} from "../../config/logs-config.js";

/**
 * Logs a message with a timestamp and optional style applied.
 *
 * @param {string} message - The message to log.
 * @param {string} style - The style to apply to the message.
 */
export function logWithTime(message, style) {
    if (!checkIfNotEmptyOrNull(message)) return;

    writeLogUsingConfig(`${getTime()} -- ${message}`, style);
}

/**
 * Applies the appropriate style to the message based on the style argument.
 *
 * @param {string} message - The message to apply the style to.
 * @param {string} style - The style name to apply.
 * @returns {string} - The styled message.
 */
function applyStyle(message, style) {
    const styleGroups = {
        'before all,after all': Colors.BlueBold,
        'before each,after each': Colors.Cyan,
        'success,step': Colors.Green,
        'warn': Colors.Yellow,
        'error': Colors.Red,
        'info': Colors.Blue
    };

    const appliedStyle = Object.entries(styleGroups)
        .find(([keys]) => keys.split(',').includes(style));

    return appliedStyle ? appliedStyle[1](message) : message;
}

/**
 * Writes a log message to the console or a file based on the configuration.
 *
 * @param {string} message - The message to log.
 * @param {string} style - The style to apply to the message.
 */
function writeLogUsingConfig(message, style) {
    const {LOG_MODE, OUTPUT_MODES} = CONFIG;

    if ([OUTPUT_MODES.CONSOLE_ONLY, OUTPUT_MODES.BOTH].includes(LOG_MODE)) {
        console.log(applyStyle(message, style));
    }

    if ([OUTPUT_MODES.FILE_ONLY, OUTPUT_MODES.BOTH].includes(LOG_MODE)) {
        logToFile(message);
    }
}

/**
 * Draws a separator line to visually separate sections of logs.
 */
export const drawTestSeparator = () => writeLogUsingConfig("-".repeat(120), '');