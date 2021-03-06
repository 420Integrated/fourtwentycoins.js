import { BigNumberish } from "@420integrated/bignumber";
import { Coder, Reader, Writer } from "./abstract-coder";
export declare class NumberCoder extends Coder {
    readonly size: number;
    readonly signed: boolean;
    constructor(size: number, signed: boolean, localName: string);
    encode(writer: Writer, value: BigNumberish): number;
    decode(reader: Reader): any;
}
