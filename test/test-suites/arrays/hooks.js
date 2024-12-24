'use strict';

import * as parent from "../../../src/arrays.js";
import {registerCustomAfterEachHook, registerCustomBeforeHook} from "../../utils/hook-utils.js";
import {registerDefaultAfterHook, registerDefaultBeforeEachHook} from "../../hook-defaults.js";

export function processHooks() {
    registerCustomBeforeHook('Array Manipulation Functions', [{
        action: () => parent.restoreArrayDefaultValues(),
        overrideMessage: 'Restore array default values'
    }])();

    registerDefaultAfterHook();
    registerDefaultBeforeEachHook();
    registerCustomAfterEachHook([{action: () => parent.restoreArrayDefaultValues()}])();
}