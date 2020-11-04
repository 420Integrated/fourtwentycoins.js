"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmitter from "events";
import { fourtwentycoins } from "fourtwentycoins";
import { version } from "./_version";
const logger = new fourtwentycoins.utils.Logger(version);
/*
function getBlockTag(tag) {
    if (tag == null) { return "latest"; }
    if (tag === "earliest" || tag === "latest" || tag === "pending") {
        return tag;
    }
    return fourtwentycoins.utils.hexValue(tag)
}
*/
export class _Eip1193Bridge extends EventEmitter {
    constructor(signer, provider) {
        super();
        fourtwentycoins.utils.defineReadOnly(this, "signer", signer);
        fourtwentycoins.utils.defineReadOnly(this, "provider", provider || null);
    }
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            function throwUnsupported(message) {
                return logger.throwError("fourtwenty_sign requires a signer", fourtwentycoins.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    method: method,
                    params: params
                });
            }
            let coerce = (value) => value;
            switch (method) {
                case "fourtwenty_smokePrice": {
                    const result = yield this.provider.getSmokePrice();
                    return result.toHexString();
                }
                case "fourtwenty_accounts": {
                    const result = [];
                    if (this.signer) {
                        const address = yield this.signer.getAddress();
                        result.push(address);
                    }
                    return result;
                }
                case "fourtwenty_blockNumber": {
                    return yield this.provider.getBlockNumber();
                }
                case "fourtwenty_chainId": {
                    const result = yield this.provider.getNetwork();
                    return result.chainId;
                }
                case "fourtwenty_getBalance": {
                    const result = yield this.provider.getBalance(params[0], params[1]);
                    return result.toHexString();
                }
                case "fourtwenty_getStorageAt": {
                    return this.provider.getStorageAt(params[0], params[1], params[2]);
                }
                case "fourtwenty_getTransactionCount": {
                    const result = yield this.provider.getTransactionCount(params[0], params[1]);
                    return fourtwentycoins.utils.hexValue(result);
                }
                case "fourtwenty_getBlockTransactionCountByHash":
                case "fourtwenty_getBlockTransactionCountByNumber": {
                    const result = yield this.provider.getBlock(params[0]);
                    return fourtwentycoins.utils.hexValue(result.transactions.length);
                }
                case "fourtwenty_getCode": {
                    const result = yield this.provider.getBlock(params[0]);
                    return result;
                }
                case "fourtwenty_sendRawTransaction": {
                    return yield this.provider.sendTransaction(params[0]);
                }
                case "fourtwenty_call": {
                    const req = fourtwentycoins.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    return yield this.provider.call(req, params[1]);
                }
                case "estimateSmoke": {
                    if (params[1] && params[1] !== "latest") {
                        throwUnsupported("estimateSmoke does not support blockTag");
                    }
                    const req = fourtwentycoins.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const result = yield this.provider.estimateSmoke(req);
                    return result.toHexString();
                }
                // @TOOD: Transform? No uncles?
                case "fourtwenty_getBlockByHash":
                case "fourtwenty_getBlockByNumber": {
                    if (params[1]) {
                        return yield this.provider.getBlockWithTransactions(params[0]);
                    }
                    else {
                        return yield this.provider.getBlock(params[0]);
                    }
                }
                case "fourtwenty_getTransactionByHash": {
                    return yield this.provider.getTransaction(params[0]);
                }
                case "fourtwenty_getTransactionReceipt": {
                    return yield this.provider.getTransactionReceipt(params[0]);
                }
                case "fourtwenty_sign": {
                    if (!this.signer) {
                        return throwUnsupported("fourtwenty_sign requires an account");
                    }
                    const address = yield this.signer.getAddress();
                    if (address !== fourtwentycoins.utils.getAddress(params[0])) {
                        logger.throwArgumentError("account mismatch or account not found", "params[0]", params[0]);
                    }
                    return this.signer.signMessage(fourtwentycoins.utils.arrayify(params[1]));
                }
                case "fourtwenty_sendTransaction": {
                    if (!this.signer) {
                        return throwUnsupported("fourtwenty_sign requires an account");
                    }
                    const req = fourtwentycoins.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const tx = yield this.signer.sendTransaction(req);
                    return tx.hash;
                }
                case "fourtwenty_getUncleCountByBlockHash":
                case "fourtwenty_getUncleCountByBlockNumber":
                    {
                        coerce = fourtwentycoins.utils.hexValue;
                        break;
                    }
                case "fourtwenty_getTransactionByBlockHashAndIndex":
                case "fourtwenty_getTransactionByBlockNumberAndIndex":
                case "fourtwenty_getUncleByBlockHashAndIndex":
                case "fourtwenty_getUncleByBlockNumberAndIndex":
                case "fourtwenty_newFilter":
                case "fourtwenty_newBlockFilter":
                case "fourtwenty_newPendingTransactionFilter":
                case "fourtwenty_uninstallFilter":
                case "fourtwenty_getFilterChanges":
                case "fourtwenty_getFilterLogs":
                case "fourtwenty_getLogs":
                    break;
            }
            // If our provider supports send, maybe it can do a better job?
            if ((this.provider).send) {
                const result = yield (this.provider).send(method, params);
                return coerce(result);
            }
            return throwUnsupported(`unsupported method: ${method}`);
        });
    }
}
//# sourceMappingURL=eip1193-bridge.js.map