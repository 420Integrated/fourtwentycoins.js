"use strict";

export type TransportCreator = {
    create: () => Promise<Transport>;
};

let hidCache: Promise<typeof import("@420integrated/hw-transport-node-hid")> = null;

const hidWrapper = Object.freeze({
    create: function(): Promise<Transport> {
        // Load the library if not loaded
        if (hidCache == null) {
            hidCache = new Promise((resolve, reject) => {
                try {
                    let hid = require("@420integrated/hw-transport-node-hid");
                    if (hid.create == null) { resolve(hid["default"]); }
                    resolve(hid);
                } catch (error) {
                    reject(error);
                }
            });
            /*
            hidCache = import("@420integrated/hw-transport-node-hid").then((hid) => {
                if (hid.create == null) { return hid["default"]; }
                return hid;
            });
            */
        }

        return hidCache.then((hid) => {
            console.log(hid, hid.create);
            return hid.create()
        });
    }
});

export const transports: { [ name: string ]: TransportCreator } = Object.freeze({
    "hid": hidWrapper,
    "default": hidWrapper
});
