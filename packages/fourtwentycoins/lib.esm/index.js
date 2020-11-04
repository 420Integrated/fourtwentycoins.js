"use strict";
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
import * as fourtwentycoins from "./fourtwentycoins ";
try {
    const anyGlobal = window;
    if (anyGlobal._fourtwentycoins == null) {
        anyGlobal._fourtwentycoins = fourtwentycoins ;
    }
}
catch (error) { }
export { fourtwentycoins };
export { Signer, Wallet, VoidSigner, getDefaultProvider, providers, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, 
////////////////////////
// Compile-Time Constants
version, Wordlist } from "./fourtwentycoins ";
//# sourceMappingURL=index.js.map