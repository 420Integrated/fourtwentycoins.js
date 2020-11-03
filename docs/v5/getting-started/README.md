-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Getting Started
===============

Installing
----------

```
/home/ricmoo> npm install --save fourtwentycoins 
```

Importing
---------

### Node.js

```
const { fourtwentycoins } = require("fourtwentycoins");
```

```
import { fourtwentycoins } from "fourtwentycoins";
```

### Web Browser

```
<script type="module">
    import { fourtwentycoins } from "https://cdn.fourtwentycoins.io/lib/fourtwentycoins-5.0.esm.min.js";
    // Your code here...
</script>
```

```
<script src="https://cdn.fourtwentycoins.io/lib/fourtwentycoins-5.0.umd.min.js"
        type="application/javascipt"></script>
```

Common Terminology
------------------

Common Terms



Connecting to 420coin: Metamask
--------------------------------

```
// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.fourtwenty into each page
const provider = new fourtwentycoins.providers.Web3Provider(window.fourtwenty)

// The Metamask plugin also allows signing transactions to
// send 420coins and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
```

Connecting to 420coin: RPC
---------------------------

```
// If you don't specify a //url//, Fourtwentycoins connects to the default 
// (i.e. ``http:/\/localhost:6174``)
const provider = new fourtwentycoins.providers.JsonRpcProvider();

// The provider also allows signing transactions to
// send 420coins and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()
```

### Querying the Blockchain

```javascript
// Look up the current block number
provider.getBlockNumber()
// { Promise: 10819010 }

// Get the balance of an account (by address or ENS name, if supported by network)
balance = await provider.getBalance("fourtwentycoins.fourtwenty")
// { BigNumber: "2337132817842795605" }

// Often you need to format the output to something more user-friendly,
// such as in 420coins (instead of marley)
fourtwentycoins.utils.formatFourtwentycoin(balance)
// '2.337132817842795605'

// If a user enters a string in an input field, you may need
// to convert it from 420coins (as a string) to marley (as a BigNumber)
fourtwentycoins.utils.parseFourtwentycoin("1.0")
// { BigNumber: "1000000000000000000" }
```

### Writing to the Blockchain

```
// Send 1 420coins to an ens name.
const tx = signer.sendTransaction({
    to: "ricmoo.firefly.fourtwenty",
    value: fourtwentycoins.utils.parseFourtwentycoin("1.0")
});
```

Contracts
---------

```javascript
// You can also use an ENS name for the contract address
const daiAddress = "dai.tokens.fourtwentycoins.fourtwenty";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// The Contract object
const daiContract = new fourtwentycoins.Contract(daiAddress, daiAbi, provider);
```

### Read-Only Methods

```javascript
// Get the ERC-20 token name
daiContract.name()
// { Promise: 'Dai Stablecoin' }

// Get the ERC-20 token synbol (for tickers and UIs)
daiContract.symbol()
// { Promise: 'DAI' }

// Get the balance of an address
balance = await daiContract.balanceOf("ricmoo.firefly.fourtwenty")
// { BigNumber: "11386855832278858351495" }

// Format the DAI for displaying to the user
fourtwentycoins.utils.formatUnits(balance, 18)
// '11386.855832278858351495'
```

### State Changing Methods

```
// The DAI Contract is currently connected to the Provider,
// which is read-only. You need to connect to a Signer, so
// that you can pay to send state-changing transactions.
const daiWithSigner = contract.connect(signer);

// Each DAI has 18 decimal places
const dai = fourtwentycoins.utils.parseUnits("1.0", 18);

// Send 1 DAI to "ricmoo.firefly.fourtwenty"
tx = daiWithSigner.transfer("ricmoo.firefly.fourtwenty", dai);
```

### Listening to Events

```javascript
// Receive an event when ANY transfer occurs
daiContract.on("Transfer", (from, to, amount, event) => {
    console.log(`${ from } sent ${ formatFourtwentycoin(amount) } to ${ to}`);
    // The event object contains the verbatim log data, the
    // EventFragment and functions to fetch the block,
    // transaction and receipt and event functions
});

// A filter for when a specific address receives tokens
myAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
filter = daiContract.filters.Transfer(null, myAddress)
// {
//   address: 'dai.tokens.fourtwentycoins.fourtwenty',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Receive an event when that filter occurs
daiContract.on(filter, (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${ formatFourtwentycoin(amount) } from ${ from }.`);
});
```

### Query Historic Events

```javascript
// Get the address of the Signer
myAddress = await signer.getAddress()
// '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

// Filter for all token transfers to me
filterFrom = daiContract.filters.Transfer(myAddress, null);
// {
//   address: 'dai.tokens.fourtwentycoins.fourtwenty',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Filter for all token transfers from me
filterTo = daiContract.filters.Transfer(null, myAddress);
// {
//   address: 'dai.tokens.fourtwentycoins.fourtwenty',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// List all transfers sent from me a specific block range
daiContract.queryFilter(filterFrom, 9843470, 9843480)
// { Promise: [
//   {
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     args: [
//       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//       '0x8B3765eDA5207fB21690874B722ae276B96260E0',
//       { BigNumber: "4750000000000000000" }
//     ],
//     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
//     blockNumber: 9843476,
//     data: '0x00000000000000000000000000000000000000000000000041eb63d55b1b0000',
//     decode: [Function],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function],
//     getTransaction: [Function],
//     getTransactionReceipt: [Function],
//     logIndex: 69,
//     removeListener: [Function],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
//       '0x0000000000000000000000008b3765eda5207fb21690874b722ae276b96260e0'
//     ],
//     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
//     transactionIndex: 81
//   },
//   {
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     args: [
//       '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
//       '0x00De4B13153673BCAE2616b67bf822500d325Fc3',
//       { BigNumber: "250000000000000000" }
//     ],
//     blockHash: '0x8462eb2fbcef5aa4861266f59ad5f47b9aa6525d767d713920fdbdfb6b0c0b78',
//     blockNumber: 9843476,
//     data: '0x00000000000000000000000000000000000000000000000003782dace9d90000',
//     decode: [Function],
//     event: 'Transfer',
//     eventSignature: 'Transfer(address,address,uint256)',
//     getBlock: [Function],
//     getTransaction: [Function],
//     getTransactionReceipt: [Function],
//     logIndex: 70,
//     removeListener: [Function],
//     removed: false,
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72',
//       '0x00000000000000000000000000de4b13153673bcae2616b67bf822500d325fc3'
//     ],
//     transactionHash: '0x1be23554545030e1ce47391a41098a46ff426382ed740db62d63d7676ff6fcf1',
//     transactionIndex: 81
//   }
// ] }

//
// The following have had the results omitted due to the
// number of entries; but they provide some useful examples
//

// List all transfers sent in the last 10,000 blocks
daiContract.queryFilter(filterFrom, -10000)

// List all transfers ever sent to me
daiContract.queryFilter(filterTo)
```

Signing Messages
----------------

```javascript
// To sign a simple string, which are used for
// logging into a service, such as CryptoKitties,
// pass the string in.
signature = await signer.signMessage("Hello World");
// '0x94fac815fc18f295c4860128d8960dfdb1d88acf891a48e345368f3f4d52c95e59d0f8b35d05d554905a39c63c11b66f61abf0211fcaba36bef5dfaf1ea5f1331c'

//
// A common case is also signing a hash, which is 32
// bytes. It is important to note, that to sign binary
// data it MUST be an Array (or TypedArray)
//

// This string is 66 characters long
message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

// This array representation is 32 bytes long
messageBytes = fourtwentycoins.utils.arrayify(message);
// Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

// To sign a hash, you most often want to sign the bytes
signature = await signer.signMessage(messageBytes)
// '0xa77f9018a3ad3078056d529d5ccaca8796cdb5bc84e799d13b63a53646ab73f87f0895df7bbe2ee6016c95eb78a2e77013ab8f8d4855143d3567932cb5331e881c'
```

