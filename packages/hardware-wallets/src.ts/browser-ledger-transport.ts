"use strict";

import u2f from "@420integrated/hw-transport-u2f";

export type TransportCreator = {
    create: () => Promise<Transport>;
};

export const transports: { [ name: string ]: TransportCreator } = {
    "u2f": u2f,
    "default": u2f
};
