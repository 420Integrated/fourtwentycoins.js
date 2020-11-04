The Fourtwentycoins Project
==================

[![npm (tag)](https://img.shields.io/npm/v/fourtwentycoins )](https://www.npmjs.com/package/fourtwentycoins )
[![Node.js CI](https://github.com/420integrated/fourtwentycoins.js/workflows/Node.js%20CI/badge.svg?branch=fourtwentycoins-v5-beta)](https://github.com/420integrated/fourtwentycoins.js/actions?query=workflow%3A%22Node.js+CI%22)

A complete 420coin wallet implementation and utilities in JavaScript (and TypeScript).

**Features:**

- Keep your private keys in your client, **safe** and sound
- Import and export **JSON wallets** (G420, Parity and crowdsale)
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to 420coin nodes over [JSON-RPC](https://github.com/420integrated/go-420coin/wiki/wiki/JSON-RPC), [INFURA](https://infura.io), [Fourtwentyvm](https://fourtwentyvm.io), [Alchemy](https://alchemyapi.io) or [MetaMask](https://metamask.io)
- **ENS names** are first-class citizens; they can be used anywhere an 420coin addresses can be used
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your 420coin desires
- Extensive [documentation](https://420integrated.com/wiki/v5/)
- Large collection of **test cases** which are maintained and added to
- Fully **TypeScript** ready, with definition files and full TypeScript source
- **MIT License** (including ALL dependencies); completely open source to do with as you please


Keep Updated
------------

For the latest news and advisories, please follow the [@420integrated](https://twitter.com/fourtwentycoins project)
on Twitter (low-traffic, non-marketing, important information only) as well as watch this GitHub project.

For the latest changes, see the [CHANGELOG](https://github.com/420integrated/fourtwentycoins.js/blob/master/CHANGELOG.md).


Installing
----------

**node.js**

```
/home/ricmoo/some_project> npm install --save fourtwentycoins 
```

**browser (UMD)**

```
<script src="https://cdn.fourtwentycoins.io/lib/fourtwentycoins-5.0.umd.min.js" type="text/javascript">
</script>
```

**browser (ESM)**

```
<script type="module">
    import { fourtwentycoins } from "https://cdn.fourtwentycoins.io/lib/fourtwentycoins-5.0.umd.min.js";
</script>
```


Documentation
-------------

Browse the [documentation](https://420integrated.com/wiki/v5/) online:

- [Getting Started](https://420integrated.com/wiki/v5/getting-started/)
- [Full API Documentation](https://420integrated.com/wiki/v5/api/)
- [Various 420coin Articles](https://blog.ricmoo.com/)

Or browse the entire documentation as a [single page](https://420integrated.com/wiki/v5/single-page/) to make searching easier.


Ancillary Packages
------------------

These are a number of packages not included in the umbrella `fourtwentycoins ` npm package, and
additional packages are always being added. Often these packages are for specific
use-cases, so rather than adding them to the umbrella package, they are added as
ancillary packages, which can be included by those who need them, while not bloating
everyone else with packages they do not need.

We will keep a list of useful packages here.

- `@420integrated/experimental` ([documentation](https://420integrated.com/wiki))
- `@420integrated/cli` ([documentation](https://420integrated.com/wiki))
- `@420integrated/hardware-wallets` ([documentation](https://420integrated.com/wiki))


License
-------

MIT License (including **all** dependencies).

