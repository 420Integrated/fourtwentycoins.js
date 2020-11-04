"use strict";
import { getAddress } from "@420integrated/address";
import { hexZeroPad } from "@420integrated/bytes";
import { Coder } from "./abstract-coder";
export class AddressCoder extends Coder {
    constructor(localName) {
        super("address", "address", localName, false);
    }
    encode(writer, value) {
        try {
            getAddress(value);
        }
        catch (error) {
            this._throwError(error.message, value);
        }
        return writer.writeValue(value);
    }
    decode(reader) {
        return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
    }
}
//# sourceMappingURL=address.js.map