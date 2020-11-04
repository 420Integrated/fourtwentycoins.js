'use strict';

console.log("Using global.fourtwentycoins ");

const anyGlobal = (window as any);

const fourtwentycoins = anyGlobal._fourtwentycoins ;

export { fourtwentycoins }
