/* istanbul ignore file */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var fourtwentycoins_1 = require("fourtwentycoins");
var scrypt = __importStar(require("scrypt-js"));
var prompt_1 = require("./prompt");
var _version_1 = require("./_version");
var logger = new fourtwentycoins_1.fourtwentycoins.utils.Logger(_version_1.version);
var UsageError = /** @class */ (function (_super) {
    __extends(UsageError, _super);
    function UsageError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UsageError;
}(Error));
/////////////////////////////
// Signer
/*
const signerStates = new WeakMap();

class SignerState {
    signerFunc: () => Promise<fourtwentycoins.Signer>;
    signer: fourtwentycoins.Signer;
    alwaysAllow: boolean;

    static get(wrapper: WrappedSigner): SignerState {
        return signerStates.get(wrapper);
    }
}
*/
var signerFuncs = new WeakMap();
var signers = new WeakMap();
var alwaysAllow = new WeakMap();
// Gets a signer or lazily request it if needed, possibly asking for a password
// to decrypt a JSON wallet
function getSigner(wrapper) {
    return __awaiter(this, void 0, void 0, function () {
        var signerFunc, signer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!signers.has(wrapper)) return [3 /*break*/, 2];
                    signerFunc = signerFuncs.get(wrapper);
                    return [4 /*yield*/, signerFunc()];
                case 1:
                    signer = _a.sent();
                    signers.set(wrapper, signer);
                    _a.label = 2;
                case 2: return [2 /*return*/, signers.get(wrapper)];
            }
        });
    });
}
// Throws an error if the user does not allow the operation. If "y" is
// selected, all future operations of that type are automatically accepted
function isAllowed(wrapper, message) {
    return __awaiter(this, void 0, void 0, function () {
        var allowed, allow, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (wrapper.plugin.yes) {
                        console.log(message + " (--yes => \"y\")");
                        return [2 /*return*/, true];
                    }
                    allowed = alwaysAllow.get(wrapper) || {};
                    if (allowed[message]) {
                        console.log(message + " (previous (a)ll => \"y\")");
                        return [2 /*return*/, true];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prompt_1.getChoice(message, "yna", "n")];
                case 2:
                    allow = _a.sent();
                    if (allow === "a") {
                        allowed[message] = true;
                        alwaysAllow.set(wrapper, allowed);
                    }
                    else if (allow === "n") {
                        throw new Error("Cancelled.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw new Error("Cancelled.");
                case 4: return [2 /*return*/, true];
            }
        });
    });
}
function repeat(chr, length) {
    var result = chr;
    while (result.length < length) {
        result += result;
    }
    return result.substring(0, length);
}
// @TODO: Make dump recursable for objects
// Dumps key/value pairs in a nice format
function dump(header, info) {
    console.log(header);
    var maxLength = Object.keys(info).reduce(function (maxLength, i) { return Math.max(maxLength, i.length); }, 0);
    for (var key in info) {
        var value = info[key];
        if (Array.isArray(value)) {
            console.log("  " + key + ":");
            value.forEach(function (value) {
                console.log("    " + value);
            });
        }
        else {
            console.log("  " + key + ":" + repeat(" ", maxLength - key.length) + "  " + info[key]);
        }
    }
}
exports.dump = dump;
// This wraps our signers to prevent the private keys and mnemonics from being exposed.
// It is also in charge of user-interaction, requesting permission before signing or
// sending.
var WrappedSigner = /** @class */ (function (_super) {
    __extends(WrappedSigner, _super);
    function WrappedSigner(addressPromise, signerFunc, plugin) {
        var _this = _super.call(this) || this;
        signerFuncs.set(_this, signerFunc);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "addressPromise", addressPromise);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "provider", plugin.provider);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "plugin", plugin);
        return _this;
    }
    WrappedSigner.prototype.connect = function (provider) {
        throw new Error("unsupported for now...");
        //return new WrappedSigner(this.addressPromise, () => getSigner(this).then((s) => s.connect(provider)), provider);
    };
    WrappedSigner.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.addressPromise];
            });
        });
    };
    WrappedSigner.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, info, bytes, i, c, result, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSigner(this)];
                    case 1:
                        signer = _a.sent();
                        info = {};
                        if (typeof (message) === "string") {
                            info["Message"] = JSON.stringify(message);
                            info["Message (hex)"] = fourtwentycoins_1.fourtwentycoins.utils.hexlify(fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(message));
                        }
                        else {
                            bytes = fourtwentycoins_1.fourtwentycoins.utils.arrayify(message);
                            for (i = 0; i < bytes.length; i++) {
                                c = bytes[i];
                                if (c < 32 || c > 126) {
                                    bytes = null;
                                    break;
                                }
                            }
                            if (bytes) {
                                info["Message"] = fourtwentycoins_1.fourtwentycoins.utils.toUtf8String(bytes);
                            }
                            info["Message (hex)"] = fourtwentycoins_1.fourtwentycoins.utils.hexlify(message);
                        }
                        dump("Message:", info);
                        return [4 /*yield*/, isAllowed(this, "Sign Message?")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, signer.signMessage(message)];
                    case 3:
                        result = _a.sent();
                        signature = fourtwentycoins_1.fourtwentycoins.utils.splitSignature(result);
                        dump("Signature", {
                            Flat: result,
                            r: signature.r,
                            s: signature.s,
                            vs: signature._vs,
                            v: signature.v,
                            recid: signature.recoveryParam,
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WrappedSigner.prototype.populateTransaction = function (transactionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var signer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionRequest = fourtwentycoins_1.fourtwentycoins.utils.shallowCopy(transactionRequest);
                        if (this.plugin.smokePrice != null) {
                            transactionRequest.smokePrice = this.plugin.smokePrice;
                        }
                        if (this.plugin.smokeLimit != null) {
                            transactionRequest.smokeLimit = this.plugin.smokeLimit;
                        }
                        if (this.plugin.nonce != null) {
                            transactionRequest.nonce = this.plugin.nonce;
                        }
                        return [4 /*yield*/, getSigner(this)];
                    case 1:
                        signer = _a.sent();
                        return [2 /*return*/, signer.populateTransaction(transactionRequest)];
                }
            });
        });
    };
    WrappedSigner.prototype.signTransaction = function (transactionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, network, tx, info, result, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSigner(this)];
                    case 1:
                        signer = _a.sent();
                        return [4 /*yield*/, this.provider.getNetwork()];
                    case 2:
                        network = _a.sent();
                        return [4 /*yield*/, fourtwentycoins_1.fourtwentycoins.utils.resolveProperties(transactionRequest)];
                    case 3:
                        tx = _a.sent();
                        info = {};
                        if (tx.to != null) {
                            info["To"] = tx.to;
                        }
                        if (tx.from != null) {
                            info["From"] = tx.from;
                        }
                        info["Value"] = (fourtwentycoins_1.fourtwentycoins.utils.formatFourtwentycoin(tx.value || 0) + " fourtwentycoin");
                        if (tx.nonce != null) {
                            info["Nonce"] = tx.nonce;
                        }
                        info["Data"] = tx.data;
                        info["Smoke Limit"] = fourtwentycoins_1.fourtwentycoins.BigNumber.from(tx.smokeLimit || 0).toString();
                        info["Smoke Price"] = (fourtwentycoins_1.fourtwentycoins.utils.formatUnits(tx.smokePrice || 0, "gmarley") + " gmarley"),
                            info["Chain ID"] = (tx.chainId || 0);
                        info["Network"] = network.name;
                        dump("Transaction:", info);
                        return [4 /*yield*/, isAllowed(this, "Sign Transaction?")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, signer.signTransaction(transactionRequest)];
                    case 5:
                        result = _a.sent();
                        signature = fourtwentycoins_1.fourtwentycoins.utils.splitSignature(result);
                        dump("Signature:", {
                            Signature: result,
                            r: signature.r,
                            s: signature.s,
                            vs: signature._vs,
                            v: signature.v,
                            recid: signature.recoveryParam,
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    WrappedSigner.prototype.sendTransaction = function (transactionRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, network, tx, info, response, receipt, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSigner(this)];
                    case 1:
                        signer = _a.sent();
                        return [4 /*yield*/, this.provider.getNetwork()];
                    case 2:
                        network = _a.sent();
                        return [4 /*yield*/, this.populateTransaction(transactionRequest)];
                    case 3:
                        tx = _a.sent();
                        return [4 /*yield*/, fourtwentycoins_1.fourtwentycoins.utils.resolveProperties(tx)];
                    case 4:
                        tx = _a.sent();
                        info = {};
                        if (tx.to != null) {
                            info["To"] = tx.to;
                        }
                        if (tx.from != null) {
                            info["From"] = tx.from;
                        }
                        info["Value"] = (fourtwentycoins_1.fourtwentycoins.utils.formatFourtwentycoin(tx.value || 0) + " fourtwentycoin");
                        if (tx.nonce != null) {
                            info["Nonce"] = tx.nonce;
                        }
                        info["Data"] = tx.data;
                        info["Smoke Limit"] = fourtwentycoins_1.fourtwentycoins.BigNumber.from(tx.smokeLimit || 0).toString();
                        info["Smoke Price"] = (fourtwentycoins_1.fourtwentycoins.utils.formatUnits(tx.smokePrice || 0, "gmarley") + " gmarley"),
                            info["Chain ID"] = (tx.chainId || 0);
                        info["Network"] = network.name;
                        dump("Transaction:", info);
                        return [4 /*yield*/, isAllowed(this, "Send Transaction?")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, signer.sendTransaction(tx)];
                    case 6:
                        response = _a.sent();
                        dump("Response:", {
                            "Hash": response.hash
                        });
                        if (!this.plugin.wait) return [3 /*break*/, 10];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, response.wait()];
                    case 8:
                        receipt = _a.sent();
                        dump("Success:", {
                            "Block Number": receipt.blockNumber,
                            "Block Hash": receipt.blockHash,
                            "Smoke Used": fourtwentycoins_1.fourtwentycoins.utils.commify(receipt.smokeUsed.toString()),
                            "Fee": (fourtwentycoins_1.fourtwentycoins.utils.formatFourtwentycoin(receipt.smokeUsed.mul(tx.smokePrice)) + " fourtwentycoin")
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        dump("Failed:", {
                            "Error": error_2.message
                        });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, response];
                }
            });
        });
    };
    WrappedSigner.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSigner(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WrappedSigner;
}(fourtwentycoins_1.fourtwentycoins.Signer));
var OfflineProvider = /** @class */ (function (_super) {
    __extends(OfflineProvider, _super);
    function OfflineProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfflineProvider.prototype.perform = function (method, params) {
        if (method === "sendTransaction") {
            console.log("Signed Transaction:");
            console.log(params.signedTransaction);
            return Promise.resolve(fourtwentycoins_1.fourtwentycoins.utils.keccak256(params.signedTransaction));
        }
        return _super.prototype.perform.call(this, method, params);
    };
    return OfflineProvider;
}(fourtwentycoins_1.fourtwentycoins.providers.BaseProvider));
/////////////////////////////
// Argument Parser
var ArgParser = /** @class */ (function () {
    function ArgParser(args) {
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "_args", args);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "_consumed", args.map(function (a) { return false; }));
    }
    ArgParser.prototype._finalizeArgs = function () {
        var args = [];
        for (var i = 0; i < this._args.length; i++) {
            if (this._consumed[i]) {
                continue;
            }
            var arg = this._args[i];
            // Escaped args, add the rest as args
            if (arg === "--") {
                for (var j = i + 1; j < this._args.length; j++) {
                    args.push(this._args[j]);
                }
                break;
            }
            if (arg.substring(0, 2) === "--") {
                throw new UsageError("unexpected option " + arg);
            }
            args.push(arg);
        }
        return args;
    };
    ArgParser.prototype._checkCommandIndex = function () {
        for (var i = 0; i < this._args.length; i++) {
            if (this._consumed[i]) {
                continue;
            }
            return i;
        }
        return -1;
    };
    ArgParser.prototype.consumeFlag = function (name) {
        var count = 0;
        for (var i = 0; i < this._args.length; i++) {
            var arg = this._args[i];
            if (arg === "--") {
                break;
            }
            if (arg === ("--" + name)) {
                count++;
                this._consumed[i] = true;
            }
        }
        if (count > 1) {
            throw new UsageError("expected at most one --${name}");
        }
        return (count === 1);
    };
    ArgParser.prototype.consumeMultiOptions = function (names) {
        var result = [];
        if (typeof (names) === "string") {
            names = [names];
        }
        for (var i = 0; i < this._args.length; i++) {
            var arg = this._args[i];
            if (arg === "--") {
                break;
            }
            if (arg.substring(0, 2) === "--") {
                var name_1 = arg.substring(2);
                var index = names.indexOf(name_1);
                if (index < 0) {
                    continue;
                }
                if (this._args.length === i) {
                    throw new UsageError("missing argument for --${name}");
                }
                this._consumed[i] = true;
                result.push({ name: name_1, value: this._args[++i] });
                this._consumed[i] = true;
            }
        }
        return result;
    };
    ArgParser.prototype.consumeOptions = function (name) {
        return this.consumeMultiOptions([name]).map(function (o) { return o.value; });
    };
    ArgParser.prototype.consumeOption = function (name) {
        var options = this.consumeOptions(name);
        if (options.length > 1) {
            throw new UsageError("expected at most one --" + name);
        }
        return (options.length ? options[0] : null);
    };
    return ArgParser;
}());
exports.ArgParser = ArgParser;
// Accepts:
//   - "-" which indicates to read from the terminal using prompt (which can then be any of the below)
//   - JSON Wallet filename (which will require a password to unlock)
//   - raw private key
//   - mnemonic
function loadAccount(arg, plugin, preventFile) {
    return __awaiter(this, void 0, void 0, function () {
        var content, signer_1, mnemonic_1, signerPromise_1, content_1, address;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(arg === "-")) return [3 /*break*/, 2];
                    return [4 /*yield*/, prompt_1.getPassword("Private Key / Mnemonic:")];
                case 1:
                    content = _a.sent();
                    return [2 /*return*/, loadAccount(content, plugin, true)];
                case 2:
                    // Raw private key
                    if (fourtwentycoins_1.fourtwentycoins.utils.isHexString(arg, 32)) {
                        signer_1 = new fourtwentycoins_1.fourtwentycoins.Wallet(arg, plugin.provider);
                        return [2 /*return*/, Promise.resolve(new WrappedSigner(signer_1.getAddress(), function () { return Promise.resolve(signer_1); }, plugin))];
                    }
                    // Mnemonic
                    if (fourtwentycoins_1.fourtwentycoins.utils.isValidMnemonic(arg)) {
                        mnemonic_1 = arg;
                        signerPromise_1 = null;
                        if (plugin.mnemonicPassword) {
                            signerPromise_1 = prompt_1.getPassword("Password (mnemonic): ").then(function (password) {
                                var node = fourtwentycoins_1.fourtwentycoins.utils.HDNode.fromMnemonic(mnemonic_1, password).derivePath(fourtwentycoins_1.fourtwentycoins.utils.defaultPath);
                                return new fourtwentycoins_1.fourtwentycoins.Wallet(node.privateKey, plugin.provider);
                            });
                        }
                        else if (plugin._xxxMnemonicPasswordHard) {
                            signerPromise_1 = prompt_1.getPassword("Password (mnemonic; experimental - hard): ").then(function (password) {
                                var passwordBytes = fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(password, fourtwentycoins_1.fourtwentycoins.utils.UnicodeNormalizationForm.NFKC);
                                var saltBytes = fourtwentycoins_1.fourtwentycoins.utils.arrayify(fourtwentycoins_1.fourtwentycoins.utils.HDNode.fromMnemonic(mnemonic_1).privateKey);
                                var progressBar = prompt_1.getProgressBar("Decrypting");
                                return scrypt.scrypt(passwordBytes, saltBytes, (1 << 20), 8, 1, 32, progressBar).then(function (key) {
                                    var derivedPassword = fourtwentycoins_1.fourtwentycoins.utils.hexlify(key).substring(2);
                                    var node = fourtwentycoins_1.fourtwentycoins.utils.HDNode.fromMnemonic(mnemonic_1, derivedPassword).derivePath(fourtwentycoins_1.fourtwentycoins.utils.defaultPath);
                                    return new fourtwentycoins_1.fourtwentycoins.Wallet(node.privateKey, plugin.provider);
                                });
                            });
                        }
                        else {
                            signerPromise_1 = Promise.resolve(fourtwentycoins_1.fourtwentycoins.Wallet.fromMnemonic(arg).connect(plugin.provider));
                        }
                        return [2 /*return*/, Promise.resolve(new WrappedSigner(signerPromise_1.then(function (wallet) { return wallet.getAddress(); }), function () { return signerPromise_1; }, plugin))];
                    }
                    // Check for a JSON wallet
                    try {
                        content_1 = fs_1.default.readFileSync(arg).toString();
                        address = fourtwentycoins_1.fourtwentycoins.utils.getJsonWalletAddress(content_1);
                        if (address) {
                            return [2 /*return*/, Promise.resolve(new WrappedSigner(Promise.resolve(address), function () { return __awaiter(_this, void 0, void 0, function () {
                                    var password, progressBar;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, prompt_1.getPassword("Password (" + arg + "): ")];
                                            case 1:
                                                password = _a.sent();
                                                progressBar = prompt_1.getProgressBar("Decrypting");
                                                return [2 /*return*/, fourtwentycoins_1.fourtwentycoins.Wallet.fromEncryptedJson(content_1, password, progressBar).then(function (wallet) {
                                                        return wallet.connect(plugin.provider);
                                                    })];
                                        }
                                    });
                                }); }, plugin))];
                        }
                        else {
                            return [2 /*return*/, loadAccount(content_1.trim(), plugin, true)];
                        }
                    }
                    catch (error) {
                        if (error.message === "cancelled") {
                            throw new Error("Cancelled.");
                        }
                        else if (error.message === "wrong password") {
                            throw new Error("Incorrect password.");
                        }
                    }
                    throw new UsageError("unknown account option - [REDACTED]");
            }
        });
    });
}
var Plugin = /** @class */ (function () {
    function Plugin() {
    }
    Plugin.getHelp = function () {
        return null;
    };
    Plugin.getOptionHelp = function () {
        return [];
    };
    Plugin.prototype.prepareOptions = function (argParser, verifyOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var runners, network, providers, rpc, accounts, accountOptions, _loop_1, this_1, i, smokePrice, smokeLimit, nonce, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        runners = [];
                        this.wait = argParser.consumeFlag("wait");
                        this.yes = argParser.consumeFlag("yes");
                        network = (argParser.consumeOption("network") || "homestead");
                        providers = [];
                        rpc = [];
                        argParser.consumeOptions("rpc").forEach(function (url) {
                            var provider = new fourtwentycoins_1.fourtwentycoins.providers.JsonRpcProvider(url);
                            providers.push(provider);
                            rpc.push(provider);
                        });
                        if (argParser.consumeFlag("alchemy")) {
                            providers.push(new fourtwentycoins_1.fourtwentycoins.providers.AlchemyProvider(network));
                        }
                        if (argParser.consumeFlag("fourtwentyvm")) {
                            providers.push(new fourtwentycoins_1.fourtwentycoins.providers.FourtwentyvmProvider(network));
                        }
                        if (argParser.consumeFlag("infura")) {
                            providers.push(new fourtwentycoins_1.fourtwentycoins.providers.InfuraProvider(network));
                        }
                        if (argParser.consumeFlag("nodesmith")) {
                            providers.push(new fourtwentycoins_1.fourtwentycoins.providers.NodesmithProvider(network));
                        }
                        if (argParser.consumeFlag("offline")) {
                            providers.push(new OfflineProvider(network));
                        }
                        if (providers.length === 1) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "provider", providers[0]);
                        }
                        else if (providers.length) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "provider", new fourtwentycoins_1.fourtwentycoins.providers.FallbackProvider(providers));
                        }
                        else {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "provider", fourtwentycoins_1.fourtwentycoins.getDefaultProvider(network));
                        }
                        /////////////////////
                        // Accounts
                        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "mnemonicPassword", argParser.consumeFlag("mnemonic-password"));
                        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "_xxxMnemonicPasswordHard", argParser.consumeFlag("xxx-mnemonic-password"));
                        accounts = [];
                        accountOptions = argParser.consumeMultiOptions(["account", "account-rpc", "account-void"]);
                        _loop_1 = function (i) {
                            var account, _a, wrappedSigner, signer_2, addressPromise, signerPromise_2;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        account = accountOptions[i];
                                        _a = account.name;
                                        switch (_a) {
                                            case "account": return [3 /*break*/, 1];
                                            case "account-rpc": return [3 /*break*/, 3];
                                            case "account-void": return [3 /*break*/, 4];
                                        }
                                        return [3 /*break*/, 5];
                                    case 1:
                                        // Verifying does not need to ask for passwords, etc.
                                        if (verifyOnly) {
                                            return [3 /*break*/, 5];
                                        }
                                        return [4 /*yield*/, loadAccount(account.value, this_1)];
                                    case 2:
                                        wrappedSigner = _b.sent();
                                        accounts.push(wrappedSigner);
                                        return [3 /*break*/, 5];
                                    case 3:
                                        if (rpc.length !== 1) {
                                            this_1.throwUsageError("--account-rpc requires exactly one JSON-RPC provider");
                                        }
                                        try {
                                            signer_2 = null;
                                            if (account.value.match(/^[0-9]+$/)) {
                                                signer_2 = rpc[0].getSigner(parseInt(account.value));
                                            }
                                            else {
                                                signer_2 = rpc[0].getSigner(fourtwentycoins_1.fourtwentycoins.utils.getAddress(account.value));
                                            }
                                            accounts.push(new WrappedSigner(signer_2.getAddress(), function () { return Promise.resolve(signer_2); }, this_1));
                                        }
                                        catch (error) {
                                            this_1.throwUsageError("invalid --account-rpc - " + account.value);
                                        }
                                        return [3 /*break*/, 5];
                                    case 4:
                                        {
                                            addressPromise = this_1.provider.resolveName(account.value);
                                            signerPromise_2 = addressPromise.then(function (addr) {
                                                return new fourtwentycoins_1.fourtwentycoins.VoidSigner(addr, _this.provider);
                                            });
                                            accounts.push(new WrappedSigner(addressPromise, function () { return signerPromise_2; }, this_1));
                                            return [3 /*break*/, 5];
                                        }
                                        _b.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < accountOptions.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "accounts", Object.freeze(accounts));
                        smokePrice = argParser.consumeOption("smoke-price");
                        if (smokePrice) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "smokePrice", fourtwentycoins_1.fourtwentycoins.utils.parseUnits(smokePrice, "gmarley"));
                        }
                        else {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "smokePrice", null);
                        }
                        smokeLimit = argParser.consumeOption("smoke-limit");
                        if (smokeLimit) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "smokeLimit", fourtwentycoins_1.fourtwentycoins.BigNumber.from(smokeLimit));
                        }
                        else {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "smokeLimit", null);
                        }
                        nonce = argParser.consumeOption("nonce");
                        if (nonce) {
                            this.nonce = fourtwentycoins_1.fourtwentycoins.BigNumber.from(nonce).toNumber();
                        }
                        // Now wait for all asynchronous options to load
                        runners.push(this.provider.getNetwork().then(function (network) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "network", Object.freeze(network));
                        }, function (error) {
                            fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "network", Object.freeze({
                                chainId: 0,
                                name: "no-network"
                            }));
                        }));
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, Promise.all(runners)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        this.throwError(error_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Plugin.prototype.prepareArgs = function (args) {
        return Promise.resolve(null);
    };
    Plugin.prototype.run = function () {
        return null;
    };
    Plugin.prototype.getAddress = function (addressOrName, message, allowZero) {
        var _this = this;
        try {
            return Promise.resolve(fourtwentycoins_1.fourtwentycoins.utils.getAddress(addressOrName));
        }
        catch (error) { }
        return this.provider.resolveName(addressOrName).then(function (address) {
            if (address == null) {
                _this.throwError("ENS name not configured - " + addressOrName);
            }
            if (address === fourtwentycoins_1.fourtwentycoins.constants.AddressZero && !allowZero) {
                _this.throwError(message || "cannot use the zero address");
            }
            return address;
        });
    };
    // Dumps formatted data
    Plugin.prototype.dump = function (header, info) {
        dump(header, info);
    };
    // Throwing a UsageError causes the --help to be shown above
    // the error.message
    Plugin.prototype.throwUsageError = function (message) {
        throw new UsageError(message);
    };
    // Shows error.message
    Plugin.prototype.throwError = function (message) {
        throw new Error(message);
    };
    return Plugin;
}());
exports.Plugin = Plugin;
var CheckPlugin = /** @class */ (function (_super) {
    __extends(CheckPlugin, _super);
    function CheckPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckPlugin.prototype.prepareOptions = function (argParser, verifyOnly) {
        return _super.prototype.prepareOptions.call(this, argParser, true);
    };
    return CheckPlugin;
}(Plugin));
var CLI = /** @class */ (function () {
    function CLI(defaultCommand, options) {
        var _this = this;
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "options", {
            account: true,
            provider: true,
            transaction: true,
            version: _version_1.version.split("/").pop(),
        });
        if (options) {
            ["account", "provider", "transaction"].forEach(function (key) {
                if (options[key] == null) {
                    return;
                }
                (_this.options)[key] = !!(options[key]);
            });
            ["version"].forEach(function (key) {
                if (options[key] == null) {
                    return;
                }
                (_this.options)[key] = options[key];
            });
        }
        Object.freeze(this.options);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "defaultCommand", defaultCommand || null);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "plugins", {});
    }
    CLI.getAppName = function () {
        try {
            return path_1.basename(process.mainModule.filename).split(".")[0];
        }
        catch (error) { }
        return "fourtwentycoins";
    };
    // @TODO: Better way to specify default; i.e. may not have args
    CLI.prototype.addPlugin = function (command, plugin) {
        if (this.standAlone) {
            logger.throwError("only setPlugin or addPlugin may be used at once", fourtwentycoins_1.fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                operation: "addPlugin"
            });
        }
        else if (this.plugins[command]) {
            logger.throwError("command already exists", fourtwentycoins_1.fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                operation: "addPlugin",
                command: command
            });
        }
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this.plugins, command, plugin);
    };
    CLI.prototype.setPlugin = function (plugin) {
        if (Object.keys(this.plugins).length !== 0) {
            logger.throwError("only setPlugin or addPlugin may be used at once", fourtwentycoins_1.fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                operation: "setPlugin"
            });
        }
        if (this.standAlone) {
            logger.throwError("cannot setPlugin more than once", fourtwentycoins_1.fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                operation: "setPlugin"
            });
        }
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(this, "standAlone", plugin);
    };
    CLI.prototype.showUsage = function (message, status) {
        // Limit:    |                                                                             |
        console.log("Usage:");
        if (this.standAlone) {
            var help = fourtwentycoins_1.fourtwentycoins.utils.getStatic(this.standAlone, "getHelp")();
            console.log("   " + CLI.getAppName() + " " + help.name + " [ OPTIONS ]");
            console.log("");
            var lines_1 = [];
            var optionHelp = fourtwentycoins_1.fourtwentycoins.utils.getStatic(this.standAlone, "getOptionHelp")();
            optionHelp.forEach(function (help) {
                lines_1.push("  " + help.name + repeat(" ", 28 - help.name.length) + help.help);
            });
            if (lines_1.length) {
                console.log("OPTIONS");
                lines_1.forEach(function (line) {
                    console.log(line);
                });
                console.log("");
            }
        }
        else {
            if (this.defaultCommand) {
                console.log("   " + CLI.getAppName() + " [ COMMAND ] [ ARGS ] [ OPTIONS ]");
                console.log("");
            }
            else {
                console.log("   " + CLI.getAppName() + " COMMAND [ ARGS ] [ OPTIONS ]");
                console.log("");
            }
            var lines_2 = [];
            for (var cmd in this.plugins) {
                var plugin = this.plugins[cmd];
                var help = fourtwentycoins_1.fourtwentycoins.utils.getStatic(plugin, "getHelp")();
                if (help == null) {
                    continue;
                }
                var helpLine = "   " + help.name;
                if (helpLine.length > 28) {
                    lines_2.push(helpLine);
                    lines_2.push(repeat(" ", 30) + help.help);
                }
                else {
                    helpLine += repeat(" ", 30 - helpLine.length);
                    lines_2.push(helpLine + help.help);
                }
                var optionHelp = fourtwentycoins_1.fourtwentycoins.utils.getStatic(plugin, "getOptionHelp")();
                optionHelp.forEach(function (help) {
                    lines_2.push("      " + help.name + repeat(" ", 27 - help.name.length) + help.help);
                });
            }
            if (lines_2.length) {
                if (this.defaultCommand) {
                    console.log("COMMANDS (default: " + this.defaultCommand + ")");
                }
                else {
                    console.log("COMMANDS");
                }
                lines_2.forEach(function (line) {
                    console.log(line);
                });
                console.log("");
            }
        }
        if (this.options.account) {
            console.log("ACCOUNT OPTIONS");
            console.log("  --account FILENAME          Load from a file (JSON, RAW or mnemonic)");
            console.log("  --account RAW_KEY           Use a private key (insecure *)");
            console.log("  --account 'MNEMONIC'        Use a mnemonic (insecure *)");
            console.log("  --account -                 Use secure entry for a raw key or mnemonic");
            console.log("  --account-void ADDRESS      Use an address as a void signer");
            console.log("  --account-void ENS_NAME     Add the resolved address as a void signer");
            console.log("  --account-rpc ADDRESS       Add the address from a JSON-RPC provider");
            console.log("  --account-rpc INDEX         Add the index from a JSON-RPC provider");
            console.log("  --mnemonic-password         Prompt for a password for mnemonics");
            console.log("  --xxx-mnemonic-password     Prompt for a (experimental) hard password");
            console.log("");
        }
        if (this.options.provider) {
            console.log("PROVIDER OPTIONS (default: all + homestead)");
            console.log("  --alchemy                   Include Alchemy");
            console.log("  --fourtwentyvm                 Include Fourtwentyvm");
            console.log("  --infura                    Include INFURA");
            console.log("  --nodesmith                 Include nodesmith");
            console.log("  --rpc URL                   Include a custom JSON-RPC");
            console.log("  --offline                   Dump signed transactions (no send)");
            console.log("  --network NETWORK           Network to connect to (default: homestead)");
            console.log("");
        }
        if (this.options.transaction) {
            console.log("TRANSACTION OPTIONS (default: query network)");
            console.log("  --smokePrice GMARLEY             Default smoke price for transactions(in marley)");
            console.log("  --smokeLimit SMOKE              Default smoke limit for transactions");
            console.log("  --nonce NONCE               Initial nonce for the first transaction");
            console.log("  --yes                       Always accept Signing and Sending");
            console.log("");
        }
        console.log("OTHER OPTIONS");
        if (this.options.transaction) {
            console.log("  --wait                      Wait until transactions are mined");
        }
        console.log("  --debug                     Show stack traces for errors");
        console.log("  --help                      Show this usage and exit");
        console.log("  --version                   Show this version and exit");
        console.log("");
        if (this.options.account) {
            console.log("(*) By including mnemonics or private keys on the command line they are");
            console.log("    possibly readable by other users on your system and may get stored in");
            console.log("    your bash history file. This is NOT recommended.");
            console.log("");
        }
        if (message) {
            console.log(message);
            console.log("");
        }
        process.exit(status || 0);
        throw new Error("never reached");
    };
    CLI.prototype.run = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var command, argParser_1, plugin_1, commandIndex, argParser, debug, plugin, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = args.slice();
                        if (this.defaultCommand && !this.plugins[this.defaultCommand]) {
                            throw new Error("missing defaultCommand plugin");
                        }
                        command = null;
                        argParser_1 = new ArgParser(args);
                        plugin_1 = new CheckPlugin();
                        return [4 /*yield*/, plugin_1.prepareOptions(argParser_1)];
                    case 1:
                        _a.sent();
                        // These are not part of the plugin
                        ["debug", "help", "version"].forEach(function (key) {
                            argParser_1.consumeFlag(key);
                        });
                        // Find the first unconsumed argument
                        if (!this.standAlone) {
                            commandIndex = argParser_1._checkCommandIndex();
                            if (commandIndex === -1) {
                                command = this.defaultCommand;
                            }
                            else {
                                command = args[commandIndex];
                                args.splice(commandIndex, 1);
                            }
                        }
                        argParser = new ArgParser(args);
                        if (argParser.consumeFlag("version")) {
                            console.log(CLI.getAppName() + "/" + this.options.version);
                            return [2 /*return*/];
                        }
                        if (argParser.consumeFlag("help")) {
                            return [2 /*return*/, this.showUsage()];
                        }
                        debug = argParser.consumeFlag("debug");
                        plugin = null;
                        if (this.standAlone) {
                            plugin = new this.standAlone;
                        }
                        else {
                            try {
                                plugin = new this.plugins[command]();
                            }
                            catch (error) {
                                if (command) {
                                    this.showUsage("unknown command - " + command);
                                }
                                return [2 /*return*/, this.showUsage("no command provided", 1)];
                            }
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4 /*yield*/, plugin.prepareOptions(argParser)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, plugin.prepareArgs(argParser._finalizeArgs())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, plugin.run()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        if (error_4 instanceof UsageError) {
                            return [2 /*return*/, this.showUsage(error_4.message, 1)];
                        }
                        if (debug) {
                            console.log("----- <DEBUG> ------");
                            console.log(error_4);
                            console.log("----- </DEBUG> -----");
                        }
                        console.log("Error: " + error_4.message);
                        process.exit(2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return CLI;
}());
exports.CLI = CLI;
//# sourceMappingURL=cli.js.map