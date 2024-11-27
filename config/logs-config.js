"use strict";
import chalk from "chalk";

/**
 * This module provides a customized instance of the `chalk` library with color output settings.
 *
 * The `chalk.level` controls the colorization of text when using the `chalk` library.
 * This file sets a custom `chalk` instance that is used across the application to handle color output.
 *
 * **`chalk.level` behavior:**
 * - **`chalk.level = 1`**: Enables color output in environments that support colors. When set to `1`, colors will be applied to the text, making logs more visually distinct (e.g., colored logs for error, success, and warnings).
 * - **`chalk.level = 0`**: Disables color output. If set to `0`, no colors will be applied to the text, and all logs will be plain text. This setting is useful when working in environments that do not support color output or when you prefer logs without any styling.
 *
 * **Usage:**
 * - The custom `chalk` instance with color settings is exported for use in other files.
 * - Adjusting the `chalk.level` allows you to control the logging behavior globally in your application. For example, if you want to disable color output for debugging, you can set `chalk.level = 0` globally, and all logs will be printed in plain text without colors.
 */
chalk.level = 1;

export default chalk;
