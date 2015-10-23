# music.gamut

[![Build Status](https://travis-ci.org/danigb/music.gamut.svg?branch=master)](https://travis-ci.org/danigb/music.gamut)
[![Code Climate](https://codeclimate.com/github/danigb/music.gamut/badges/gpa.svg)](https://codeclimate.com/github/danigb/music.gamut)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://img.shields.io/npm/v/music.gamut.svg)](https://www.npmjs.com/package/music.gamut)
[![license](https://img.shields.io/npm/l/music.gamut.svg)](https://www.npmjs.com/package/music.gamut)
[![music.kit](https://img.shields.io/badge/music-kit-yellow.svg)](https://github.com/danigb/music.kit)

A music gamut is a collection of notes or intervals. This library has several functions that helps work with them in a functional way:

```js
var gamut = require('music.gamut')
gamut('c2 d#3 blah bb4 1P') // => ['C2', 'D#3', null, 'Bb4', '1P']
gamut.transpose('3M', 'C D E') // => ['E', 'F#', 'G#']
```

This is part of [music.kit](https://github.com/danigb/music.kit) library, a full library to work with musical abstractions. Since music.kit uses [array.notation](https://github.com/danigb/array-notation) to represent pitches, this library helps with the conversion.

## Install

__Not released yet. I will be available via npm__

Available via npm: `npm install --save music.gamut`. Use browserify, webpack or a similar tool to use it in your browser, or the music.kit distribution.

## Usage

You can read the [API documentation here](https://github.com/danigb/music.gamut/blob/master/API.md)

Here are some examples:

```js
gamut.transpose('2M', 'C D E')
gamut.distances('C', 'C D E') // => ['1P', '2M', '3M']
gamut.map(function (p) {
  // transform each note or interval
})
```

## License

MIT License
