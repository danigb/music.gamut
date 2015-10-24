'use strict'

var notation = require('music.notation')

var isArray = Array.isArray
var identity = function (e) { return e }
// simple curryfication for 2 args function
function _curry (fn) {
  return function (a, b) {
    return arguments.length === 1 ? function (b) { return fn(a, b) } : fn(a, b)
  }
}
// separator pattern to convert a list string to an array
var SEP = /\s*\|\s*|\s*,\s*|\s+/

/**
 * Get a gamut: create an array of notes or intervals from a source.
 * The source can be a string with items separated by
 * spaces, commas or bars (`|`), an array or an object.
 *
 * @name gamut
 * @function
 * @param {String|Array|Object} source - the source
 * @param {Function} transform - (Optional) a function that transforms the gamut
 * @return {Array} the source converted to an array (never null)
 *
 * @example
 * gamut('cb d3 e') // => [ 'Cb', 'D3', 'E' ]
 */
function gamut (source, fn) {
  return gamut.apply(fn || identity, source)
}

/**
 * Apply a function to a gamut.
 *
 * The interesting part is that the callback function will receive always an
 * array with the pitches in array-notation. `gamut.apply` will do the conversion
 * to array-notation and back to strings.
 *
 * @param {Function} fn - the function to apply
 * @param {String|Array} source - the source of the gamut
 * @return {Array} the gamut after apply the fn
 *
 * @example
 * var addStep = function(p) { return [p[0] + 1, p[1], p[2]] }
 * gamut.apply(addStep, 'C D E') // => ['D', 'E', 'F']
 */
gamut.apply = _curry(function (fn, source) {
  var isGamut = isArray(source) && isArray(source[0])
  var g = isGamut ? source : gamut.split(source).map(notation.arr)
  var res = fn(g)
  return !isGamut && isArray(res[0]) ? res.map(notation.str) : res
})

/**
 * Map a function to each element of the gamut.
 *
 * The callback function will receive the elements in array-notation
 *
 * @param {Function} fn - the callback function
 * @param {String|Array} source - the gamut source
 * @return {Array} the gamut after apply the function to each element
 */
gamut.map = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.map(fn) }, source)
})

/**
 * Filter the elements of a gamut
 *
 * The filter function will receive the elements in array-notation
 *
 * @name filter
 * @function
 * @param {Function} filter - the filter function
 * @param {String|Array} source - the gamut source
 * @return {Array} the gamut after filter the elements
 */
gamut.filter = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.filter(fn) }, source)
})

/**
 * Convert a source to an array
 *
 * The source can be an array (it will return it without modification), a
 * string with elements separated by spaces, commas or bars (`|`) or a single
 * element (it will be wrapped inside an array)
 *
 * This function __does not perform any transformation__ of the array elements.
 * and __it always return an array, even if its empty__.
 *
 * @name toArray
 * @function
 * @param {String|Array} source - the source
 * @return {Array} the source as array
 */
gamut.split = function (source) {
  if (isArray(source)) return source
  else if (typeof source === 'string') return source.trim().split(SEP)
  else if (source === null || typeof source === 'undefined') return []
  else return [ source ]
}

module.exports = gamut
