420coin Address Utilities
==========================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for encoding, verifying and computing checksums for
420coin addresses and computing special addresses, such as those
enerated by and for contracts under various situations.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/address/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    getAddress,
    isAddress,

    getIcapAddress,

    getContractAddress,
    getCreate2Address

} = require("@420integrated/address");
```

License
-------

MIT License
