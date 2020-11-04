Base-X
======

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for encoding and decoding vinary data in arbitrary bases, but
is primarily for Base58 encoding which is used for various blockchain data.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/encoding/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    BaseX,

    Base32,
    Base58

} = require("@420integrated/basex");
```

License
-------

MIT License
