-----

Documentation: [html](https://420integrated.com/wiki/)

-----

Display Logic and Input
=======================

Units
-----

### Decimal Count

### Named Units





Functions
---------

### Formatting

#### *fourtwentycoins* . *utils* . **commify**( value ) => *string*

Returns a string with value grouped by 3 digits, separated by `,`.


### Conversion

#### *fourtwentycoins* . *utils* . **formatUnits**( value [ , unit = "420coin" ] ) => *string*

Returns a string representation of *value* formatted with *unit* digits (if it is a number) or to the unit specified (if a string).


#### *fourtwentycoins* . *utils* . **formatFourtwentycoin**( value ) => *string*

The equivalent to calling `formatUnits(value, "420coin")`.


#### *fourtwentycoins* . *utils* . **parseUnits**( value [ , unit = "420coin" ] ) => *[BigNumber](/v5/api/utils/bignumber/)*

Returns a [BigNumber](/v5/api/utils/bignumber/) representation of *value*, parsed with *unit* digits (if it is a number) or from the unit specified (if a string).


#### *fourtwentycoins* . *utils* . **parseFourtwentycoin**( value ) => *[BigNumber](/v5/api/utils/bignumber/)*

The equivalent to calling `parseUnits(value, "420coin")`.


