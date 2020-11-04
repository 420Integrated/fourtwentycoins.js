import { concat } from "@420integrated/bytes";
import { keccak256 } from "@420integrated/keccak256";
import { toUtf8Bytes } from "@420integrated/strings";
export const messagePrefix = "\x19420coin Signed Message:\n";
export function hashMessage(message) {
    if (typeof (message) === "string") {
        message = toUtf8Bytes(message);
    }
    return keccak256(concat([
        toUtf8Bytes(messagePrefix),
        toUtf8Bytes(String(message.length)),
        message
    ]));
}
//# sourceMappingURL=message.js.map