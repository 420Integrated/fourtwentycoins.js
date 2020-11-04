import { Bytes } from "@420integrated/bytes";
export declare const messagePrefix = "\u0019420coin Signed Message:\n";
export declare function hashMessage(message: Bytes | string): string;
