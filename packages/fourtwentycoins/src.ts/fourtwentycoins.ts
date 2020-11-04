"use strict";

import { Contract, ContractFactory } from "@420integrated/contracts";

import { BigNumber, FixedNumber } from "@420integrated/bignumber";

import { Signer, VoidSigner } from "@420integrated/abstract-signer";
import { Wallet } from "@420integrated/wallet";

import * as constants from "@420integrated/constants";

import * as providers from "@420integrated/providers";
import { getDefaultProvider } from "@420integrated/providers";

import { Wordlist, wordlists} from "@420integrated/wordlists";

import * as utils from "./utils";

import { ErrorCode as errors, Logger } from "@420integrated/logger";

////////////////////////
// Types

import { BigNumberish } from "@420integrated/bignumber";
import { Bytes, BytesLike, Signature } from "@420integrated/bytes";
import { Transaction, UnsignedTransaction } from "@420integrated/transactions";


////////////////////////
// Compile-Time Constants

// This is generated by "npm run dist"
import { version } from "./_version";

const logger = new Logger(version);

////////////////////////
// Types

import {
    ContractFunction,
    ContractReceipt,
    ContractTransaction,

    Event,
    EventFilter,

    Overrides,
    PayableOverrides,
    CallOverrides,

    PopulatedTransaction,

    ContractInterface
} from "@420integrated/contracts";


////////////////////////
// Exports

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
};

