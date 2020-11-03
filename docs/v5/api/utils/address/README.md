-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Addresses
=========

Address Formats
---------------

### Address

### ICAP Address

Converting and Verifying
------------------------

#### *fourtwentycoins* . *utils* . **getAddress**( address ) => *string< [Address](/v5/api/utils/address/#address) >*

Returns *address* as a Checksum Address.

If *address* is an invalid 40-nibble [HexString](/v5/api/utils/bytes/#HexString) or if it contains mixed case and the checksum is invalid, an InvalidArgument Error is thrown.

The value of *address* may be any supported address format.


#### *fourtwentycoins* . *utils* . **getIcapAddress**( address ) => *string< [IcapAddress](/v5/api/utils/address/#address-icap) >*

Returns *address* as an [ICAP address](https://github.com/420integrated/go-420coin/wiki/wiki/Inter-exchange-Client-Address-Protocol-%28ICAP%29). Supports the same restrictions as [utils.getAddress](/v5/api/utils/address/#utils-getAddress).


#### *fourtwentycoins* . *utils* . **isAddress**( address ) => *boolean*

Returns true if *address* is valid (in any supported format).


Derivation
----------

#### *fourtwentycoins* . *utils* . **computeAddress**( publicOrPrivateKey ) => *string< [Address](/v5/api/utils/address/#address) >*

Returns the address for *publicOrPrivateKey*. A public key may be compressed or uncompressed, and a private key will be converted automatically to a public key for the derivation.


#### *fourtwentycoins* . *utils* . **recoverAddress**( digest , signature ) => *string< [Address](/v5/api/utils/address/#address) >*

Use [ECDSA Public Key Recovery](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Public_key_recovery) to determine the address that signed *digest* to which generated *signature*.


Contracts Addresses
-------------------

#### *fourtwentycoins* . *utils* . **getContractAddress**( transaction ) => *string< [Address](/v5/api/utils/address/#address) >*

Returns the contract address that would result if *transaction* was used to deploy a contract.


#### *fourtwentycoins* . *utils* . **getCreate2Address**( from , salt , initCodeHash ) => *string< [Address](/v5/api/utils/address/#address) >*

Returns the contract address that would result from the given [CREATE2](x/EIPS/eip-1014) call.


