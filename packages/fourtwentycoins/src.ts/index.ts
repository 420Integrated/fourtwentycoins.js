"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as fourtwentycoins from "./fourtwentycoins ";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._fourtwentycoins == null) {
        anyGlobal._fourtwentycoins = fourtwentycoins ;
    }
} catch (error) { }

export { fourtwentycoins };

export {
    Signer,

    Wallet,
    VoidSigner,

    getDefaultProvider,
    providers,

    Contract,
    ContractFactory,

    BigNumber,
    FixedNumber,

    constants,
    errors,

    logger,

    utils,

    wordlists,


    ////////////////////////
    // Compile-Time Constants

    version,


    ////////////////////////
    // Types

    ContractFunction,
    ContractReceipt,
    ContractTransaction,
    Event,
    EventFilter,

    Overrides,
    PayableOverrides,
    CallOverrides,

    PopulatedTransaction,

    ContractInterface,

    BigNumberish,

    Bytes,
    BytesLike,

    Signature,

    Transaction,
    UnsignedTransaction,

    Wordlist
} from "./fourtwentycoins ";
