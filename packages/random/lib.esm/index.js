"use strict";
import { randomBytes as _randomBytes } from "crypto";
import { arrayify } from "@420integrated/bytes";
export { shuffled } from "./shuffle";
export function randomBytes(length) {
    return arrayify(_randomBytes(length));
}
//# sourceMappingURL=index.js.map