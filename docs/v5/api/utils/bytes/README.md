-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Byte Manipulation
=================

Types
-----

### Bytes

### BytesLike

### DataHexString

### HexString

### Signature

### Raw Signature

### SignatureLike

Inspection
----------

#### *fourtwentycoins* . *utils* . **isBytes**( object ) => *boolean*

Returns true if and only if *object* is a valid [Bytes](/v5/api/utils/bytes/#Bytes).


#### *fourtwentycoins* . *utils* . **isBytesLike**( object ) => *boolean*

Returns true if and only if *object* is a [Bytes](/v5/api/utils/bytes/#Bytes) or [DataHexString](/v5/api/utils/bytes/#DataHexString).


#### *fourtwentycoins* . *utils* . **isHexString**( object , [ length ] ) => *boolean*

Returns true if and only if *object* is a valid hex string. If *length* is specified and *object* is not a valid [DataHexString](/v5/api/utils/bytes/#DataHexString) of *length* bytes, an InvalidArgument error is thrown.


Converting between Arrays and Hexstrings
----------------------------------------

#### *fourtwentycoins* . *utils* . **arrayify**( DataHexStringOrArrayish [ , options ] ) => *Uint8Array*

Converts *DataHexStringOrArrayish* to a Uint8Array.


#### *fourtwentycoins* . *utils* . **hexlify**( hexstringOrArrayish ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Converts *hexstringOrArrayish* to a [DataHexString](/v5/api/utils/bytes/#DataHexString).


#### *fourtwentycoins* . *utils* . **hexValue**( aBigNumberish ) => *string< [HexString](/v5/api/utils/bytes/#HexString) >*

Converts *aBigNumberish* to a [HexString](/v5/api/utils/bytes/#HexString), with no *unnecessary* leading zeros.


```javascript
// Convert a hexstring to a Uint8Array
arrayify("0x1234")
// Uint8Array [ 18, 52 ]

// Convert an Array to a hexstring
hexlify([1, 2, 3, 4])
// '0x01020304'

// Convert an Object to a hexstring
hexlify({ length: 2, "0": 1, "1": 2 })
// '0x0102'

// Convert an Array to a hexstring
hexlify([ 1 ])
// '0x01'

// Convert a number to a stripped hex value
hexValue(1)
// '0x1'

// Convert an Array to a stripped hex value
hexValue([ 1, 2 ])
// '0x102'
```

Array Manipulation
------------------

#### *fourtwentycoins* . *utils* . **concat**( arrayOfBytesLike ) => *Uint8Array*

Concatenates all the [BytesLike](/v5/api/utils/bytes/#BytesLike) in *arrayOfBytesLike* into a single Uint8Array.


#### *fourtwentycoins* . *utils* . **stripZeros**( aBytesLike ) => *Uint8Array*

Returns a Uint8Array with all leading `0` bytes of *aBtyesLike* removed.


#### *fourtwentycoins* . *utils* . **zeroPad**( aBytesLike , length ) => *Uint8Array*

Retutns a Uint8Array of the data in *aBytesLike* with `0` bytes prepended to *length* bytes long.

If *aBytesLike* is already longer than *length* bytes long, an InvalidArgument error will be thrown.


Hexstring Manipulation
----------------------

#### *fourtwentycoins* . *utils* . **hexConcat**( arrayOfBytesLike ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Concatenates all the [BytesLike](/v5/api/utils/bytes/#BytesLike) in *arrayOfBytesLike* into a single [DataHexString](/v5/api/utils/bytes/#DataHexString)


#### *fourtwentycoins* . *utils* . **hexDataLength**( aBytesLike ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Returns the length (in bytes) of *aBytesLike*.


#### *fourtwentycoins* . *utils* . **hexDataSlice**( aBytesLike , offset [ , endOffset ] ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Returns a [DataHexString](/v5/api/utils/bytes/#DataHexString) representation of a slice of *aBytesLike*, from *offset* (in bytes) to *endOffset* (in bytes). If *endOffset* is omitted, the length of *aBytesLike* is used.


#### *fourtwentycoins* . *utils* . **hexStripZeros**( aBytesLike ) => *string< [HexString](/v5/api/utils/bytes/#HexString) >*

Returns a [HexString](/v5/api/utils/bytes/#HexString) representation of *aBytesLike* with all leading zeros removed.


#### *fourtwentycoins* . *utils* . **hexZeroPad**( aBytesLike , length ) => *string< [DataHexString](/v5/api/utils/bytes/#DataHexString) >*

Returns a [DataHexString](/v5/api/utils/bytes/#DataHexString) representation of *aBytesLike* padded to *length* bytes.

If *aBytesLike* is already longer than *length* bytes long, an InvalidArgument error will be thrown.


Signature Conversion
--------------------

#### *fourtwentycoins* . *utils* . **joinSignature**( aSignatureLike ) => *string< [RawSignature](/v5/api/utils/bytes/#signature-raw) >*

Return the raw-format of *aSignaturelike*, which is 65 bytes (130 nibbles) long, concatenating the **r**, **s** and (normalized) **v** of a Signature.


#### *fourtwentycoins* . *utils* . **splitSignature**( aSignatureLikeOrBytesLike ) => *[Signature](/v5/api/utils/bytes/#Signature)*

Return the full expanded-format of *aSignaturelike* or a raw-format [DataHexString](/v5/api/utils/bytes/#DataHexString). Any missing properties will be computed.


Random Bytes
------------

#### *fourtwentycoins* . *utils* . **randomBytes**( length ) => *Uint8Array*

Return a new Uint8Array of *length* random bytes.


#### *fourtwentycoins* . *utils* . **shuffled**( array ) => *Array< any >*

Return a copy of *array* shuffled using [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).


```javascript
utils.randomBytes(8)
// Uint8Array [ 98, 93, 74, 126, 111, 146, 146, 3 ]

const data = [ 1, 2, 3, 4, 5, 6, 7 ];

// Returns a new Array
utils.shuffled(data);
// [
//   5,
//   2,
//   6,
//   1,
//   4,
//   7,
//   3
// ]

// The Original is unscathed...
data
// [
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7
// ]
```

