"use strict";
import { fourtwentycoins } from "fourtwentycoins";
import { version } from "./_version";
const logger = new fourtwentycoins.utils.Logger(version);
export class MetamaskProvider extends fourtwentycoins.providers.Web3Provider {
    constructor(fourtwenty) {
        if (!fourtwenty) {
            fourtwenty = global.fourtwenty;
            if (!fourtwenty) {
                logger.throwError("could not auto-detect global.fourtwenty", fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                    operation: "window.fourtwenty"
                });
            }
        }
        super(fourtwenty);
        let _account = null;
        fourtwentycoins.utils.defineReadOnly(this, "_pollAccountFunc", () => {
            let account = null;
            if (account === _account) {
                return;
            }
            console.log("poll");
            this.emit("account", account, _account);
            _account = account;
        });
        super(fourtwenty);
    }
    getSigner(addressOrIndex) {
        if (!this.enabled) {
            return null;
        }
        return super.getSigner(addressOrIndex);
    }
    get enabled() {
        return false;
    }
    _startPollingAccount() {
        if (this._pollingAccount) {
            return;
        }
        console.log("start polling for account changes including to/from null");
        this._pollingAccount = setInterval(this._pollAccountFunc, 1000);
    }
    _stopPollingAccount() {
        if (!this._pollingAccount) {
            return;
        }
        console.log("stop polling for account changes including to/from null");
        clearInterval(this._pollingAccount);
        this._pollingAccount = null;
    }
    on(eventName, listener) {
        super.on(eventName, listener);
        if (this.listenerCount("account") > 0) {
            this._startPollingAccount();
        }
        return this;
    }
    off(eventName, listener) {
        super.off(eventName, listener);
        if (this.listenerCount("account") === 0) {
            this._stopPollingAccount();
        }
        return this;
    }
}
//# sourceMappingURL=metamask-provider.js.map