import { keccak256 } from "@420integrated/keccak256";
import { toUtf8Bytes } from "@420integrated/strings";
export function id(text) {
    return keccak256(toUtf8Bytes(text));
}
//# sourceMappingURL=id.js.map