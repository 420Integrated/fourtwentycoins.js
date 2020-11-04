"use strict";

let fourtwentycoins : any = { };

const w = (window as any);
if (w._fourtwentycoins == null) {
    console.log("WARNING: @420integrated/hardware-wallet requires fourtwentycoins loaded first");
} else {
    fourtwentycoins = w._fourtwentycoins ;
}

export { fourtwentycoins }
