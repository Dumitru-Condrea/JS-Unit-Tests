/**
 * @file Configures the chalk library's color support level and
 * provides pre-defined log styling functions for consistent, color-coded logging.
 *
 * @module color-utils
 * @requires chalk
 * @requires ../../config/logs-config.js
 */

"use strict";

import chalk from "chalk";
import {LOGS_CONFIG} from "../config/logs-config.js";
import {stripANSIEscapeCodes} from "../src/utils/strings.js";

// ---------- Configurations ---------- //

/**
 * Sets the Chalk library's color support level.
 * Defaults to 0 if an invalid level is provided in the configuration.
 */
chalk.level = [0, 1, 2, 3].includes(LOGS_CONFIG.CHALK_LEVEL)
    ? LOGS_CONFIG.CHALK_LEVEL
    : 0;

// ---------- Color Utilities ---------- //

/**
 * Predefined colors for styling messages.
 * Each property corresponds to a specific Chalk styling function.
 */
export const colors = {
    Green: (msg) => chalk.green(msg),
    LightGreen: (msg) => chalk.greenBright(msg),
    GreenBold: (msg) => chalk.green.bold(msg),
    Yellow: (msg) => chalk.yellow(msg),
    YellowBold: (msg) => chalk.yellow.bold(msg),
    Blue: (msg) => chalk.blue(msg),
    BlueBold: (msg) => chalk.blue.bold(msg),
    Cyan: (msg) => chalk.cyan(msg),
    CyanBold: (msg) => chalk.cyan.bold(msg),
    Red: (msg) => chalk.red(msg),
    RedBold: (msg) => chalk.red.bold(msg),
    MagentaBold: (msg) => chalk.magenta.bold(msg),
};

// ---------- Styling Function ---------- //

/**
 * Styles a message based on the specified style and returns both the original and styled versions.
 *
 * This function applies predefined styles to a message using a style map. It returns an object
 * containing the original message (`defaultMessage`) and the styled message (`styledMessage`).
 * The ANSI escape codes are removed only when the `custom` style is used, ensuring performance
 * optimization for other styles.
 *
 * @param {string} message - The message to be styled.
 * @param {string} [style=''] - The style to apply to the message.
 * Possible values:
 * - `'before all,after all'`: Applies a bold blue style.
 * - `'before each,after each'`: Applies a cyan style.
 * - `'success,step'`: Applies a bright green style.
 * - `'warn'`: Applies a yellow style.
 * - `'error'`: Applies a red style.
 * - `'info'`: Applies a blue style.
 * - `'test suite'`: Applies a magenta style.
 * - `'custom'`: Keeps the original message but removes ANSI escape codes for `defaultMessage`.
 *
 * @returns {Object} - An object containing two properties:
 * - `defaultMessage`: The original message, stripped of ANSI escape codes only for the `custom` style.
 * - `styledMessage`: The styled version of the message.
 *
 * @example
 * const styled1 = styleMessage('Test message', 'warn');
 * console.log(styled1.styledMessage); // Yellow styled message
 * console.log(styled1.defaultMessage); // "Test message" (original)
 *
 * const styled2 = styleMessage('\u001b[31mCustom styled message\u001b[0m', 'custom');
 * console.log(styled2.styledMessage); // Original message with ANSI
 * console.log(styled2.defaultMessage); // "Custom styled message" (without ANSI)
 */
export function styleMessage(message, style = '') {
    let plain = message;
    let styled = message;

    const styleMap = {
        'before all,after all': colors.BlueBold,
        'before each,after each': colors.Cyan,
        'success,step': colors.LightGreen,
        'warn': colors.Yellow,
        'error': colors.Red,
        'info': colors.Blue,
        'test suite': colors.MagentaBold,
        'custom': () => {
            plain = stripANSIEscapeCodes(message);
            return message;
        },
    };

    const matchedStyle = Object.keys(styleMap).find((key) =>
        key.split(',').includes(style)
    );

    if (matchedStyle) {
        const applyStyle = styleMap[matchedStyle];
        styled = applyStyle(message);
    }

    return {
        plain: plain,
        styled: styled,
    };
}