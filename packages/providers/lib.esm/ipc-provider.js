"use strict";
import net from "net";
import { defineReadOnly } from "@420integrated/properties";
import { Logger } from "@420integrated/logger";
import { version } from "./_version";
const logger = new Logger(version);
import { JsonRpcProvider } from "./json-rpc-provider";
export class IpcProvider extends JsonRpcProvider {
    constructor(path, network) {
        logger.checkNew(new.target, IpcProvider);
        if (path == null) {
            logger.throwError("missing path", Logger.errors.MISSING_ARGUMENT, { arg: "path" });
        }
        super("ipc://" + path, network);
        defineReadOnly(this, "path", path);
    }
    // @TODO: Create a connection to the IPC path and use filters instead of polling for block
    send(method, params) {
        // This method is very simple right now. We create a new socket
        // connection each time, which may be slower, but the main
        // advantage we are aiming for now is security. This simplifies
        // multiplexing requests (since we do not need to multiplex).
        let payload = JSON.stringify({
            method: method,
            params: params,
            id: 42,
            jsonrpc: "2.0"
        });
        return new Promise((resolve, reject) => {
            let response = Buffer.alloc(0);
            let stream = net.connect(this.path);
            stream.on("data", (data) => {
                response = Buffer.concat([response, data]);
            });
            stream.on("end", () => {
                try {
                    resolve(JSON.parse(response.toString()).result);
                    // @TODO: Better pull apart the error
                    stream.destroy();
                }
                catch (error) {
                    reject(error);
                    stream.destroy();
                }
            });
            stream.on("error", (error) => {
                reject(error);
                stream.destroy();
            });
            stream.write(payload);
            stream.end();
        });
    }
}
//# sourceMappingURL=ipc-provider.js.map