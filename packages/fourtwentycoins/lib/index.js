"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
var fourtwentycoins = __importStar(require("./fourtwentycoins "));
exports.fourtwentycoins = fourtwentycoins ;
try {
    var anyGlobal = window;
    if (anyGlobal._fourtwentycoins == null) {
        anyGlobal._fourtwentycoins = fourtwentycoins ;
    }
}
catch (error) { }
var fourtwentycoins_1 = require("./fourtwentycoins ");
exports.Signer = fourtwentycoins_1.Signer;
exports.Wallet = fourtwentycoins_1.Wallet;
exports.VoidSigner = fourtwentycoins_1.VoidSigner;
exports.getDefaultProvider = fourtwentycoins_1.getDefaultProvider;
exports.providers = fourtwentycoins_1.providers;
exports.Contract = fourtwentycoins_1.Contract;
exports.ContractFactory = fourtwentycoins_1.ContractFactory;
exports.BigNumber = fourtwentycoins_1.BigNumber;
exports.FixedNumber = fourtwentycoins_1.FixedNumber;
exports.constants = fourtwentycoins_1.constants;
exports.errors = fourtwentycoins_1.errors;
exports.logger = fourtwentycoins_1.logger;
exports.utils = fourtwentycoins_1.utils;
exports.wordlists = fourtwentycoins_1.wordlists;
////////////////////////
// Compile-Time Constants
exports.version = fourtwentycoins_1.version;
exports.Wordlist = fourtwentycoins_1.Wordlist;
//# sourceMappingURL=index.js.map