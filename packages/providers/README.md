420coin Providers
==================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains common Provider classes, utility functions for dealing with providers
and re-exports many of the classes and types needed implement a custom Provider.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/providers/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Provider,
    BaseProvider,

    JsonRpcProvider,
    StaticJsonRpcProvider,
    UrlJsonRpcProvider,

    FallbackProvider,

    AlchemyProvider,
    CloudflareProvider,
    FourtwentyvmProvider,
    InfuraProvider,
    NodesmithProvider,

    IpcProvider,

    Web3Provider,

    WebSocketProvider,

    JsonRpcSigner,

    getDefaultProvider,

    getNetwork,

    Formatter,

    // Types

    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,

    Listener,

    ExternalProvider,

    Block,
    BlockTag,
    EventType,
    Filter,
    Log,

    JsonRpcFetchFunc,

    Network,
    Networkish

} = require("@420integrated/providers");
```


License
-------

MIT License
