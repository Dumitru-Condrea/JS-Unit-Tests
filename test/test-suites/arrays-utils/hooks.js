'use strict';

import * as parent from "../../../src/arrays.js";
import {registerCustomBeforeEachHook} from "../../utils/hook-utils.js";
import {
    registerDefaultAfterEachHook,
    registerDefaultAfterHook,
    registerDefaultBeforeHook
} from "../../hook-defaults.js";

export function processHooks() {
    registerDefaultAfterHook();
    registerDefaultAfterEachHook();
    registerDefaultBeforeHook('Array Utils Functions');
    registerCustomBeforeEachHook([{action: () => parent.restoreArrayDefaultValues()}])();
}