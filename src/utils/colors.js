"use strict";

import chalk from "../../config/logs-config.js";

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