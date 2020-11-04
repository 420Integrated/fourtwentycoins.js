Property Utilities
==================

This sub-module is part of the [fourtwentycoins project](https://github.com/420integrated/fourtwentycoins.js).

It contains several useful utility methods for managing simple objects with
defined properties.

For more information, see the [documentation](https://420integrated.com/wiki/v5/api/utils/properties/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/fourtwentycoins ),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    defineReadOnly,

    getStatic,

    resolveProperties,
    checkProperties,

    shallowCopy,
    deepCopy,

    Description,

    // Types

    Deferrable

} = require("@420integrated/properties");
```


License
-------

MIT License
