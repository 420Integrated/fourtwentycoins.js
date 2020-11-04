import { BigNumber, BigNumberish } from "@420integrated/bignumber";
export declare function commify(value: string | number): string;
export declare function formatUnits(value: BigNumberish, unitName?: string | BigNumberish): string;
export declare function parseUnits(value: string, unitName?: BigNumberish): BigNumber;
export declare function formatFourtwentycoin(marley: BigNumberish): string;
export declare function parseFourtwentycoin(fourtwentycoin: string): BigNumber;
