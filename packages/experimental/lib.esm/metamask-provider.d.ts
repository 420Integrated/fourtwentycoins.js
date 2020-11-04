import { fourtwentycoins } from "fourtwentycoins";
export declare class MetamaskProvider extends fourtwentycoins.providers.Web3Provider {
    _pollingAccount: any;
    _pollAccountFunc: () => void;
    constructor(fourtwenty?: fourtwentycoins.providers.ExternalProvider);
    getSigner(addressOrIndex?: string | number): fourtwentycoins.providers.JsonRpcSigner;
    get enabled(): boolean;
    _startPollingAccount(): void;
    _stopPollingAccount(): void;
    on(eventName: fourtwentycoins.providers.EventType, listener: fourtwentycoins.providers.Listener): this;
    off(eventName: fourtwentycoins.providers.EventType, listener?: fourtwentycoins.providers.Listener): this;
}
