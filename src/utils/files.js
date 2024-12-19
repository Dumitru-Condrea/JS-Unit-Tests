/**
 * @file Provides functionality for logging messages to a file in the 'temp' directory.
 *
 * This module includes a function to log messages to a uniquely named file. The log files are saved
 * in a `temp` directory located at the project root. Each log file is named using a timestamp-based
 * format to ensure that filenames are unique. If the `temp` directory doesn't exist, it will be created.
 *
 * Functions:
 * - `logToFile`: Writes a log message to a file, creating the directory and file if necessary.
 *
 * @module file-logger
 */

"use strict";

import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {getFileSafeDateTime} from "./date-time.js";
import {LOGS_CONFIG} from "../../config/logs-config.js";


/**
 * Generates a file-safe date-time string for log file naming or returns `null` for console logging.
 *
 * Ensures logs from the same session are recorded in a single file when `LOGS_CONFIG.LOG_MODE` is not 'console'.
 * Uses `getFileSafeDateTime()` for consistent, safe file naming.
 *
 * @constant {string|null} fileDateTime
 * @description A file-safe date-time string for log files or `null` if logging is set to console output.
 */
const fileDateTime = (() => LOGS_CONFIG.LOG_MODE === 'console' ? null : getFileSafeDateTime())();

/**
 * Writes a log message to a file in the 'temp' directory at the project root.
 * The log file is named with a safe date-time format, ensuring unique filenames.
 * If the 'temp' directory does not exist, it will be created.
 *
 * @param {string} message - The log message to write to the file.
 * @throws {Error} Throws an error if there's an issue creating or writing the log file.
 */
export function logToFile(message) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rootDir = path.resolve(__dirname, "../..");
    const tempDir = path.join(rootDir, "temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, {recursive: true});
    }

    const logFilePath = path.join(tempDir, `output_${fileDateTime}.log`);

    const logFile = fs.createWriteStream(logFilePath, {flags: "a"});
    logFile.write(`${message}\n`);
}