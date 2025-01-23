'use strict';

import {registerCustomAfterEachHook, registerCustomBeforeHook} from "../../utils/hook-utils.js";
import {registerDefaultAfterHook, registerDefaultBeforeEachHook} from "../../hook-defaults.js";
import {logWithTimestamp} from "../../../logging/logs.js";
import {restoreArrayDefaultValues, testArray} from "./arrays-operations-test.js";

export function processHooks(title) {
    registerCustomBeforeHook(title, [{
        action: [
            () => restoreArrayDefaultValues(),
            () => logWithTimestamp(
                `TEST EXECUTION STARTED: WITH DATA = [${testArray}]\n`, 'before all')
        ],
        overrideMessage: 'Restore array default values'
    }])();

    registerDefaultAfterHook();
    registerDefaultBeforeEachHook();
    registerCustomAfterEachHook([{action: () => restoreArrayDefaultValues()}])();
}