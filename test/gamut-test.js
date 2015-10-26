var vows = require('vows')
var assert = require('assert')
var gamut = require('../')

vows.describe('gamut').addBatch({
  'gamut main': function () {
    assert.deepEqual(gamut('c2 d#3 blah bb4 1P'), ['C2', 'D#3', null, 'Bb4', '1P'])
  },
  'gamut split': function () {
    assert.deepEqual(gamut.split('W |   X    Y  ,  Z '), ['W', 'X', 'Y', 'Z'])
    assert.deepEqual(gamut.split('  A '), ['A'])
    assert.deepEqual(gamut.split(['A', 'b']), ['A', 'b'])
    assert.deepEqual(gamut.split(32), [ 32 ])
    assert.deepEqual(gamut.split(), [])
    assert.deepEqual(gamut.split(null), [])
  },
  'gamut.apply': function () {
    var fn = function (g) { return g.concat([ [2, 1, 2, 0] ]) }
    assert.deepEqual(gamut.apply(fn, 'A'), ['A', 'E#2'])
    var addEsharp = gamut.apply(fn)
    assert.deepEqual(addEsharp('1, 2'), ['1P', '2M', 'E#2'])
    assert.deepEqual(addEsharp([ [1, 2] ]), [ [ 1, 2 ], [ 2, 1, 2, 0 ] ])
  },
  'gamut.map': {
    'convert back to strings': function () {
      var pc = function (p) { return [p[0], p[1]] }
      assert.deepEqual(gamut.map(pc, 'C4 E4 3 F#9'), [ 'C', 'E', 'E', 'F#' ])
      var pitchClasses = gamut.map(pc)
      assert.deepEqual(pitchClasses('C2 D3 G9'), [ 'C', 'D', 'G' ])
    },
    'do not convert result': function () {
      var fn = function (p) { return p[0] }
      assert.deepEqual(gamut.map(fn, 'C D E'), [0, 1, 2])
    }
  },
  'gamut.filter': function () {
    var isIntrvl = function (i) { return i.length === 3 }
    assert.deepEqual(gamut.filter(isIntrvl, '1 C 2m D3'), [ '1P', '2m' ])
    var intervals = gamut.filter(isIntrvl)
    assert.deepEqual(intervals('C2 D3 3 4#'), ['3M', '4A'])
  },
  'gamut.compact': function () {
    assert.deepEqual(gamut.compact('C blah D'), [ 'C', 'D' ])
    assert.deepEqual(gamut.compact(['f#', null, 'g']), [ 'F#', 'G' ])
    assert.deepEqual(gamut.compact([[0, 0], null, [1, 1]]), [ [ 0, 0 ], [ 1, 1 ] ])
  },
  'gamut.rotate': function () {
    assert.deepEqual(gamut.rotate(0, 'C D E'), ['C', 'D', 'E'])
    assert.deepEqual(gamut.rotate(1, 'C D E'), ['D', 'E', 'C'])
    assert.deepEqual(gamut.rotate(4, 'C D E'), ['D', 'E', 'C'])
    assert.deepEqual(gamut.rotate(-1, 'C D E'), ['E', 'C', 'D'])
    assert.deepEqual(gamut.rotate(-2, 'C D E'), ['D', 'E', 'C'])
    assert.deepEqual(gamut.rotate(-5, 'C D E'), ['D', 'E', 'C'])
  }
}).export(module)
