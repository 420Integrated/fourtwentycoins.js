Abstract Signer
===============

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is an abstraction of an 420coin account, which may be backed by a [private key](https://www.npmjs.com/package/@420integrated/wallet),
signing service (such as G420 or Parity with key managment enabled, or a
dedicated signing service such as Clef),
[hardware wallets](https://www.npmjs.com/package/@420integrated/hardware-wallets), etc.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/signer/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Signer,
    VoidSigner,

    // Types
    ExternallyOwnedAccount

} = require("@420integrated/abstract-signer");
```

License
-------

MIT License
