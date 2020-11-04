import { BigNumber, BigNumberish } from "@420integrated/bignumber";
import { BytesLike, SignatureLike } from "@420integrated/bytes";
export declare type UnsignedTransaction = {
    to?: string;
    nonce?: number;
    smokeLimit?: BigNumberish;
    smokePrice?: BigNumberish;
    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;
};
export interface Transaction {
    hash?: string;
    to?: string;
    from?: string;
    nonce: number;
    smokeLimit: BigNumber;
    smokePrice: BigNumber;
    data: string;
    value: BigNumber;
    chainId: number;
    r?: string;
    s?: string;
    v?: number;
}
export declare function computeAddress(key: BytesLike | string): string;
export declare function recoverAddress(digest: BytesLike, signature: SignatureLike): string;
export declare function serialize(transaction: UnsignedTransaction, signature?: SignatureLike): string;
export declare function parse(rawTransaction: BytesLike): Transaction;
