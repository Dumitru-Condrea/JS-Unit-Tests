"use strict";
import {getTime} from "./date-utils.js";

import {checkIfNotEmptyOrNull} from "./string-utils.js";
import Colors from "./colors.js";

/**
 * Logs a message with a timestamp and optional styling based on the provided style.
 *
 * @param {string} message - The message to log.
 * @param {string} style - The style category for logging (e.g., 'warn', 'error', etc.).
 */
export function logWithTime(message, style) {
    if (!checkIfNotEmptyOrNull(message)) return;

    const logMessage = `${getTime()} -- ${message}`;
    const styleGroups = {
        'before all,after all': Colors.BlueBold,
        'before each,after each': Colors.Cyan,
        'success,step': Colors.Green,
        'warn': Colors.Yellow,
        'error': Colors.Red,
    };

    const appliedStyle = Object.entries(styleGroups)
        .find(([keys]) => keys.split(',').includes(style));

    const styledLog = appliedStyle ? appliedStyle[1](logMessage) : logMessage;

    console.log(styledLog);
}

/**
 * Draws a separator line to visually separate sections of logs.
 */
export const drawTestSeparator = () => console.log("-".repeat(125));


