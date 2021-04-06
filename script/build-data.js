'use strict'

var fs = require('fs')
var gemoji = require('gemoji')
var nameToEmoji = require('gemoji/name-to-emoji')
var toJSON = require('plain-text-data-to-json')

var raw = toJSON(fs.readFileSync('faces.txt', 'utf8'))
var all = []
var unclassified = ['🤖']

var faces = Object.keys(raw)
  .sort()
  .map(function (name) {
    var number = Number(raw[name])
    var emoji = nameToEmoji[name]

    if (isNaN(number)) {
      console.log('Invalid valence for %s: %s', name, raw[name])
    }

    if (!emoji) {
      console.log('Invalid gemoji %s', name)
    }

    all.push(emoji)

    return {
      name: name,
      emoji: emoji,
      polarity: number
    }
  })

var index = -1

while (++index < gemoji.length) {
  if (gemoji[index].category !== 'people') {
    continue
  }

  if (!/\bface\b/.test(gemoji[index].description)) {
    continue
  }

  if (
    !all.includes(gemoji[index].emoji) &&
    !unclassified.includes(gemoji[index].emoji)
  ) {
    throw new Error(
      'Missing definition for ' +
        gemoji[index].emoji +
        ' (' +
        gemoji[index].description +
        ')'
    )
  }
}

fs.writeFileSync('index.json', JSON.stringify(faces, null, 2) + '\n')
