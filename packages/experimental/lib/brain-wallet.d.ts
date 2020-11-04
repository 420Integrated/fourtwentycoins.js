import { fourtwentycoins } from "fourtwentycoins";
export declare class BrainWallet extends fourtwentycoins.Wallet {
    static _generate(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, legacy: boolean, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet>;
    static generate(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet>;
    static generateLegacy(username: fourtwentycoins.Bytes | string, password: fourtwentycoins.Bytes | string, progressCallback?: fourtwentycoins.utils.ProgressCallback): Promise<BrainWallet>;
}
