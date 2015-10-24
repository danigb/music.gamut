var vows = require('vows')
var assert = require('assert')
var gamut = require('../')

vows.describe('gamut').addBatch({
  'gamut main': function () {
    assert.deepEqual(gamut('c2 d#3 blah bb4 1P'), ['C2', 'D#3', null, 'Bb4', '1P'])
  },
  'gamut.apply': function () {
    var fn = function (g) { return g.concat([ [2, 1, 2, 0] ]) }
    assert.deepEqual(gamut.apply(fn, 'A'), ['A', 'E#2'])
    var addEsharp = gamut.apply(fn)
    assert.deepEqual(addEsharp('1, 2'), ['1P', '2M', 'E#2'])
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
  }
}).export(module)
