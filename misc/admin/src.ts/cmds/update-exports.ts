"use strict";

import fs from "fs";

import { colorify } from "../log";
import { resolve } from "../path";

const sourceFourtwentycoins = fs.readFileSync(resolve("packages/fourtwentycoins/src.ts/fourtwentycoins.ts")).toString();
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
    ${ targets }
} from "./fourtwentycoins ";
`;

////////////////////
// End template
////////////////////

console.log(colorify.bold(`Flattening exports...`))

fs.writeFileSync(resolve("packages/fourtwentycoins/src.ts/index.ts"), output);
