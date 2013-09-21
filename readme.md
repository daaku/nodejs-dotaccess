dotaccess [![Build Status](https://secure.travis-ci.org/daaku/nodejs-dotaccess.png)](http://travis-ci.org/daaku/nodejs-dotaccess)
=========

A library to access objects using *dot notation strings*. For example:

```javascript
var dotaccess = require('dotaccess')
var obj = {
  answer: 42,
  deep: {
    trench: 43,
    'funky names': 44,
    'including a .': 45
  }
}

// prints 42
console.log(dotaccess.get(obj, 'answer'))

// prints 43
console.log(dotaccess.get(obj, 'deep.trench'))

// can use an array of part names also prints 43
console.log(dotaccess.get(obj, ['deep', 'trench']))

// prints 44, spaces are allowed
console.log(dotaccess.get(obj, 'deep.funky names'))

// overwrite existing values
dotaccess.set(obj, 'deep.funky names', 99, true)

// can also set stuff
dotaccess.set(obj, 'deep.an even funkier_name', 'green')
```
