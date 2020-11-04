Byte Manipulation
=================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for manipulating binary data.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/bytes/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isBytesLike,
    isBytes,

    arrayify,

    concat,

    stripZeros,
    zeroPad,

    isHexString,
    hexlify,

    hexDataLength,
    hexDataSlice,
    hexConcat,

    hexValue,

    hexStripZeros,
    hexZeroPad,

    splitSignature,
    joinSignature,

    // Types

    Bytes,
    BytesLike,

    DataOptions,

    Hexable,

    SignatureLike,
    Signature

} = require("@420integrated/bytes");
```


License
-------

MIT License
