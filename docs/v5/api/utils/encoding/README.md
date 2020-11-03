-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Encoding Utilities
==================

Base58
------

#### *fourtwentycoins* . *utils* . *base58* . **decode**( textData ) => *Uin8Array*

Return a typed Uint8Array representation of *textData* decoded using base-58 encoding.


#### *fourtwentycoins* . *utils* . *base58* . **encode**( aBytesLike ) => *string*

Return *aBytesLike* encoded as a string using the base-58 encoding.


Base64
------

#### *fourtwentycoins* . *utils* . *base64* . **decode**( textData ) => *Uin8Array*

Return a typed Uint8Array representation of *textData* decoded using base-64 encoding.


#### *fourtwentycoins* . *utils* . *base64* . **encode**( aBytesLike ) => *string*

Return *aBytesLike* encoded as a string using the base-64 encoding.


Recursive-Length Prefix
-----------------------

#### *fourtwentycoins* . *utils* . *RLP* . **encode**( dataObject ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Encode a structured Data Object into its RLP-encoded representation.

Each Data component may be an valid [BytesLike](/v5/api/utils/bytes/#BytesLike).


#### *fourtwentycoins* . *utils* . *RLP* . **decode**( aBytesLike ) => *[DataObject](/v5/api/utils/encoding/#rlp--dataobject)*

Decode an RLP-encoded *aBytesLike* into its structured Data Object.

All Data components will be returned as a [DataHexString](/v5/api/utils/bytes/#DataHexString).


### Data Object

#### **Examples**

- `"0x1234"` 
- `[ "0x1234", [ "0xdead", "0xbeef" ], [ ] ]` 




