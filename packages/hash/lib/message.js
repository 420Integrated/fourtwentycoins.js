"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bytes_1 = require("@420integrated/bytes");
var keccak256_1 = require("@420integrated/keccak256");
var strings_1 = require("@420integrated/strings");
exports.messagePrefix = "\x19420coin Signed Message:\n";
function hashMessage(message) {
    if (typeof (message) === "string") {
        message = strings_1.toUtf8Bytes(message);
    }
    return keccak256_1.keccak256(bytes_1.concat([
        strings_1.toUtf8Bytes(exports.messagePrefix),
        strings_1.toUtf8Bytes(String(message.length)),
        message
    ]));
}
exports.hashMessage = hashMessage;
//# sourceMappingURL=message.js.map