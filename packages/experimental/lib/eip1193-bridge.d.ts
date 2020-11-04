/// <reference types="node" />
import EventEmitter from "events";
import { fourtwentycoins } from "fourtwentycoins";
export declare class _Eip1193Bridge extends EventEmitter {
    readonly signer: fourtwentycoins.Signer;
    readonly provider: fourtwentycoins.providers.Provider;
    constructor(signer: fourtwentycoins.Signer, provider?: fourtwentycoins.providers.Provider);
    send(method: string, params?: Array<any>): Promise<any>;
}
