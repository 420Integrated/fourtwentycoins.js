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
Object.defineProperty(exports, "__esModule", { value: true });
var fourtwentycoins_1 = require("fourtwentycoins");
var _version_1 = require("./_version");
var logger = new fourtwentycoins_1.fourtwentycoins.utils.Logger(_version_1.version);
var hw_app_fourtwenty_1 = __importDefault(require("@420integrated/hw-app-fourtwenty"));
// We store these in a separated import so it is easier to swap them out
// at bundle time; browsers do not get HID, for example. This maps a string
// "type" to a Transport with create.
var ledger_transport_1 = require("./ledger-transport");
var defaultPath = "m/44'/60'/0'/0/0";
function waiter(duration) {
    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
}
var LedgerSigner = /** @class */ (function (_super) {
    __extends(LedgerSigner, _super);
    function LedgerSigner(provider, type, path) {
        var _this = _super.call(this) || this;
        if (path == null) {
            path = defaultPath;
        }
        if (type == null) {
            type = "default";
        }
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "path", path);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "type", type);
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "provider", provider || null);
        var transport = ledger_transport_1.transports[type];
        if (!transport) {
            logger.throwArgumentError("unknown or unsupported type", "type", type);
        }
        fourtwentycoins_1.fourtwentycoins.utils.defineReadOnly(_this, "_fourtwenty", transport.create().then(function (transport) {
            var fourtwenty = new hw_app_fourtwenty_1.default(transport);
            return fourtwenty.getAppConfiguration().then(function (config) {
                return fourtwenty;
            }, function (error) {
                return Promise.reject(error);
            });
        }, function (error) {
            return Promise.reject(error);
        }));
        return _this;
    }
    LedgerSigner.prototype._retry = function (callback, timeout) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var fourtwenty, i, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (timeout && timeout > 0) {
                            setTimeout(function () { reject(new Error("timeout")); }, timeout);
                        }
                        return [4 /*yield*/, this._fourtwenty];
                    case 1:
                        fourtwenty = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < 50)) return [3 /*break*/, 9];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, callback(fourtwenty)];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, resolve(result)];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1.id !== "TransportLocked") {
                            return [2 /*return*/, reject(error_1)];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, waiter(100)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/, reject(new Error("timeout"))];
                }
            });
        }); });
    };
    LedgerSigner.prototype.getAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._retry(function (fourtwenty) { return fourtwenty.getAddress(_this.path); })];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, fourtwentycoins_1.fourtwentycoins.utils.getAddress(account.address)];
                }
            });
        });
    };
    LedgerSigner.prototype.signMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var messageHex, sig;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof (message) === 'string') {
                            message = fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(message);
                        }
                        messageHex = fourtwentycoins_1.fourtwentycoins.utils.hexlify(message).substring(2);
                        return [4 /*yield*/, this._retry(function (fourtwenty) { return fourtwenty.signPersonalMessage(_this.path, messageHex); })];
                    case 1:
                        sig = _a.sent();
                        sig.r = '0x' + sig.r;
                        sig.s = '0x' + sig.s;
                        return [2 /*return*/, fourtwentycoins_1.fourtwentycoins.utils.joinSignature(sig)];
                }
            });
        });
    };
    LedgerSigner.prototype.signTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, baseTx, unsignedTx, sig;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fourtwentycoins_1.fourtwentycoins.utils.resolveProperties(transaction)];
                    case 1:
                        tx = _a.sent();
                        baseTx = {
                            chainId: (tx.chainId || undefined),
                            data: (tx.data || undefined),
                            smokeLimit: (tx.smokeLimit || undefined),
                            smokePrice: (tx.smokePrice || undefined),
                            nonce: (tx.nonce ? fourtwentycoins_1.fourtwentycoins.BigNumber.from(tx.nonce).toNumber() : undefined),
                            to: (tx.to || undefined),
                            value: (tx.value || undefined),
                        };
                        unsignedTx = fourtwentycoins_1.fourtwentycoins.utils.serializeTransaction(baseTx).substring(2);
                        return [4 /*yield*/, this._retry(function (fourtwenty) { return fourtwenty.signTransaction(_this.path, unsignedTx); })];
                    case 2:
                        sig = _a.sent();
                        return [2 /*return*/, fourtwentycoins_1.fourtwentycoins.utils.serializeTransaction(baseTx, {
                                v: fourtwentycoins_1.fourtwentycoins.BigNumber.from("0x" + sig.v).toNumber(),
                                r: ("0x" + sig.r),
                                s: ("0x" + sig.s),
                            })];
                }
            });
        });
    };
    LedgerSigner.prototype.connect = function (provider) {
        return new LedgerSigner(provider, this.type, this.path);
    };
    return LedgerSigner;
}(fourtwentycoins_1.fourtwentycoins.Signer));
exports.LedgerSigner = LedgerSigner;
//# sourceMappingURL=ledger.js.map