const toRgb = require('hsl-to-rgb-for-reals')

const max = (val, n) => {
  return val > n ? n : val
}

const min = (val, n) => {
  return val < n ? n : val
}

const cycle = val => {
  // for safety:
  val = max(val, 1e7)
  val = min(val, -1e7)

  // cycle value:
  while (val < 0) {
    val += 360
  }

  while (val > 359) {
    val -= 360
  }

  return val
}

const hsl = (hue, saturation, luminosity) => {
  // resolve degrees to 0 - 359 range
  hue = cycle(hue)

  // enforce constraints
  saturation = min(max(saturation, 100), 0)
  luminosity = min(max(luminosity, 100), 0)

  // convert to 0 - 1 range used by hsl-to-rgb-for-reals
  saturation /= 100
  luminosity /= 100

  // let hsl-to-rgb-for-reals do the hard work
  const rgb = toRgb(hue, saturation, luminosity)

  // convert each value in the returned RGB array
  // to a 2 character hex value, join the array into
  // a string, prefixed with a hash
  return (
    '#' +
    rgb
      .map(n => {
        return (256 + n).toString(16).substr(-2)
      })
      .join('')
  )
}

module.exports = hsl

// node -p "require('./')(0,100,100)" - should output #ffffff
// node -p "require('./')(0,0,50)" - should output #808080
// node -p "require('./')(0,100,50)" - should output #ff0000
// node -p "require('./')(240,100,50)" - should output #0000ff
// node -p "require('./')(180,100,50)" - should output #00ffff
