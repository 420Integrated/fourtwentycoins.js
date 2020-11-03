"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = require("../log");
const path_1 = require("../path");
const sourceFourtwentycoins = fs_1.default.readFileSync(path_1.resolve("packages/fourtwentycoins/src.ts/fourtwentycoins.ts")).toString();
const targets = sourceFourtwentycoins.match(/export\s*{\s*((.|\s)*)}/)[1].trim();
////////////////////
// Begin template
////////////////////
const output = `"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as fourtwentycoins from "./fourtwentycoins ";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._fourtwentycoins == null) {
        anyGlobal._fourtwentycoins = fourtwentycoins ;
    }
} catch (error) { }

export { fourtwentycoins };

export {
    ${targets}
} from "./fourtwentycoins ";
`;
////////////////////
// End template
////////////////////
console.log(log_1.colorify.bold(`Flattening exports...`));
fs_1.default.writeFileSync(path_1.resolve("packages/fourtwentycoins/src.ts/index.ts"), output);
