'use strict'

var notation = require('music.notation')
var operator = require('music.operator')

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
 * Get a gamut: create an array from a source. The source can be a string with items separated by
 * spaces, commas or bars (`|`), an array or an object.
 *
 * If the source is an array, it's returned as it. If its an object you get an
 * array with the object as the only element.
 *
 * This function does not perform any transformation to the items of the array.
 * This function __always__ return an array, even if its empty
 *
 * @name gamut
 * @function
 * @param {String|Array|Object} source - the source
 * @return {Array} the source converted to an array (never null)
 *
 * @example
 * gamut('c d e') // => [ 'c', 'd', 'e' ]
 * gamut('CMaj7 | Dm7 G7') // => [ 'CMaj7', 'Dm7', 'G7' ]
 * gamut('1, 2, 3') // => ['1', '2', '3']
 * gamut([1, 'a', 3]) // => [1, 'a', 3]
 * gamut(object) // => [ object ]
 * gamut(null) // => [ ]
 */
function gamut (source, fn) {
  return gamut.apply(fn || identity, source)
}

gamut.apply = _curry(function (fn, source) {
  var isGamut = isArray(source) && isArray(source[0])
  var g = isGamut ? source : gamut.split(source).map(notation.arr)
  var res = fn(g)
  return !isGamut && isArray(res[0]) ? res.map(notation.str) : res
})

gamut.map = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.map(fn) }, source)
})

gamut.filter = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.filter(fn) }, source)
})

gamut.split = function (source) {
  if (isArray(source)) return source
  else if (typeof source === 'string') return source.split(SEP)
  else if (source === null || typeof source === 'undefined') return []
  else return [ source ]
}

/**
 * Transpose a list of notes by an interval
 *
 * @name transpose
 * @function
 * @param {String|Array} interval - the interval to transpose
 * @param {String|Array|Array<Array>} source - the gamut
 * @return {Array<Integer>} the transposed notes
 */
gamut.transpose = function (interval, source) {
  var i = notation.arr(interval)
  if (!i) return []
  var isInterval = i.length === 3
  return gamut.map(function (p) {
    if (isInterval) return operator.add(i, p)
    else if (p.length === 3) return operator.add(p, i)
    else return null
  }, source)
}

/**
 * Get the distances (in intervals) of the notes from a tonic
 *
 * __Important__: al pitch classes are converted to octave 0 before calculating
 * the distances.
 *
 * @name distances
 * @function
 * @param {String|Array} tonic - the note to calculate the interval from
 * @param {String|Array|Array<Array>} source - the notes
 * @return {Array<String>} the intervals
 *
 * @example
 * gamut.distance('D2', 'D2 E2 F2') // => ['1P', '2M', '3m']
 * // pitch classes are octave 0
 * gamut.distance('C', 'C2') // => ['15P']
 * gamut.distance('C2', 'C') // => ['-15P']
 */
gamut.distances = function (tonic, source) {
  var src = gamut.split(source)
  tonic = tonic || src[0]
  var t = notation.arr(tonic)
  if (tonic && !t) return []
  return gamut.map(function (p) {
    return p ? operator.subtract(t, operator.setDefaultOctave(0, p)) : null
  }, src)
}

/**
 * Get ascending gamut: remove nulls, duplications and sort by pitch (freq)
 *
 * @name ascending
 * @function
 * @param {String|Array} gamut - the gamut
 * @return {Array} the ascending gamut
 *
 * @example
 * gamut.ascending('E e D c') // => ['C', 'D', 'E']
 */
gamut.ascending = gamut.apply(function (gamut) {
  var heights = gamut.sort(operator.compare).map(operator.height)
  return heights.reduce(function (uniq, value, index) {
    if (index === 0 || heights[index - 1] !== value) uniq.push(gamut[index])
    return uniq
  }, [])
})

module.exports = gamut
