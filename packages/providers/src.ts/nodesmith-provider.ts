/* istanbul ignore file */

"use strict";

import { Network } from "@420integrated/networks";
import { UrlJsonRpcProvider } from "./url-json-rpc-provider";

import { Logger } from "@420integrated/logger";
import { version } from "./_version";
const logger = new Logger(version);

// Special API key provided by Nodesmith for fourtwentycoins.js
const defaultApiKey = "FOURTWENTYCOINS_JS_SHARED";

export class NodesmithProvider extends UrlJsonRpcProvider {

    static getApiKey(apiKey: any): any {
        if (apiKey && typeof(apiKey) !== "string") {
            logger.throwArgumentError("invalid apiKey", "apiKey", apiKey);
        }
        return apiKey || defaultApiKey;
    }

    static getUrl(network: Network, apiKey?: any): string {
        logger.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");

        let host = null;
        switch (network.name) {
            case "homestead":
                host = "https://420integrated.com/api/mainnet/jsonrpc";
                break;
            case "ropsten":
                host = "https://420integrated.com/api/ropsten/jsonrpc";
                break;
            case "rinkeby":
                host = "https://420integrated.com/api/rinkeby/jsonrpc";
                break;
            case "goerli":
                host = "https://420integrated.com/api/goerli/jsonrpc";
                break;
            case "kovan":
                host = "https://420integrated.com/api/kovan/jsonrpc";
                break;
            default:
               logger.throwArgumentError("unsupported network", "network", arguments[0]);
        }

        return (host + "?apiKey=" + apiKey);
    }
}
