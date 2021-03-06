-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Transactions
============

Types
-----

### UnsignedTransaction

#### *unsignedTransaction* . **to** => *string< [Address](/v5/api/utils/address/#address) >*

The addres this transaction is to.


#### *unsignedTransaction* . **nonce** => *number*

The nonce of this transaction.


#### *unsignedTransaction* . **smokeLimit** => *[BigNumberish](/v5/api/utils/bignumber/#BigNumberish)*

The smoke limit for this transaction.


#### *unsignedTransaction* . **smokePrice** => *[BigNumberish](/v5/api/utils/bignumber/#BigNumberish)*

The smoke price for this transaction.


#### *unsignedTransaction* . **data** => *[BytesLike](/v5/api/utils/bytes/#BytesLike)*

The data for this transaction.


#### *unsignedTransaction* . **value** => *[BigNumberish](/v5/api/utils/bignumber/#BigNumberish)*

The value (in marley) for this transaction.


#### *unsignedTransaction* . **chainId** => *number*

The chain ID for this transaction. If the chain ID is 0 or null, then [EIP-155](x/EIPS/eip-155) is disabled and legacy signing is used, unless overridden in a signature.


### Transaction

#### *transaction* . **hash** => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString)< 32 > >*

The transaction hash, which can be used as an identifier for *transaction*. This is the keccak256 of the serialized RLP encoded representation of *transaction*.


#### *unsignedTransaction* . **to** => *string< [Address](/v5/api/utils/address/#address) >*

The address *transaction* is to.


#### *transaction* . **from** => *string< [Address](/v5/api/utils/address/#address) >*

The address *transaction* is from.


#### *transaction* . **nonce** => *number*

The nonce for *transaction*. Each transaction sent to the network from an account includes this, which ensures the order and non-replayability of a transaction. This must be equal to the current number of transactions ever sent to the network by the **from** address.


#### *transaction* . **smokeLimit** => *[BigNumber](/v5/api/utils/bignumber/)*

The smoke limit for *transaction*. An account must have enough 420coins to cover the smoke (at the specified **smokePrice**). Any unused smoke is refunded at the end of the transaction, and if there is insufficient smoke to complete execution, the effects of the trasaction are reverted, but the smoke is **fully consumed** and an out-of-smoke error occurs.


#### *transaction* . **smokePrice** => *[BigNumber](/v5/api/utils/bignumber/)*

The price (in marley) per unit of smoke for *transaction*.


#### *transaction* . **data** => *[BytesLike](/v5/api/utils/bytes/#BytesLike)*

The data for *transaction*. In a contract this is the call data.


#### *transaction* . **value** => *[BigNumber](/v5/api/utils/bignumber/)*

The value (in marley) for *transaction*.


#### *transaction* . **chainId** => *number*

The chain ID for *transaction*. This is used as part of [EIP-155](x/EIPS/eip-155) to prevent replay attacks on different networks.

For example, if a transaction was made on ropsten with an account also used on homestead, it would be possible for a transaction signed on ropsten to be executed on homestead, which is likely unintended.

There are situations where replay may be desired, however these are very rare and it is almost always recommended to specify the chain ID.


#### *transaction* . **r** => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString)< 32 > >*

The r portion of the elliptic curve signatures for *transaction*. This is more accurately, the x coordinate of the point r (from which the y can be computed, along with v).


#### *transaction* . **s** => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString)< 32 > >*

The s portion of the elliptic curve signatures for *transaction*.


#### *transaction* . **v** => *number*

The v portion of the elliptic curve signatures for *transaction*. This is used to refine which of the two possible points a given x-coordinate can have, and in [EIP-155](x/EIPS/eip-155) is additionally used to encode the chain ID into the serialized transaction.


Functions
---------

#### *fourtwentycoins* . *utils* . **parseTransaction**( aBytesLike ) => *[Transaction](/v5/api/utils/transactions/#Transaction)*

Parses the transaction properties from a serialized transactions.


#### *fourtwentycoins* . *utils* . **serializeTransaction**( tx [ , signature ] ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Computes the serialized *transaction*, optionally serialized with the a *signature*. If *signature* is not present, the unsigned serialized transaction is returned, which can be used to compute the hash necessary to sign.

This function uses [EIP-155](x/EIPS/eip-155) if a chainId is provided, otherwise legacy serialization is used. It is **highly** recommended to always specify a *chainId*.

If *signature* includes a chain ID (explicitly or implicitly by using an [EIP-155](x/EIPS/eip-155) `v` or `_vs`) it will be used to compute the chain ID.

If there is a mismatch between the chain ID of *transaction* and *signature* an error is thrown.


