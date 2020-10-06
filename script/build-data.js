'use strict'

var fs = require('fs')
var gemoji = require('gemoji')
var nameToEmoji = require('gemoji/name-to-emoji')
var toJSON = require('plain-text-data-to-json')

var faces = toJSON(fs.readFileSync('faces.txt', 'utf8'))
var all = []
var unclassified = ['🤖']

faces = Object.keys(faces)
  .sort()
  .map(function (name) {
    var number = Number(faces[name])
    var emoji = nameToEmoji[name]

    if (isNaN(number)) {
      console.log('Invalid valence for %s: %s', name, faces[name])
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

gemoji.forEach(function (info) {
  var emoji = info.emoji

  if (info.category !== 'people') {
    return
  }

  if (!/\bface\b/.test(info.description)) {
    return
  }

  if (!all.includes(emoji) && !unclassified.includes(emoji)) {
    throw new Error(
      'Missing definition for ' + emoji + ' (' + info.description + ')'
    )
  }
})

fs.writeFileSync('index.json', JSON.stringify(faces, null, 2) + '\n')
