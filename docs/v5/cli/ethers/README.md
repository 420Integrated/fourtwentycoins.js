-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Sandbox Utility
===============

Help
----

```
Usage:
   fourtwentycoins [ COMMAND ] [ ARGS ] [ OPTIONS ]

COMMANDS (default: sandbox)
   sandbox                    Run a REPL VM environment with fourtwentycoins
   init FILENAME              Create a new JSON wallet
      [ --force ]                Overwrite any existing files
   fund TARGET                Fund TARGET with testnet fourtwenty
   info [ TARGET ... ]        Dump info for accounts, addresses and ENS names
   send TARGET FOURTWENTY     Send FOURTWENTY fourtwenty to TARGET form accounts[0]
      [ --allow-zero ]           Allow sending to the address zero
      [ --data DATA ]            Include data in the transaction
   sweep TARGET               Send all fourtwenty from accounts[0] to TARGET
   sign-message MESSAGE       Sign a MESSAGE with accounts[0]
      [ --hex ]                  The message content is hex encoded
   eval CODE                  Run CODE in a VM with fourtwentycoins
   run FILENAME               Run FILENAME in a VM with fourtwentycoins
   wait HASH                  Wait for a transaction HASH to be mined
   wrap-fourtwenty VALUE      Deposit VALUE into Wrapped fourtwenty (W420)
   unwrap-fourtwenty VALUE    Withdraw VALUE from Wrapped fourtwenty (W420)
   send-token TOKEN ADDRESS VALUE
                              Send VALUE tokens (at TOKEN) to ADDRESS
   compile FILENAME           Compiles a Solidity contract
      [ --no-optimize ]          Do not optimize the compiled output
      [ --warnings ]             Error on any warning
   deploy FILENAME            Compile and deploy a Solidity contract
      [ --no-optimize ]          Do not optimize the compiled output
      [ --contract NAME ]        Specify the contract to deploy

ACCOUNT OPTIONS
  --account FILENAME          Load from a file (JSON, RAW or mnemonic)
  --account RAW_KEY           Use a private key (insecure *)
  --account 'MNEMONIC'        Use a mnemonic (insecure *)
  --account -                 Use secure entry for a raw key or mnemonic
  --account-void ADDRESS      Use an address as a void signer
  --account-void ENS_NAME     Add the resolved address as a void signer
  --account-rpc ADDRESS       Add the address from a JSON-RPC provider
  --account-rpc INDEX         Add the index from a JSON-RPC provider
  --mnemonic-password         Prompt for a password for mnemonics
  --xxx-mnemonic-password     Prompt for a (experimental) hard password

PROVIDER OPTIONS (default: all + homestead)
  --alchemy                   Include Alchemy
  --fourtwentyvm                 Include Fourtwentyvm
  --infura                    Include INFURA
  --nodesmith                 Include nodesmith
  --rpc URL                   Include a custom JSON-RPC
  --offline                   Dump signed transactions (no send)
  --network NETWORK           Network to connect to (default: homestead)

TRANSACTION OPTIONS (default: query network)
  --smokePrice GMARLEY             Default smoke price for transactions(in marley)
  --smokeLimit SMOKE              Default smoke limit for transactions
  --nonce NONCE               Initial nonce for the first transaction
  --yes                       Always accept Siging and Sending

OTHER OPTIONS
  --wait                      Wait until transactions are mined
  --debug                     Show stack traces for errors
  --help                      Show this usage and exit
  --version                   Show this version and exit

(*) By including mnemonics or private keys on the command line they are
    possibly readable by other users on your system and may get stored in
    your bash history file. This is NOT recommended.
```

Examples
--------

```
/home/fourtwentycoins> fourtwentycoins init wallet.json
Creating a new JSON Wallet - wallet.json
Keep this password and file SAFE!! If lost or forgotten
it CANNOT be recovered, by ANYone, EVER.
Choose a password: ******
Confirm password: ******
Encrypting... 100%
New account address: 0x485bcC23ae2E5038ec7ec9b8DCB2A6A6291cC003
Saved:               wallet.json


# If you are planning to try out the Ropsten testnet...
/home/fourtwentycoins> fourtwentycoins --network ropsten fund 0x485bcC23ae2E5038ec7ec9b8DCB2A6A6291cC003
Transaction Hash: 0x8dc55b8f8dc8076acded97f9e3ed7d6162460c0221e2769806006b6d7d1156e0
```

```
# Sending 420coins
/home/ricmoo> fourtwentycoins --account wallet.json send ricmoo.firefly.fourtwenty 0.123
Password (wallet.json): ******
Decrypting... 100%
Transaction:
  To:         0x8ba1f109551bD432803012645Ac136ddd64DBA72
  From:       0xaB7C8803962c0f2F5BBBe3FA8bf41cd82AA1923C
  Value:      0.123 420coins
  Nonce:      96
  Data:       0x
  Smoke Limit:  21000
  Smoke Price:  1.2 gmarley
  Chain ID:   1
  Network:    homestead
Send Transaction? (y/N/a) y
Response:
  Hash:  0xc4adf8b379033d7ab679d199aa35e6ceee9a802ca5ab0656af067e911c4a589a


# Sending a token (SAI)
# NOTE: the contract address could be used instead but
#       popular token contract addresses are also managed
#       by fourtwentycoins
/home/ricmoo> fourtwentycoins --account wallet.json send-token sai.tokens.fourtwentycoins.fourtwenty ricmoo.firefly.fourtwenty 1.0
Sending Tokens:
  To:              0x8ba1f109551bD432803012645Ac136ddd64DBA72
  Token Contract:  0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359
  Value:           1.0
Password (wallet.json): ******
Decrypting... 100%
Transaction:
  To:         0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359
  From:       0xaB7C8803962c0f2F5BBBe3FA8bf41cd82AA1923C
  Value:      0.0 420coins
  Nonce:      95
  Data:       0xa9059cbb0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba720000000000000000000000000000000000000000000000000de0b6b3a7640000
  Smoke Limit:  37538
  Smoke Price:  1.0 gmarley
  Chain ID:   1
  Network:    homestead
Send Transaction? (y/N/a) y
Response:
  Hash:  0xd609ecb7e3b5e8d36fd781dffceede3975ece6774b6322ea56cf1e4d0a17e3a1
```

```
/home/fourtwentycoins> fourtwentycoins --account wallet.json sign-message 'Hello World'
Password (wallet.json): ******
Decrypting... 100%
Message:
  Message:        "Hello World"
  Message (hex):  0x48656c6c6f20576f726c64
Sign Message? (y/N/a) y
Signature
  Flat:   0xca3f0b32a22a5ab97ca8be7e4a36b1e81d565c6822465d769f4faa4aa24539fb122ee5649c8a37c9f5fc8446593674159e3a7b039997cd6ee697a24b787b1a161b
  r:      0xca3f0b32a22a5ab97ca8be7e4a36b1e81d565c6822465d769f4faa4aa24539fb
  s:      0x122ee5649c8a37c9f5fc8446593674159e3a7b039997cd6ee697a24b787b1a16
  vs:     0x122ee5649c8a37c9f5fc8446593674159e3a7b039997cd6ee697a24b787b1a16
  v:      27
  recid:  0
```

### Scripting

```
/home/fourtwentycoins> fourtwentycoins --network ropsten \
               --account wallet.json \
               eval \
               'accounts[0].getBalance().then(b => formatFourtwentycoin(b))'
3.141592653589793238
```

```
/home/fourtwentycoins> fourtwentycoins --network rinkeby \
               eval "provider.getBlockNumber()"
5761009
```

```
/home/fourtwentycoins> fourtwentycoins eval 'utils.Fragment.from(
               "function balanceOf(address) view returns (uint)"
              ).format("json")' | json_pp
{
   "inputs" : [
      {
         "type" : "address",
         "name" : "owner"
      }
   ],
   "type" : "function",
   "payble" : false,
   "stateMutability" : "view",
   "ouputs" : [
      {
         "type" : "uint256"
      }
   ],
   "name" : "balanceOf",
   "constant" : true
}
```

```
/home/ricmoo> fourtwentycoins eval 'id("Transfer(address,address,uint256")'
0xd99659a21de82e379975ce8df556f939a4ccb95e92144f38bb0dd35730ffcdd5
```

```
/home/ricmoo> fourtwentycoins eval 'Wallet.createRandom().mnemonic'
useful pond inch knock ritual matrix giggle attend dilemma convince coach amazing
```

### Using Mnemonics (with a password)

```
/home/ricmoo> fourtwentycoins --account mnemonic.txt --mnemonic-password
Password (mnemonic): ******
network: homestead (chainId: 1)
homestead> accounts[0].getAddress()
<Promise id=0 resolved>
'0x6d3F723EC1B73141AA4aC248c3ab34A5a1DAD776'
homestead>
```

### Using Mnemonics (with experimental memory-hard passwords)

```
/home/ricmoo> fourtwentycoins --account mnemonic.txt --xxx-mnemonic-password
Password (mnemonic; experimental - hard): ******
Decrypting... 100%
network: homestead (chainId: 1)
homestead> accounts[0].getAddress()
<Promise id=0 resolved>
'0x56FC8792cC17971C19bEC4Ced978beEA44711EeD'
homestead>
```

#### Note

This is still an experimental feature (hence the `xxx`).


