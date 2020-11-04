420coin Unit Conversion Utilities
==================================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains functions to convert between string representations and numeric
representations of numbers, including those out of the range of JavaScript.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/display-logic/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    formatUnits,
    parseUnits,

    formatFourtwentycoin,
    parseFourtwentycoin,

    commify

} = require("@420integrated/units");
```


License
-------

MIT License
