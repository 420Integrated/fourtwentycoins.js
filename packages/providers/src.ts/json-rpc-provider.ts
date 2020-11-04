"use strict";

// See: https://github.com/420integrated/go-420coin/wiki/wiki/JSON-RPC

import { Provider, TransactionRequest, TransactionResponse } from "@420integrated/abstract-provider";
import { Signer, TypedDataDomain, TypedDataField, TypedDataSigner } from "@420integrated/abstract-signer";
import { BigNumber } from "@420integrated/bignumber";
import { Bytes, hexlify, hexValue } from "@420integrated/bytes";
import { _TypedDataEncoder } from "@420integrated/hash";
import { Network, Networkish } from "@420integrated/networks";
import { checkProperties, deepCopy, Deferrable, defineReadOnly, getStatic, resolveProperties, shallowCopy } from "@420integrated/properties";
import { toUtf8Bytes } from "@420integrated/strings";
import { ConnectionInfo, fetchJson, poll } from "@420integrated/web";

import { Logger } from "@420integrated/logger";
import { version } from "./_version";
const logger = new Logger(version);

import { BaseProvider, Event } from "./base-provider";


const errorSmoke = [ "call", "estimateSmoke" ];

function checkError(method: string, error: any, params: any): never {
    let message = error.message;
    if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof(error.error.message) === "string") {
        message = error.error.message;
    } else if (typeof(error.body) === "string") {
        message = error.body;
    } else if (typeof(error.responseText) === "string") {
        message = error.responseText;
    }
    message = (message || "").toLowerCase();

    const transaction = params.transaction || params.signedTransaction;

    // "insufficient funds for smoke * price + value + cost(data)"
    if (message.match(/insufficient funds/)) {
        logger.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
            error, method, transaction
        });
    }

    // "nonce too low"
    if (message.match(/nonce too low/)) {
        logger.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
            error, method, transaction
        });
    }

    // "replacement transaction underpriced"
    if (message.match(/replacement transaction underpriced/)) {
        logger.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
            error, method, transaction
        });
    }

    if (errorSmoke.indexOf(method) >= 0 && message.match(/smoke required exceeds allowance|always failing transaction|execution reverted/)) {
        logger.throwError("cannot estimate smoke; transaction may fail or may require manual smoke limit", Logger.errors.UNPREDICTABLE_SMOKE_LIMIT, {
            error, method, transaction
        });
    }

    throw error;
}

function timer(timeout: number): Promise<any> {
    return new Promise(function(resolve) {
        setTimeout(resolve, timeout);
    });
}

function getResult(payload: { error?: { code?: number, data?: any, message?: string }, result?: any }): any {
    if (payload.error) {
        // @TODO: not any
        const error: any = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }

    return payload.result;
}

function getLowerCase(value: string): string {
    if (value) { return value.toLowerCase(); }
    return value;
}

const _constructorGuard = {};

export class JsonRpcSigner extends Signer implements TypedDataSigner {
    readonly provider: JsonRpcProvider;
    _index: number;
    _address: string;

    constructor(constructorGuard: any, provider: JsonRpcProvider, addressOrIndex?: string | number) {
        logger.checkNew(new.target, JsonRpcSigner);

        super();

        if (constructorGuard !== _constructorGuard) {
            throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
        }

        defineReadOnly(this, "provider", provider);

        if (addressOrIndex == null) { addressOrIndex = 0; }

        if (typeof(addressOrIndex) === "string") {
            defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
            defineReadOnly(this, "_index", null);

        } else if (typeof(addressOrIndex) === "number") {
            defineReadOnly(this, "_index", addressOrIndex);
            defineReadOnly(this, "_address", null);

        } else {
            logger.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
        }
    }

    connect(provider: Provider): JsonRpcSigner {
        return logger.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "connect"
        });
    }

    connectUnchecked(): JsonRpcSigner {
        return new UncheckedJsonRpcSigner(_constructorGuard, this.provider, this._address || this._index);
    }

    getAddress(): Promise<string> {
        if (this._address) {
            return Promise.resolve(this._address);
        }

        return this.provider.send("fourtwenty_accounts", []).then((accounts) => {
            if (accounts.length <= this._index) {
                logger.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
                    operation: "getAddress"
                });
            }
            return this.provider.formatter.address(accounts[this._index])
        });
    }

    sendUncheckedTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        transaction = shallowCopy(transaction);

        const fromAddress = this.getAddress().then((address) => {
            if (address) { address = address.toLowerCase(); }
            return address;
        });

        // The JSON-RPC for fourtwenty_sendTransaction uses 90000 smoke; if the user
        // wishes to use this, it is easy to specify explicitly, otherwise
        // we look it up for them.
        if (transaction.smokeLimit == null) {
            const estimate = shallowCopy(transaction);
            estimate.from = fromAddress;
            transaction.smokeLimit = this.provider.estimateSmoke(estimate);
        }

        return resolveProperties({
            tx: resolveProperties(transaction),
            sender: fromAddress
        }).then(({ tx, sender }) => {
            if (tx.from != null) {
                if (tx.from.toLowerCase() !== sender) {
                    logger.throwArgumentError("from address mismatch", "transaction", transaction);
                }
            } else {
                tx.from = sender;
            }

            const hexTx = (<any>this.provider.constructor).hexlifyTransaction(tx, { from: true });

            return this.provider.send("fourtwenty_sendTransaction", [ hexTx ]).then((hash) => {
                return hash;
            }, (error) => {
                return checkError("sendTransaction", error, hexTx);
            });
        });
    }

    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        return logger.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "signTransaction"
        });
    }

    sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
        return this.sendUncheckedTransaction(transaction).then((hash) => {
            return poll(() => {
                return this.provider.getTransaction(hash).then((tx: TransactionResponse) => {
                    if (tx === null) { return undefined; }
                    return this.provider._wrapTransaction(tx, hash);
                });
            }, { onceBlock: this.provider }).catch((error: Error) => {
                (<any>error).transactionHash = hash;
                throw error;
            });
        });
    }

    async signMessage(message: Bytes | string): Promise<string> {
        const data = ((typeof(message) === "string") ? toUtf8Bytes(message): message);
        const address = await this.getAddress();

        // https://github.com/420integrated/go-420coin/wiki/wiki/JSON-RPC#fourtwenty_sign
        return await this.provider.send("fourtwenty_sign", [ address.toLowerCase(), hexlify(data) ]);
    }

    async _signTypedData(domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, any>): Promise<string> {
        // Populate any ENS names (in-place)
        const populated = await _TypedDataEncoder.resolveNames(domain, types, value, (name: string) => {
            return this.provider.resolveName(name);
        });

        const address = await this.getAddress();

        return await this.provider.send("fourtwenty_signTypedData_v4", [
            address.toLowerCase(),
            JSON.stringify(_TypedDataEncoder.getPayload(populated.domain, types, populated.value))
        ]);
    }

    async unlock(password: string): Promise<boolean> {
        const provider = this.provider;

        const address = await this.getAddress();

        return provider.send("personal_unlockAccount", [ address.toLowerCase(), password, null ]);
    }
}

class UncheckedJsonRpcSigner extends JsonRpcSigner {
    sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
        return this.sendUncheckedTransaction(transaction).then((hash) => {
            return <TransactionResponse>{
                hash: hash,
                nonce: null,
                smokeLimit: null,
                smokePrice: null,
                data: null,
                value: null,
                chainId: null,
                confirmations: 0,
                from: null,
                wait: (confirmations?: number) => { return this.provider.waitForTransaction(hash, confirmations); }
            };
        });
    }
}

const allowedTransactionKeys: { [ key: string ]: boolean } = {
    chainId: true, data: true, smokeLimit: true, smokePrice:true, nonce: true, to: true, value: true
}

export class JsonRpcProvider extends BaseProvider {
    readonly connection: ConnectionInfo;

    _pendingFilter: Promise<number>;
    _nextId: number;

    constructor(url?: ConnectionInfo | string, network?: Networkish) {
        logger.checkNew(new.target, JsonRpcProvider);

        let networkOrReady: Networkish | Promise<Network> = network;

        // The network is unknown, query the JSON-RPC for it
        if (networkOrReady == null) {
            networkOrReady = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.detectNetwork().then((network) => {
                        resolve(network);
                    }, (error) => {
                        reject(error);
                    });
                }, 0);
            });
        }

        super(networkOrReady);

        // Default URL
        if (!url) { url = getStatic<() => string>(this.constructor, "defaultUrl")(); }

        if (typeof(url) === "string") {
            defineReadOnly(this, "connection",Object.freeze({
                url: url
            }));
        } else {
            defineReadOnly(this, "connection", Object.freeze(shallowCopy(url)));
        }

        this._nextId = 42;
    }

    static defaultUrl(): string {
        return "http:/\/localhost:6174";
    }

    async detectNetwork(): Promise<Network> {
        await timer(0);

        let chainId = null;
        try {
            chainId = await this.send("fourtwenty_chainId", [ ]);
        } catch (error) {
            try {
                chainId = await this.send("net_version", [ ]);
            } catch (error) { }
        }

        if (chainId != null) {
            const getNetwork = getStatic<(network: Networkish) => Network>(this.constructor, "getNetwork");
            try {
                return getNetwork(BigNumber.from(chainId).toNumber());
            } catch (error) {
                return logger.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
                    chainId: chainId,
                    event: "invalidNetwork",
                    serverError: error
                });
            }
        }

        return logger.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
            event: "noNetwork"
        });
    }

    getSigner(addressOrIndex?: string | number): JsonRpcSigner {
        return new JsonRpcSigner(_constructorGuard, this, addressOrIndex);
    }

    getUncheckedSigner(addressOrIndex?: string | number): UncheckedJsonRpcSigner {
        return this.getSigner(addressOrIndex).connectUnchecked();
    }

    listAccounts(): Promise<Array<string>> {
        return this.send("fourtwenty_accounts", []).then((accounts: Array<string>) => {
            return accounts.map((a) => this.formatter.address(a));
        });
    }

    send(method: string, params: Array<any>): Promise<any> {
        const request = {
            method: method,
            params: params,
            id: (this._nextId++),
            jsonrpc: "2.0"
        };

        this.emit("debug", {
            action: "request",
            request: deepCopy(request),
            provider: this
        });

        return fetchJson(this.connection, JSON.stringify(request), getResult).then((result) => {
            this.emit("debug", {
                action: "response",
                request: request,
                response: result,
                provider: this
            });

            return result;

        }, (error) => {
            this.emit("debug", {
                action: "response",
                error: error,
                request: request,
                provider: this
            });

            throw error;
        });
    }

    prepareRequest(method: string, params: any): [ string, Array<any> ] {
        switch (method) {
            case "getBlockNumber":
                return [ "fourtwenty_blockNumber", [] ];

            case "getSmokePrice":
                return [ "fourtwenty_smokePrice", [] ];

            case "getBalance":
                return [ "fourtwenty_getBalance", [ getLowerCase(params.address), params.blockTag ] ];

            case "getTransactionCount":
                return [ "fourtwenty_getTransactionCount", [ getLowerCase(params.address), params.blockTag ] ];

            case "getCode":
                return [ "fourtwenty_getCode", [ getLowerCase(params.address), params.blockTag ] ];

            case "getStorageAt":
                return [ "fourtwenty_getStorageAt", [ getLowerCase(params.address), params.position, params.blockTag ] ];

            case "sendTransaction":
                return [ "fourtwenty_sendRawTransaction", [ params.signedTransaction ] ]

            case "getBlock":
                if (params.blockTag) {
                    return [ "fourtwenty_getBlockByNumber", [ params.blockTag, !!params.includeTransactions ] ];
                } else if (params.blockHash) {
                    return [ "fourtwenty_getBlockByHash", [ params.blockHash, !!params.includeTransactions ] ];
                }
                return null;

            case "getTransaction":
                return [ "fourtwenty_getTransactionByHash", [ params.transactionHash ] ];

            case "getTransactionReceipt":
                return [ "fourtwenty_getTransactionReceipt", [ params.transactionHash ] ];

            case "call": {
                const hexlifyTransaction = getStatic<(t: TransactionRequest, a?: { [key: string]: boolean }) => { [key: string]: string }>(this.constructor, "hexlifyTransaction");
                return [ "fourtwenty_call", [ hexlifyTransaction(params.transaction, { from: true }), params.blockTag ] ];
            }

            case "estimateSmoke": {
                const hexlifyTransaction = getStatic<(t: TransactionRequest, a?: { [key: string]: boolean }) => { [key: string]: string }>(this.constructor, "hexlifyTransaction");
                return [ "fourtwenty_estimateSmoke", [ hexlifyTransaction(params.transaction, { from: true }) ] ];
            }

            case "getLogs":
                if (params.filter && params.filter.address != null) {
                    params.filter.address = getLowerCase(params.filter.address);
                }
                return [ "fourtwenty_getLogs", [ params.filter ] ];

            default:
                break;
        }

        return null;
    }

    async perform(method: string, params: any): Promise<any> {
        const args = this.prepareRequest(method,  params);

        if (args == null) {
            logger.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
        }

        try {
            return await this.send(args[0], args[1])
        } catch (error) {
            return checkError(method, error, params);
        }
    }

    _startEvent(event: Event): void {
        if (event.tag === "pending") { this._startPending(); }
        super._startEvent(event);
    }

    _startPending(): void {
        if (this._pendingFilter != null) { return; }
        const self = this;

        const pendingFilter: Promise<number> = this.send("fourtwenty_newPendingTransactionFilter", []);
        this._pendingFilter = pendingFilter;

        pendingFilter.then(function(filterId) {
            function poll() {
                self.send("fourtwenty_getFilterChanges", [ filterId ]).then(function(hashes: Array<string>) {
                    if (self._pendingFilter != pendingFilter) { return null; }

                    let seq = Promise.resolve();
                    hashes.forEach(function(hash) {
                        // @TODO: This should be garbage collected at some point... How? When?
                        self._emitted["t:" + hash.toLowerCase()] = "pending";
                        seq = seq.then(function() {
                            return self.getTransaction(hash).then(function(tx) {
                                self.emit("pending", tx);
                                return null;
                            });
                        });
                    });

                    return seq.then(function() {
                        return timer(1000);
                    });
                }).then(function() {
                    if (self._pendingFilter != pendingFilter) {
                        self.send("fourtwenty_uninstallFilter", [ filterId ]);
                        return;
                    }
                    setTimeout(function() { poll(); }, 0);

                    return null;
                }).catch((error: Error) => { });
            }
            poll();

            return filterId;
        }).catch((error: Error) => { });
    }

    _stopEvent(event: Event): void {
        if (event.tag === "pending" && this.listenerCount("pending") === 0) {
            this._pendingFilter = null;
        }
        super._stopEvent(event);
    }


    // Convert an fourtwentycoins.js transaction into a JSON-RPC transaction
    //  - smokeLimit => smoke
    //  - All values hexlified
    //  - All numeric values zero-striped
    //  - All addresses are lowercased
    // NOTE: This allows a TransactionRequest, but all values should be resolved
    //       before this is called
    // @TODO: This will likely be removed in future versions and prepareRequest
    //        will be the preferred method for this.
    static hexlifyTransaction(transaction: TransactionRequest, allowExtra?: { [key: string]: boolean }): { [key: string]: string } {
        // Check only allowed properties are given
        const allowed = shallowCopy(allowedTransactionKeys);
        if (allowExtra) {
            for (const key in allowExtra) {
                if (allowExtra[key]) { allowed[key] = true; }
            }
        }
        checkProperties(transaction, allowed);

        const result: { [key: string]: string } = {};

        // Some nodes (INFURA ropsten; INFURA mainnet is fine) do not like leading zeros.
        ["smokeLimit", "smokePrice", "nonce", "value"].forEach(function(key) {
            if ((<any>transaction)[key] == null) { return; }
            const value = hexValue((<any>transaction)[key]);
            if (key === "smokeLimit") { key = "smoke"; }
            result[key] = value;
        });

        ["from", "to", "data"].forEach(function(key) {
            if ((<any>transaction)[key] == null) { return; }
            result[key] = hexlify((<any>transaction)[key]);
        });

        return result;
    }
}