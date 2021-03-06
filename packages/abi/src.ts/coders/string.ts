"use strict";

import { toUtf8Bytes, toUtf8String } from "@420integrated/strings";

import { Reader, Writer } from "./abstract-coder";
import { DynamicBytesCoder } from "./bytes";

export class StringCoder extends DynamicBytesCoder {

    constructor(localName: string) {
        super("string", localName);
    }

    encode(writer: Writer, value: any): number {
        return super.encode(writer, toUtf8Bytes(value));
    }

    decode(reader: Reader): any {
        return toUtf8String(super.decode(reader));
    }
}
