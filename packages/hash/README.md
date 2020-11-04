420coin Hash Utilities
=======================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains several common hashing utilities (but not the actual hash functions).

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/hashing/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isValidName,
    namehash,

    id,

    messagePrefix,
    hashMessage

} = require("@420integrated/hash");
```


License
-------

MIT License
