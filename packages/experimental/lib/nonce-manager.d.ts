import { fourtwentycoins } from "fourtwentycoins";
export declare class NonceManager extends fourtwentycoins.Signer {
    readonly signer: fourtwentycoins.Signer;
    _initialPromise: Promise<number>;
    _deltaCount: number;
    constructor(signer: fourtwentycoins.Signer);
    get provider(): fourtwentycoins.providers.Provider;
    connect(provider: fourtwentycoins.providers.Provider): NonceManager;
    getAddress(): Promise<string>;
    getTransactionCount(blockTag?: fourtwentycoins.providers.BlockTag): Promise<number>;
    setTransactionCount(transactionCount: fourtwentycoins.BigNumberish | Promise<fourtwentycoins.BigNumberish>): void;
    incrementTransactionCount(count?: number): void;
    signMessage(message: fourtwentycoins.Bytes | string): Promise<string>;
    signTransaction(transaction: fourtwentycoins.utils.Deferrable<fourtwentycoins.providers.TransactionRequest>): Promise<string>;
    sendTransaction(transaction: fourtwentycoins.utils.Deferrable<fourtwentycoins.providers.TransactionRequest>): Promise<fourtwentycoins.providers.TransactionResponse>;
}
