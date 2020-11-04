"use strict";

import { fourtwentycoins } from "fourtwentycoins";

import { version } from "./_version";

const logger = new fourtwentycoins.utils.Logger(version);

export class MetamaskProvider extends fourtwentycoins.providers.Web3Provider {

    _pollingAccount: any;
    _pollAccountFunc: () => void;

    constructor(fourtwenty?: fourtwentycoins.providers.ExternalProvider) {
        if (!fourtwenty) {
            fourtwenty = (<any>global).fourtwenty;
            if (!fourtwenty) {
                logger.throwError("could not auto-detect global.fourtwenty", fourtwentycoins.errors.UNSUPPORTED_OPERATION, {
                    operation: "window.fourtwenty"
                });
            }
        }

        super(fourtwenty);

        let _account: string = null;
        fourtwentycoins.utils.defineReadOnly(this, "_pollAccountFunc", () => {
            let account: string = null;
            if (account === _account) { return; }
            console.log("poll");
            this.emit("account", account, _account);
            _account = account;
        });

        super(fourtwenty);
    }

    getSigner(addressOrIndex?: string | number): fourtwentycoins.providers.JsonRpcSigner {
        if (!this.enabled) { return null }
        return super.getSigner(addressOrIndex);
    }

    get enabled(): boolean {
        return false;
    }

    _startPollingAccount(): void {
        if (this._pollingAccount) { return; }
        console.log("start polling for account changes including to/from null");
        this._pollingAccount = setInterval(this._pollAccountFunc, 1000);
    }

    _stopPollingAccount(): void {
        if (!this._pollingAccount) { return; }
        console.log("stop polling for account changes including to/from null");
        clearInterval(this._pollingAccount);
        this._pollingAccount = null;
    }

    on(eventName: fourtwentycoins.providers.EventType, listener: fourtwentycoins.providers.Listener): this {
        super.on(eventName, listener);
        if (this.listenerCount("account") > 0) {
            this._startPollingAccount();
        }
        return this;
    }

    off(eventName: fourtwentycoins.providers.EventType, listener?: fourtwentycoins.providers.Listener): this {
        super.off(eventName, listener);
        if (this.listenerCount("account") === 0) {
            this._stopPollingAccount();
        }
        return this;
    }

}
