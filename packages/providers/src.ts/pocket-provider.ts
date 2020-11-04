"use strict";

import { Network } from "@420integrated/networks";
import { ConnectionInfo } from "@420integrated/web";

import { Logger } from "@420integrated/logger";
import { version } from "./_version";
const logger = new Logger(version);

import { UrlJsonRpcProvider } from "./url-json-rpc-provider";

const defaultApplicationId = "5f7f8547b90218002e9ce9dd";

export class PocketProvider extends UrlJsonRpcProvider {
    readonly applicationId: string;
    readonly applicationSecretKey: string;

    static getApiKey(apiKey: any): any {
        const apiKeyObj: { applicationId: string, applicationSecretKey: string } = {
            applicationId: defaultApplicationId,
            applicationSecretKey: null
        };

        if (apiKey == null) { return apiKeyObj; }

        // Parse applicationId and applicationSecretKey
        if (typeof (apiKey) === "string") {
            apiKeyObj.applicationId = apiKey;

        } else if (apiKey.applicationSecretKey != null) {
            logger.assertArgument((typeof (apiKey.applicationId) === "string"),
                "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
            logger.assertArgument((typeof (apiKey.applicationSecretKey) === "string"),
                "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");

            apiKeyObj.applicationId = apiKey.applicationId;
            apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;

        } else if (apiKey.applicationId) {
            apiKeyObj.applicationId = apiKey.applicationId;
        }

        return apiKeyObj;
    }

    static getUrl(network: Network, apiKey: any): ConnectionInfo {
        let host: string = null;
        switch (network ? network.name : "unknown") {
            case "homestead":
                host = "fourtwenty-mainnet.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }

        const connection: ConnectionInfo = {
            url: (`https:/\/${ host }/v1/${ apiKey.applicationId }`),
        };

        // Initialize empty headers
        connection.headers = {}

        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey
        }

        return connection;
    }

    isCommunityResource(): boolean {
        return (this.applicationId === defaultApplicationId);
    }
}
