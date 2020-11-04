"use strict"

import { fourtwentycoins } from "fourtwentycoins";

import { version } from "./_version";

const logger = new fourtwentycoins.utils.Logger(version);

// @TODO: Keep a per-NonceManager pool of sent but unmined transactions for
//        rebroadcasting, in case we overrun the transaction pool

export class NonceManager extends fourtwentycoins.Signer {
    readonly signer: fourtwentycoins.Signer;

    _initialPromise: Promise<number>;
    _deltaCount: number;

    constructor(signer: fourtwentycoins.Signer) {
        logger.checkNew(new.target, NonceManager);
        super();
        this._deltaCount = 0;
        fourtwentycoins.utils.defineReadOnly(this, "signer", signer);
    }

    get provider(): fourtwentycoins.providers.Provider {
        return this.signer.provider;
    }

    connect(provider: fourtwentycoins.providers.Provider): NonceManager {
        return new NonceManager(this.signer.connect(provider));
    }

    getAddress(): Promise<string> {
        return this.signer.getAddress();
    }

    getTransactionCount(blockTag?: fourtwentycoins.providers.BlockTag): Promise<number> {
        if (blockTag === "pending") {
            if (!this._initialPromise) {
                this._initialPromise = this.signer.getTransactionCount("pending");
            }
            const deltaCount = this._deltaCount;
            return this._initialPromise.then((initial) => (initial + deltaCount));
        }

        return this.signer.getTransactionCount(blockTag);
    }

    setTransactionCount(transactionCount: fourtwentycoins.BigNumberish | Promise<fourtwentycoins.BigNumberish>): void {
        this._initialPromise = Promise.resolve(transactionCount).then((nonce) => {
            return fourtwentycoins.BigNumber.from(nonce).toNumber();
        });
        this._deltaCount = 0;
    }

    incrementTransactionCount(count?: number): void {
        this._deltaCount += (count ? count: 1);
    }

    signMessage(message: fourtwentycoins.Bytes | string): Promise<string> {
        return this.signer.signMessage(message);;
    }

    signTransaction(transaction: fourtwentycoins.utils.Deferrable<fourtwentycoins.providers.TransactionRequest>): Promise<string> {
        return this.signer.signTransaction(transaction);
    }

    sendTransaction(transaction: fourtwentycoins.utils.Deferrable<fourtwentycoins.providers.TransactionRequest>): Promise<fourtwentycoins.providers.TransactionResponse> {
        if (transaction.nonce == null) {
            transaction = fourtwentycoins.utils.shallowCopy(transaction);
            transaction.nonce = this.getTransactionCount("pending");
            this.incrementTransactionCount();
        } else {
            this.setTransactionCount(transaction.nonce);
        }

        return this.signer.sendTransaction(transaction).then((tx) => {
            return tx;
        });
    }
}
