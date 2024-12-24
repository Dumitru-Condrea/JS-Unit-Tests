'use strict';

/**
 * Centralized test importer for the project.
 *
 * This file imports all test files from different directories and groups them
 * together for easy management and execution in the Mocha test runner. Each
 * test file must be imported here to be executed in the testing process.
 *
 * @module test/suites/index
 */

import './arrays/arrays-test.js';
import './arrays-utils/array-utils-test.js';
import './utils/string-utils-test.js';