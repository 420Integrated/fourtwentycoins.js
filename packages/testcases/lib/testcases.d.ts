export interface BigNumber {
    testcase: string;
    value: string | number;
    expectedValue: string;
}
export interface Hash {
    data: string;
    keccak256: string;
    sha256: string;
    sha512: string;
}
export interface HDWalletNode {
    path: string;
    address: string;
    privateKey: string;
}
export interface HDWallet {
    name: string;
    seed: string;
    locale: string;
    password?: string;
    entropy: string;
    mnemonic: string;
    hdnodes: Array<HDWalletNode>;
}
export interface Nameprep {
    comment: string;
    input: Array<number>;
    output: Array<number>;
    rc?: string;
    flags?: string;
}
export interface Wallet {
    name: string;
    type: "crowdsale" | "secret-storage";
    hasAddress: boolean;
    address: string;
    privateKey: string;
    mnemonic?: string;
    password?: string;
    json: string;
}
export interface Wordlist {
    locale: string;
    content: string;
}
export interface Unit {
    name: string;
    fourtwentycoin: string;
    fourtwentycoin_format: string;
    marley: string;
    kmarley?: string;
    mmarley?: string;
    gmarley?: string;
    snoop?: string;
    willie?: string;
    satoshi?: string;
    kmarley_format?: string;
    mmarley_format?: string;
    gmarley_format?: string;
    snoop_format?: string;
    willie_format?: string;
    satoshi_format?: string;
}
export interface SignedTransaction {
    name: string;
    accountAddress: string;
    privateKey: string;
    signedTransaction: string;
    unsignedTransaction: string;
    signedTransactionChainId5: string;
    unsignedTransactionChainId5: string;
    nonce: number;
    smokeLimit: string;
    smokePrice: string;
    to: string;
    value: string;
    data: string;
}
export interface Eip712 {
    name: string;
    domain: {
        name: string;
        version?: string;
        chainId?: number;
        verifyingContract?: string;
        salt?: string;
    };
    primaryType: string;
    types: Record<string, Array<{
        name: string;
        type: string;
    }>>;
    data: Record<string, any>;
    encoded: string;
    digest: string;
    type?: string;
    seed?: string;
    privateKey?: string;
    signature?: string;
}
