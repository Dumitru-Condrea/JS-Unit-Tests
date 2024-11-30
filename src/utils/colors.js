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
import {LOGS_CONFIG as LOGS_CONFIG} from "../../config/logs-config.js";

// Set chalk level for logs configuration file
chalk.level = [0, 1, 2, 3].includes(LOGS_CONFIG.CHALK_LEVEL)
    ? LOGS_CONFIG.CHALK_LEVEL
    : 0;

export default {
    Green: (msg) => chalk.green(msg),
    GreenBold: (msg) => chalk.green.bold(msg),
    Yellow: (msg) => chalk.yellow(msg),
    YellowBold: (msg) => chalk.yellow.bold(msg),
    Blue: (msg) => chalk.blue(msg),
    BlueBold: (msg) => chalk.blue.bold(msg),
    Cyan: (msg) => chalk.cyan(msg),
    CyanBold: (msg) => chalk.cyan.bold(msg),
    Red: (msg) => chalk.red(msg),
    RedBold: (msg) => chalk.red.bold(msg),
};