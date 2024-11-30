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
 * @param {string} message - The message to be logged.
 * @param {string} [style] - The optional style to apply to the message.
 *                           Defaults to no styling if not provided.
 */
export function logWithTimestamp(message, style = '') {
    if (!checkIfNotEmptyOrNull(message)) return;
    writeLog(message, style, true);
}

/**
 * Applies a predefined style to a message.
 *
 * @param {string} message - The message to style.
 * @param {string} style - The style identifier to apply (e.g., "success", "error").
 * @returns {string} - The styled message or the original message if no matching style is found.
 */
function styleMessage(message, style) {
    const styleMap = {
        'before all,after all': Colors.BlueBold,
        'before each,after each': Colors.Cyan,
        'success,step': Colors.Green,
        'warn': Colors.Yellow,
        'error': Colors.Red,
        'info': Colors.Blue,
    };

    const matchedStyle = Object.entries(styleMap)
        .find(([keys]) => keys.split(',').includes(style));

    return matchedStyle ? matchedStyle[1](message) : message;
}

/**
 * Logs a message to the console, a file, or both based on configuration settings.
 *
 * @param {string} message - The message to log.
 * @param {string} [style] - The optional style to apply.
 * @param {boolean} [includeTimestamp=false] - Whether to prepend a timestamp to the message.
 */
function writeLog(message, style = '', includeTimestamp = false) {
    const { LOG_MODE, OUTPUT_MODES } = CONFIG;

    const timestamp = includeTimestamp ? `${getTime()} -- ` : '';
    const styledMessage = styleMessage(message, style);

    if ([OUTPUT_MODES.CONSOLE_ONLY, OUTPUT_MODES.BOTH].includes(LOG_MODE)) {
        console.log(`${timestamp}${styledMessage}`);
    }

    if ([OUTPUT_MODES.FILE_ONLY, OUTPUT_MODES.BOTH].includes(LOG_MODE)) {
        logToFile(`${timestamp}${message}`);
    }
}

/**
 * Draws a separator line in the logs for visual clarity.
 */
export const drawLogSeparator = () => writeLog("-".repeat(120));