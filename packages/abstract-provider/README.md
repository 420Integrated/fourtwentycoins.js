Abstract Provider
=================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It is responsible for defining the common interface for a Provider, which in
fourtwentycoins differs quite substantially from Web3.js.

A Provider is an abstraction of non-account-based operations on a blockchain and
is generally not directly involved in signing transaction or data.

For signing, see the [Abstract Signer](https://www.npmjs.com/package/@420integrated/abstract-signer)
or [Wallet](https://www.npmjs.com/package/@420integrated/wallet) sub-modules.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/providers/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Provider,

    ForkEvent,
    BlockForkEvent,
    TransactionForkEvent,
    TransactionOrderForkEvent,

    // Types
    BlockTag,

    Block,
    BlockWithTransactions,

    TransactionRequest,
    TransactionResponse,
    TransactionReceipt,

    Log,
    EventFilter,

    Filter,
    FilterByBlockHash,

    EventType,
    Listener

} = require("@420integrated/abstract-provider");
```

License
-------

MIT License
