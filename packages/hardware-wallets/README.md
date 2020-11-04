Hardware Wallets
================

Thid is still very experimental.

I only have 1 ledger nano, and testing is done locally (CirlceCI doesn't have
ledgers plugged in ;)).

API
===

```
import { LedgerSigner } from "@420integrated/hardware-wallets";
const signer = new LedgerSigner(provider, type, path);
// By default:
//   - in node, type = "usb"
//   - path is the default 420coin path (i.e.  `m/44'/60'/0'/0/0`)
```

License
=======

All fourtwentycoins code is MIT License.

Each hardware wallet manufacturer may impose additional license
requirements so please check the related abstraction libraries
they provide.

All Firefly abstraction is also MIT Licensed.
