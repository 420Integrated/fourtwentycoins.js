import { BytesLike } from "@420integrated/bytes";
export declare function pbkdf2(password: BytesLike, salt: BytesLike, iterations: number, keylen: number, hashAlgorithm: string): string;
