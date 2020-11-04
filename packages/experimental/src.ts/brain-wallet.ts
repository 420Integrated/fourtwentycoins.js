"use strict";

import { fourtwentycoins } from "fourtwentycoins";

import { scrypt } from "scrypt-js";

import { version } from "./_version";

const logger = new fourtwentycoins.utils.Logger(version);

let warned = false;

export class BrainWallet extends fourtwentycoins.Wallet {

    static _generate(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, legacy: boolean, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet> {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        let usernameBytes: Uint8Array = null;
        let passwordBytes: Uint8Array = null;

        if (typeof(username) === 'string') {
            logger.checkNormalize();
            usernameBytes = fourtwentycoins.utils.toUtf8Bytes(username.normalize('NFKC'));
        } else {
            usernameBytes = fourtwentycoins.utils.arrayify(username);
        }

        if (typeof(password) === 'string') {
            logger.checkNormalize();
            passwordBytes = fourtwentycoins.utils.toUtf8Bytes(password.normalize('NFKC'));
        } else {
            passwordBytes = fourtwentycoins.utils.arrayify(password);
        }

        return scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then((key: Uint8Array) => {
            if (legacy) {
                return new BrainWallet(key);

            }
            const mnemonic = fourtwentycoins.utils.entropyToMnemonic(fourtwentycoins.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(fourtwentycoins.Wallet.fromMnemonic(mnemonic));
        });
    }

    static generate(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, false, progressCallback);
    }

    static generateLegacy(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, true, progressCallback);
    }
}

/*
// Test Legacy correctly matches our old test-vector:
// See: https://github.com/420integrated/fourtwentycoins.js/blob/3bf39b3bee0834566243211783ed8ec052c2f950/tests/test-wallet.js#L13
BrainWallet.generateLegacy("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});


BrainWallet.generate("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});
*/
