# hsl-to-hex

Conver HSL colors to RGB colors in hex format

## Install

```sh
npm install --save @jtgreene/hsl-to-hex
```

## API

```
require('hsl-to-hex) -> Function
hsl(hue, saturation, luminosity)` => String
```

## Example

```js
var hsl = require('hsl-to-hex')
var hue = 133
var saturation = 40
var luminosity = 60
var hex = hsl(hue, saturation, luminosity)
console.log(hex) // #70c282
```

## Liscense

ISC
