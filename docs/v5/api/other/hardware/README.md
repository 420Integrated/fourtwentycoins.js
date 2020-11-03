-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Hardware Wallets
================

LedgerSigner
------------

```
import { LedgerSigner } from "@420integrated/hardware-wallets";
```

### API

#### **new ****LedgerSigner**( [ provider [ , type [ , path ] ] ] ) => *[LedgerSigner](/v5/api/other/hardware/#hw-ledger)*

Connects to a Ledger Hardware Wallet. The *type* if left unspecified is determined by the environment; in node the default is "hid" and in the browser "u2f" is the default. The default 420coin path is used if *path* is left unspecified.


