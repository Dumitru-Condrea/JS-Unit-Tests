/**
 * @file Configuration module for logging settings.
 * Loads environment variables and defines logging configuration options.
 * @module logs-config
 */

"use strict";

import dotenv from "dotenv";
import {envStringToBooleanNumber} from "../src/utils/string.js";

dotenv.config({path: "./logs-config.env"});

export const CONFIG = {
    OUTPUT_MODES: {
        CONSOLE_ONLY: "console",
        FILE_ONLY: "file",
        BOTH: "both",
    },
    LOG_MODE: process.env.LOG_MODE || "console",
    CHALK_LEVEL: envStringToBooleanNumber(process.env.CONSOLE_COLORS),
};
