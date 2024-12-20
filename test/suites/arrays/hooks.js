'use strict';

import * as parent from "../../../src/arrays.js";
import {
    registerCustomAfterEachHook,
    registerCustomBeforeEachHook,
    registerCustomBeforeHook
} from "../../utils/hook-utils.js";
import {registerDefaultAfterHook} from "../../hook-defaults.js";

export function processHooks() {
    const restoreHookDefaultsHook = {
        action: () => parent.restoreArrayDefaultValues(),
        overrideMessage: 'Restore array default values'
    };

    const printDataHook = {
        concatMessage: `WITH DATA = [${parent.array}]`
    };

    registerDefaultAfterHook();
    registerCustomBeforeEachHook([{concatMessage: `this.test.title`}])();
    registerCustomBeforeHook('Array Manipulation Functions', [restoreHookDefaultsHook, printDataHook])();
    registerCustomAfterEachHook([{
        action: () => parent.restoreArrayDefaultValues(),
        concatMessage: `this.test.title`
    }])();
}