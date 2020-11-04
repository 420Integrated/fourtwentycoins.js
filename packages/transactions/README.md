420coin Transaction Utilities
==============================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains various functions for encoding and decoding serialized transactios.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/transactions/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    computeAddress,
    recoverAddress,

    serialize,
    parse,

    // Types

    Transaction,
    UnsignedTransaction

} = require("@420integrated/abi");
```


License
-------

MIT License
