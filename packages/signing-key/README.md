Signing Key
===========

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for secp256-k1 signing, verifying and recovery operations.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/signing-key/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    SigningKey,

    computePublicKey,
    recoverPublicKey

} = require("@420integrated/signing-key");
```

License
-------

MIT License
