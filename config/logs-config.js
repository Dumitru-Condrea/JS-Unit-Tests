/**
 * @file Configuration module for logging settings.
 * Loads environment variables and defines logging configuration options.
 * @module logs-config
 */

"use strict";

import dotenv from "dotenv";
import {envStringToBooleanNumber} from "../src/utils/strings.js";

dotenv.config({path: './config/logs-config.env'});

export const LOGS_CONFIG = {
    OUTPUT_MODES: {
        CONSOLE_ONLY: "console",
        FILE_ONLY: "file",
        BOTH: "both",
    },
    LOG_MODE: process.env.LOG_MODE || "console",
    CHALK_LEVEL: envStringToBooleanNumber(process.env.CONSOLE_COLORS),
    CONSOLE_GROUPING: process.env.CONSOLE_GROUPING || "false",
};
