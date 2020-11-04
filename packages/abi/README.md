420coin ABI Coder
==================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for encoding and decoding the Application Binary Interface (ABI)
used by most smart contracts to interoperate between other smart contracts and clients.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/abi/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    ConstructorFragment,
    EventFragment,
    Fragment,
    FunctionFragment,
    ParamType,
    FormatTypes,

    AbiCoder,
    defaultAbiCoder,

    Interface,
    Indexed,

    /////////////////////////
    // Types

    CoerceFunc,
    JsonFragment,
    JsonFragmentType,

    Result,
    checkResultErrors,

    LogDescription,
    TransactionDescription

} = require("@420integrated/abi");
```

License
-------

MIT License
