"use strict";
let hidCache = null;
const hidWrapper = Object.freeze({
    create: function () {
        // Load the library if not loaded
        if (hidCache == null) {
            hidCache = new Promise((resolve, reject) => {
                try {
                    let hid = require("@420integrated/hw-transport-node-hid");
                    if (hid.create == null) {
                        resolve(hid["default"]);
                    }
                    resolve(hid);
                }
                catch (error) {
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
            return hid.create();
        });
    }
});
export const transports = Object.freeze({
    "hid": hidWrapper,
    "default": hidWrapper
});
//# sourceMappingURL=ledger-transport.js.map