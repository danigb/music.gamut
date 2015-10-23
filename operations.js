'use strict'

var op = require('music.operator')

// pitch to pitch classes
function pitchClasses (gamut) { return gamut.map(op.pitchClass) }

// simplify interval
function simplify (gamut) { return gamut.map(op.simplify) }

// return pitch heights: distance from C0 or interval semitones
function heights (gamut) { return gamut.map(op.semitones) }

function transpose (interval, gamut) {
  if (!interval) return []
  return gamut.map(function (p) {
    return p ? op.add(interval, p) : null
  })
}

// get distances from tonic to the rest of the notes
function distances (tonic, gamut) {
  var t = tonicOf(tonic, gamut)
  if (!t) return []
  t = op.setDefaultOctave(0, t)
  return gamut.map(function (p) {
    return p ? op.subtract(t, op.setDefaultOctave(0, p)) : null
  })
}

function tonicOf (tonic, gamut) {
  return tonic ? tonic : gamut[0]
}

// remove duplicated notes AND nulls
function uniq (gamut) {
  var semitones = heights(gamut)
  return gamut.reduce(function (uniq, current, currentIndex) {
    if (current) {
      var index = semitones.indexOf(semitones[currentIndex])
      if (index === currentIndex) uniq.push(current)
    }
    return uniq
  }, [])
}

function sort (gamut) {
  return gamut.sort(op.compare)
}

// get an interval set
function intervalSet (gamut) {
  return sort(uniq(simplify(distances(null, gamut))))
}

// get a pitch set
function pitchSet (gamut) {
  var tonic = gamut[0]
  return intervalSet(gamut).map()
  return transpose(op.pitchClass(gamut[0]), intervalSet(gamut))
}

function binarySet (gamut) {
  var number = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var semitones = heights(intervalSet(gamut))
  semitones.forEach(function (s) {
    number[s] = 1
  })
  return number.join('')
}

// pitch-array of 'C Db D Eb E F F# G Ab A Bb B'
var NOTES = [
  [ 0, 0 ], [ 1, -1 ], [ 1, 0 ], [ 2, -1 ],
  [ 2, 0 ], [ 3, 0 ], [ 3, 1 ], [ 4, 0 ],
  [ 5, -1 ], [ 5, 0 ], [ 6, -1 ], [ 6, 0 ] ]

function fromBinarySet (number) {
  if (/^1[01]{11}$/.test(number)) number = parseInt(number, 2)
  else if (typeof number !== 'number') return []

  var binary = ((number % 2048) + 2048).toString(2)
  var set = []
  for (var i = 0; i < 12; i++) {
    if (binary.charAt(i) === '1') set.push(NOTES[i])
  }
  return set
}

module.exports = {
  pitchClasses: pitchClasses,
  simplify: simplify,
  heights: heights,
  transpose: transpose,
  distances: distances,
  uniq: uniq,
  sort: sort,
  intervalSet: intervalSet,
  pitchSet: pitchSet,
  binarySet: binarySet,
  fromBinarySet: fromBinarySet
}
