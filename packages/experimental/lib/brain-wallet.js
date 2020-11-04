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
Object.defineProperty(exports, "__esModule", { value: true });
var fourtwentycoins_1 = require("fourtwentycoins");
var scrypt_js_1 = require("scrypt-js");
var _version_1 = require("./_version");
var logger = new fourtwentycoins_1.fourtwentycoins.utils.Logger(_version_1.version);
var warned = false;
var BrainWallet = /** @class */ (function (_super) {
    __extends(BrainWallet, _super);
    function BrainWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrainWallet._generate = function (username, password, legacy, progressCallback) {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        var usernameBytes = null;
        var passwordBytes = null;
        if (typeof (username) === 'string') {
            logger.checkNormalize();
            usernameBytes = fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(username.normalize('NFKC'));
        }
        else {
            usernameBytes = fourtwentycoins_1.fourtwentycoins.utils.arrayify(username);
        }
        if (typeof (password) === 'string') {
            logger.checkNormalize();
            passwordBytes = fourtwentycoins_1.fourtwentycoins.utils.toUtf8Bytes(password.normalize('NFKC'));
        }
        else {
            passwordBytes = fourtwentycoins_1.fourtwentycoins.utils.arrayify(password);
        }
        return scrypt_js_1.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then(function (key) {
            if (legacy) {
                return new BrainWallet(key);
            }
            var mnemonic = fourtwentycoins_1.fourtwentycoins.utils.entropyToMnemonic(fourtwentycoins_1.fourtwentycoins.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(fourtwentycoins_1.fourtwentycoins.Wallet.fromMnemonic(mnemonic));
        });
    };
    BrainWallet.generate = function (username, password, progressCallback) {
        return BrainWallet._generate(username, password, false, progressCallback);
    };
    BrainWallet.generateLegacy = function (username, password, progressCallback) {
        return BrainWallet._generate(username, password, true, progressCallback);
    };
    return BrainWallet;
}(fourtwentycoins_1.fourtwentycoins.Wallet));
exports.BrainWallet = BrainWallet;
//# sourceMappingURL=brain-wallet.js.map