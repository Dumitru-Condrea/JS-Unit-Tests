'use strict';

import * as testTarget from "../../../src/arrays-operations.js";
import {registerCustomAfterEachHook, registerCustomBeforeHook} from "../../utils/hook-utils.js";
import {registerDefaultAfterHook, registerDefaultBeforeEachHook} from "../../hook-defaults.js";
import {logWithTimestamp} from "../../../logging/logs.js";

export function processHooks(title) {
    registerCustomBeforeHook(title, [{
        action: [
            () => testTarget.restoreArrayDefaultValues(),
            () => logWithTimestamp(
                `TEST EXECUTION STARTED: WITH DATA = [${testTarget.array}]\n`, 'before all')
        ],
        overrideMessage: 'Restore array default values'
    }])();

    registerDefaultAfterHook();
    registerDefaultBeforeEachHook();
    registerCustomAfterEachHook([{action: () => testTarget.restoreArrayDefaultValues()}])();
}