import { fourtwentycoins } from "fourtwentycoins";
import Fourtwenty from "@420integrated/hw-app-fourtwenty";
export declare class LedgerSigner extends fourtwentycoins.Signer {
    readonly type: string;
    readonly path: string;
    readonly _fourtwenty: Promise<Fourtwenty>;
    constructor(provider?: fourtwentycoins.providers.Provider, type?: string, path?: string);
    _retry<T = any>(callback: (fourtwenty: Fourtwenty) => Promise<T>, timeout?: number): Promise<T>;
    getAddress(): Promise<string>;
    signMessage(message: fourtwentycoins.utils.Bytes | string): Promise<string>;
    signTransaction(transaction: fourtwentycoins.providers.TransactionRequest): Promise<string>;
    connect(provider: fourtwentycoins.providers.Provider): fourtwentycoins.Signer;
}
