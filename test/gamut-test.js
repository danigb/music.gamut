var vows = require('vows')
var assert = require('assert')
var gamut = require('../')

vows.describe('gamut').addBatch({
  'gamut.apply': function () {
    var fn = function (g) { return g.concat([ [2, 1, 2, 0] ]) }
    assert.deepEqual(gamut.apply(fn, 'A'), ['A', 'E#2'])
    var addEsharp = gamut.apply(fn)
    assert.deepEqual(addEsharp('1, 2'), ['1P', '2M', 'E#2'])
  },
  'gamut.map': function () {
    var pc = function (p) { return [p[0], p[1]] }
    assert.deepEqual(gamut.map(pc, 'C4 E4 3 F#9'), [ 'C', 'E', 'E', 'F#' ])
    var pitchClasses = gamut.map(pc)
    assert.deepEqual(pitchClasses('C2 D3 G9'), [ 'C', 'D', 'G' ])
  },
  'gamut.filter': function () {
    var isIntrvl = function (i) { return i.length === 3 }
    assert.deepEqual(gamut.filter(isIntrvl, '1 C 2m D3'), [ '1P', '2m' ])
    var intervals = gamut.filter(isIntrvl)
    assert.deepEqual(intervals('C2 D3 3 4#'), ['3M', '4A'])
  },
  'gamut.intervals': function () {
    assert.deepEqual(gamut.intervals('C D2 3 blah 4'), ['3M', '4P'])
  },
  'gamut.pitches': function () {
    assert.deepEqual(gamut.intervals('C D2 3 blah 4'), ['C', 'D2'])
  },
  'gamut.transpose': function () {
    assert.deepEqual(gamut.transpose('2M', 'C D E'), ['D', 'E', 'F#'])
    assert.deepEqual(gamut.transpose('2M', 'C2 D3 E4'), ['D2', 'E3', 'F#4'])
    assert.deepEqual(gamut.transpose('C', '1 2 3'), [ 'C', 'D', 'E' ])
    assert.deepEqual(gamut.transpose('C2', '1 2 3'), [ 'C2', 'D2', 'E2' ])
    assert.deepEqual(gamut.transpose('2', '1 2 3'), [ '2M', '3M', '4A' ])
  }
}).export(module)