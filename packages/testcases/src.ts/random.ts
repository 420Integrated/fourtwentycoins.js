"use strict";

import { fourtwentycoins } from "fourtwentycoins";

export function randomBytes(seed: string, lower: number, upper?: number): Uint8Array {
    if (!upper) { upper = lower; }

    if (upper === 0 && upper === lower) { return new Uint8Array(0); }

    let result = fourtwentycoins.utils.arrayify(fourtwentycoins.utils.keccak256(fourtwentycoins.utils.toUtf8Bytes(seed)));
    while (result.length < upper) {
        result = fourtwentycoins.utils.concat([result, fourtwentycoins.utils.keccak256(result)]);
    }

    let top = fourtwentycoins.utils.arrayify(fourtwentycoins.utils.keccak256(result));
    let percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;

    return result.slice(0, lower + Math.floor((upper - lower) * percent));
}

export function randomHexString(seed: string, lower: number, upper?: number): string {
    return fourtwentycoins.utils.hexlify(randomBytes(seed, lower, upper));
}

export function randomNumber(seed: string, lower: number, upper: number): number {
    let top = randomBytes(seed, 3);
    let percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return lower + Math.floor((upper - lower) * percent);
}
