"use strict";

import { fourtwentycoins } from "fourtwentycoins";

import { version } from "./_version";
const logger = new fourtwentycoins.utils.Logger(version);

import Fourtwenty from "@420integrated/hw-app-fourtwenty";

// We store these in a separated import so it is easier to swap them out
// at bundle time; browsers do not get HID, for example. This maps a string
// "type" to a Transport with create.
import { transports } from "./ledger-transport";

const defaultPath = "m/44'/60'/0'/0/0";

function waiter(duration: number): Promise<void> {
   return new Promise((resolve) => {
       setTimeout(resolve, duration);
   });
}

export class LedgerSigner extends fourtwentycoins.Signer {
    readonly type: string;
    readonly path: string

    readonly _fourtwenty: Promise<Fourtwenty>;

    constructor(provider?: fourtwentycoins.providers.Provider, type?: string, path?: string) {
        super();
        if (path == null) { path = defaultPath; }
        if (type == null) { type = "default"; }

        fourtwentycoins.utils.defineReadOnly(this, "path", path);
        fourtwentycoins.utils.defineReadOnly(this, "type", type);
        fourtwentycoins.utils.defineReadOnly(this, "provider", provider || null);

        const transport = transports[type];
        if (!transport) { logger.throwArgumentError("unknown or unsupported type", "type", type); }

        fourtwentycoins.utils.defineReadOnly(this, "_fourtwenty", transport.create().then((transport) => {
            const fourtwenty = new Fourtwenty(transport);
            return fourtwenty.getAppConfiguration().then((config) => {
                return fourtwenty;
            }, (error) => {
                return Promise.reject(error);
            });
        }, (error) => {
            return Promise.reject(error);
        }));
    }

    _retry<T = any>(callback: (fourtwenty: Fourtwenty) => Promise<T>, timeout?: number): Promise<T> {
        return new Promise(async (resolve, reject) => {
            if (timeout && timeout > 0) {
                setTimeout(() => { reject(new Error("timeout")); }, timeout);
            }

            const fourtwenty = await this._fourtwenty;

            // Wait up to 5 seconds
            for (let i = 0; i < 50; i++) {
                try {
                    const result = await callback(fourtwenty);
                    return resolve(result);
                } catch (error) {
                    if (error.id !== "TransportLocked") {
                        return reject(error);
                    }
                }
                await waiter(100);
            }

            return reject(new Error("timeout"));
        });
    }

    async getAddress(): Promise<string> {
        const account = await this._retry((fourtwenty) => fourtwenty.getAddress(this.path));
        return fourtwentycoins.utils.getAddress(account.address);
    }

    async signMessage(message: fourtwentycoins.utils.Bytes | string): Promise<string> {
        if (typeof(message) === 'string') {
            message = fourtwentycoins.utils.toUtf8Bytes(message);
        }

        const messageHex = fourtwentycoins.utils.hexlify(message).substring(2);

        const sig = await this._retry((fourtwenty) => fourtwenty.signPersonalMessage(this.path, messageHex));
        sig.r = '0x' + sig.r;
        sig.s = '0x' + sig.s;
        return fourtwentycoins.utils.joinSignature(sig);
    }

    async signTransaction(transaction: fourtwentycoins.providers.TransactionRequest): Promise<string> {
        const tx = await fourtwentycoins.utils.resolveProperties(transaction);
        const baseTx: fourtwentycoins.utils.UnsignedTransaction = {
            chainId: (tx.chainId || undefined),
            data: (tx.data || undefined),
            smokeLimit: (tx.smokeLimit || undefined),
            smokePrice: (tx.smokePrice || undefined),
            nonce: (tx.nonce ? fourtwentycoins.BigNumber.from(tx.nonce).toNumber(): undefined),
            to: (tx.to || undefined),
            value: (tx.value || undefined),
        };

        const unsignedTx = fourtwentycoins.utils.serializeTransaction(baseTx).substring(2);
        const sig = await this._retry((fourtwenty) => fourtwenty.signTransaction(this.path, unsignedTx));

        return fourtwentycoins.utils.serializeTransaction(baseTx, {
            v: fourtwentycoins.BigNumber.from("0x" + sig.v).toNumber(),
            r: ("0x" + sig.r),
            s: ("0x" + sig.s),
        });
    }

    connect(provider: fourtwentycoins.providers.Provider): fourtwentycoins.Signer {
        return new LedgerSigner(provider, this.type, this.path);
    }
}
