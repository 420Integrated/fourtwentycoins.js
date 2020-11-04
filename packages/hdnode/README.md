Hierarchal Deterministic Utilities (BIP32)
==========================================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible computing, deriving, encoding and decoding Hierarchal-Deterministic
private keys.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/hdnode/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    HDNode,

    defaultPath,

    mnemonicToSeed,
    mnemonicToEntropy,
    entropyToMnemonic,
    isValidMnemonic,

    // Types

    Mnemonic

} = require("@420integrated/hdnode");
```


License
-------

MIT License
