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
Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("@420integrated/properties");
var logger_1 = require("@420integrated/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var allowedTransactionKeys = [
    "chainId", "data", "from", "smokeLimit", "smokePrice", "nonce", "to", "value"
];
var forwardErrors = [
    logger_1.Logger.errors.INSUFFICIENT_FUNDS,
    logger_1.Logger.errors.NONCE_EXPIRED,
    logger_1.Logger.errors.REPLACEMENT_UNDERPRICED,
];
;
;
var Signer = /** @class */ (function () {
    ///////////////////
    // Sub-classes MUST call super
    function Signer() {
        var _newTarget = this.constructor;
        logger.checkAbstract(_newTarget, Signer);
        properties_1.defineReadOnly(this, "_isSigner", true);
    }
    ///////////////////
    // Sub-classes MAY override these
    Signer.prototype.getBalance = function (blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getBalance");
                        return [4 /*yield*/, this.provider.getBalance(this.getAddress(), blockTag)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Signer.prototype.getTransactionCount = function (blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getTransactionCount");
                        return [4 /*yield*/, this.provider.getTransactionCount(this.getAddress(), blockTag)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Populates "from" if unspecified, and estimates the smoke for the transation
    Signer.prototype.estimateSmoke = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("estimateSmoke");
                        return [4 /*yield*/, properties_1.resolveProperties(this.checkTransaction(transaction))];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, this.provider.estimateSmoke(tx)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Populates "from" if unspecified, and calls with the transation
    Signer.prototype.call = function (transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("call");
                        return [4 /*yield*/, properties_1.resolveProperties(this.checkTransaction(transaction))];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, this.provider.call(tx, blockTag)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Populates all fields in a transaction, signs it and sends it to the network
    Signer.prototype.sendTransaction = function (transaction) {
        var _this = this;
        this._checkProvider("sendTransaction");
        return this.populateTransaction(transaction).then(function (tx) {
            return _this.signTransaction(tx).then(function (signedTx) {
                return _this.provider.sendTransaction(signedTx);
            });
        });
    };
    Signer.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var network;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getChainId");
                        return [4 /*yield*/, this.provider.getNetwork()];
                    case 1:
                        network = _a.sent();
                        return [2 /*return*/, network.chainId];
                }
            });
        });
    };
    Signer.prototype.getSmokePrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("getSmokePrice");
                        return [4 /*yield*/, this.provider.getSmokePrice()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Signer.prototype.resolveName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkProvider("resolveName");
                        return [4 /*yield*/, this.provider.resolveName(name)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Checks a transaction does not contain invalid keys and if
    // no "from" is provided, populates it.
    // - does NOT require a provider
    // - adds "from" is not present
    // - returns a COPY (safe to mutate the result)
    // By default called from: (overriding these prevents it)
    //   - call
    //   - estimateSmoke
    //   - populateTransaction (and therefor sendTransaction)
    Signer.prototype.checkTransaction = function (transaction) {
        for (var key in transaction) {
            if (allowedTransactionKeys.indexOf(key) === -1) {
                logger.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
            }
        }
        var tx = properties_1.shallowCopy(transaction);
        if (tx.from == null) {
            tx.from = this.getAddress();
        }
        else {
            // Make sure any provided address matches this signer
            tx.from = Promise.all([
                Promise.resolve(tx.from),
                this.getAddress()
            ]).then(function (result) {
                if (result[0] !== result[1]) {
                    logger.throwArgumentError("from address mismatch", "transaction", transaction);
                }
                return result[0];
            });
        }
        return tx;
    };
    // Populates ALL keys for a transaction and checks that "from" matches
    // this Signer. Should be used by sendTransaction but NOT by signTransaction.
    // By default called from: (overriding these prevents it)
    //   - sendTransaction
    Signer.prototype.populateTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, properties_1.resolveProperties(this.checkTransaction(transaction))];
                    case 1:
                        tx = _a.sent();
                        if (tx.to != null) {
                            tx.to = Promise.resolve(tx.to).then(function (to) { return _this.resolveName(to); });
                        }
                        if (tx.smokePrice == null) {
                            tx.smokePrice = this.getSmokePrice();
                        }
                        if (tx.nonce == null) {
                            tx.nonce = this.getTransactionCount("pending");
                        }
                        if (tx.smokeLimit == null) {
                            tx.smokeLimit = this.estimateSmoke(tx).catch(function (error) {
                                if (forwardErrors.indexOf(error.code) >= 0) {
                                    throw error;
                                }
                                return logger.throwError("cannot estimate smoke; transaction may fail or may require manual smoke limit", logger_1.Logger.errors.UNPREDICTABLE_SMOKE_LIMIT, {
                                    error: error,
                                    tx: tx
                                });
                            });
                        }
                        if (tx.chainId == null) {
                            tx.chainId = this.getChainId();
                        }
                        else {
                            tx.chainId = Promise.all([
                                Promise.resolve(tx.chainId),
                                this.getChainId()
                            ]).then(function (results) {
                                if (results[1] !== 0 && results[0] !== results[1]) {
                                    logger.throwArgumentError("chainId address mismatch", "transaction", transaction);
                                }
                                return results[0];
                            });
                        }
                        return [4 /*yield*/, properties_1.resolveProperties(tx)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ///////////////////
    // Sub-classes SHOULD leave these alone
    Signer.prototype._checkProvider = function (operation) {
        if (!this.provider) {
            logger.throwError("missing provider", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: (operation || "_checkProvider")
            });
        }
    };
    Signer.isSigner = function (value) {
        return !!(value && value._isSigner);
    };
    return Signer;
}());
exports.Signer = Signer;
var VoidSigner = /** @class */ (function (_super) {
    __extends(VoidSigner, _super);
    function VoidSigner(address, provider) {
        var _newTarget = this.constructor;
        var _this = this;
        logger.checkNew(_newTarget, VoidSigner);
        _this = _super.call(this) || this;
        properties_1.defineReadOnly(_this, "address", address);
        properties_1.defineReadOnly(_this, "provider", provider || null);
        return _this;
    }
    VoidSigner.prototype.getAddress = function () {
        return Promise.resolve(this.address);
    };
    VoidSigner.prototype._fail = function (message, operation) {
        return Promise.resolve().then(function () {
            logger.throwError(message, logger_1.Logger.errors.UNSUPPORTED_OPERATION, { operation: operation });
        });
    };
    VoidSigner.prototype.signMessage = function (message) {
        return this._fail("VoidSigner cannot sign messages", "signMessage");
    };
    VoidSigner.prototype.signTransaction = function (transaction) {
        return this._fail("VoidSigner cannot sign transactions", "signTransaction");
    };
    VoidSigner.prototype._signTypedData = function (domain, types, value) {
        return this._fail("VoidSigner cannot sign typed data", "signTypedData");
    };
    VoidSigner.prototype.connect = function (provider) {
        return new VoidSigner(this.address, provider);
    };
    return VoidSigner;
}(Signer));
exports.VoidSigner = VoidSigner;
//# sourceMappingURL=index.js.map