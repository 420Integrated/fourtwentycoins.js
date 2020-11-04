Solidity Packed-Encoding Utilities
==================================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains functions to perform Solidity-specific packed (i.e. non-standard)
encoding operations.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/hashing/#utils--solidity-hashing).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    pack,
    keccak256,
    sha256

} = require("@420integrated/solidity");
```


License
-------

MIT License
