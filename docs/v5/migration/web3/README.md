-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Migration: From Web3.js
=======================

Providers
---------

### Connecting to 420coin

```
// web3
var Web3 = require('web3');
var web3 = new Web3('http://localhost:6174');

// fourtwentycoins 
var fourtwentycoins = require('fourtwentycoins ');
const url = "http://127.0.0.1:6174";
const provider = new fourtwentycoins.providers.JsonRpcProvider(url);
```

### Connecting to 420coin: Metamask

```
// web3
const web3 = new Web3(Web3.givenProvider);

// fourtwentycoins 
const provider = new fourtwentycoins.providers.Web3Provider(window.fourtwenty);
```

Signers
-------

### Creating signer

```
// web3
const account = web3.fourtwenty.accounts.create();

// fourtwentycoins (create random new account)
const signer = fourtwentycoins.Wallet.createRandom();

// fourtwentycoins (connect to JSON-RPC accounts)
const signer = provider.getSigner();
```

### Signing a message

```
// web3 (using a private key)
signature = web3.fourtwenty.accounts.sign('Some data', privateKey)

// web3 (using a JSON-RPC account)
// @TODO

// fourtwentycoins 
signature = await signer.signMessage('Some data')
```

Contracts
---------

### Deploying a Contract

```
// web3
const contract = new web3.fourtwenty.Contract(abi);
contract.deploy({
   data: bytecode,
   arguments: ["my string"]
})
.send({
   from: "0x12598d2Fd88B420ED571beFDA8dD112624B5E730",
   smoke: 150000,
   smokePrice: "30000000000000"
}), function(error, transactionHash){ ... })
.then(function(newContract){
    console.log('new contract', newContract.options.address) 
});

// fourtwentycoins 
const signer = provider.getSigner();
const factory = new fourtwentycoins.ContractFactory(abi, bytecode, signer);
const contract = await factory.deploy("hello world");
console.log('contract address', contract.address);

// wait for contract creation transaction to be mined
await contract.deployTransaction.wait();
```

### Interacting with a Contract

```
// web3
const contract = new web3.fourtwenty.Contract(abi, contractAddress);
// read only query
contract.methods.getValue().call();
// state changing operation
contract.methods.changeValue(42).send({from: ....})
.on('receipt', function(){
    ...
});

// fourtwentycoins 
// pass a provider when initiating a contract for read only queries
const contract = new fourtwentycoins.Contract(contractAddress, abi, provider);
const value = await contract.getValue();


// pass a signer to create a contract instance for state changing operations
const contract = new fourtwentycoins.Contract(contractAddress, abi, signer);
const tx = await contract.changeValue(33);

// wait for the transaction to be mined
const receipt = await tx.wait();
```

### Overloaded Functions

```
// web3
message = await contract.methods.getMessage('nice').call();


// fourtwentycoins 
const abi = [
  "function getMessage(string) public view returns (string)",
  "function getMessage() public view returns (string)"
]
const contract = new fourtwentycoins.Contract(address, abi, signer);

// for ambiguous functions (two functions with the same
// name), the signature must also be specified
message = await contract['getMessage(string)']('nice');
```

Numbers
-------

### BigNumber

```
// web3
web3.utils.toBN('123456');

// fourtwentycoins (from a number; must be within safe range)
fourtwentycoins.BigNumber.from(123456)

// fourtwentycoins (from base-10 string)
fourtwentycoins.BigNumber.from("123456")

// fourtwentycoins (from hex string)
fourtwentycoins.BigNumber.from("0x1e240")
```

Utilities
---------

### Hash

```
// web3
web3.utils.sha3('hello world');
web3.utils.keccak256('hello world');

// fourtwentycoins (hash of a string)
fourtwentycoins.utils.id('hello world')

// fourtwentycoins (hash of binary data)
fourtwentycoins.utils.keccak256('0x4242')
```

