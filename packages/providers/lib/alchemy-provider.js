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
var properties_1 = require("@420integrated/properties");
var formatter_1 = require("./formatter");
var websocket_provider_1 = require("./websocket-provider");
var logger_1 = require("@420integrated/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var url_json_rpc_provider_1 = require("./url-json-rpc-provider");
// This key was provided to fourtwentycoins.js by Alchemy to be used by the
// default provider, but it is recommended that for your own
// production environments, that you acquire your own API key at:
//   https://dashboard.alchemyapi.io
var defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
var AlchemyWebSocketProvider = /** @class */ (function (_super) {
    __extends(AlchemyWebSocketProvider, _super);
    function AlchemyWebSocketProvider(network, apiKey) {
        var _this = this;
        var provider = new AlchemyProvider(network, apiKey);
        var url = provider.connection.url.replace(/^http/i, "ws")
            .replace(".alchemyapi.", ".ws.alchemyapi.");
        _this = _super.call(this, url, provider.network) || this;
        properties_1.defineReadOnly(_this, "apiKey", provider.apiKey);
        return _this;
    }
    AlchemyWebSocketProvider.prototype.isCommunityResource = function () {
        return (this.apiKey === defaultApiKey);
    };
    return AlchemyWebSocketProvider;
}(websocket_provider_1.WebSocketProvider));
exports.AlchemyWebSocketProvider = AlchemyWebSocketProvider;
var AlchemyProvider = /** @class */ (function (_super) {
    __extends(AlchemyProvider, _super);
    function AlchemyProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlchemyProvider.getWebSocketProvider = function (network, apiKey) {
        return new AlchemyWebSocketProvider(network, apiKey);
    };
    AlchemyProvider.getApiKey = function (apiKey) {
        if (apiKey == null) {
            return defaultApiKey;
        }
        if (apiKey && typeof (apiKey) !== "string") {
            logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey;
    };
    AlchemyProvider.getUrl = function (network, apiKey) {
        var host = null;
        switch (network.name) {
            case "homestead":
                host = "fourtwenty-mainnet.alchemyapi.io/v2/";
                break;
            case "ropsten":
                host = "fourtwenty-ropsten.alchemyapi.io/v2/";
                break;
            default:
                logger.throwArgumentError("unsupported network", "network", arguments[0]);
        }
        return {
            allowGzip: true,
            url: ("https:/" + "/" + host + apiKey),
            throttleCallback: function (attempt, url) {
                if (apiKey === defaultApiKey) {
                    formatter_1.showThrottleMessage();
                }
                return Promise.resolve(true);
            }
        };
    };
    AlchemyProvider.prototype.isCommunityResource = function () {
        return (this.apiKey === defaultApiKey);
    };
    return AlchemyProvider;
}(url_json_rpc_provider_1.UrlJsonRpcProvider));
exports.AlchemyProvider = AlchemyProvider;
//# sourceMappingURL=alchemy-provider.js.map