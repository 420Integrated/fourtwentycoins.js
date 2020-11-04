"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fourtwentycoins_1 = require("fourtwentycoins");
function randomBytes(seed, lower, upper) {
    if (!upper) {
        upper = lower;
    }
    if (upper === 0 && upper === lower) {
        return new Uint8Array(0);
    }
    var result = fourtwentycoins_1.fourtwentycoins.utils.arrayify(fourtwentycoins_1.fourtwentycoins.utils.keccak256(fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(seed)));
    while (result.length < upper) {
        result = fourtwentycoins_1.fourtwentycoins.utils.concat([result, fourtwentycoins_1.fourtwentycoins.utils.keccak256(result)]);
    }
    var top = fourtwentycoins_1.fourtwentycoins.utils.arrayify(fourtwentycoins_1.fourtwentycoins.utils.keccak256(result));
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return result.slice(0, lower + Math.floor((upper - lower) * percent));
}
exports.randomBytes = randomBytes;
function randomHexString(seed, lower, upper) {
    return fourtwentycoins_1.fourtwentycoins.utils.hexlify(randomBytes(seed, lower, upper));
}
exports.randomHexString = randomHexString;
function randomNumber(seed, lower, upper) {
    var top = randomBytes(seed, 3);
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return lower + Math.floor((upper - lower) * percent);
}
exports.randomNumber = randomNumber;
//# sourceMappingURL=random.js.map