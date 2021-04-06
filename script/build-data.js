import fs from 'fs'
import {gemoji, nameToEmoji} from 'gemoji'
import {toJson} from 'plain-text-data-to-json'

/** @type {Object.<string, string>} */
var raw = toJson(fs.readFileSync('faces.txt', 'utf8'))
/** @type {Array.<string>} */
var all = []
var unclassified = new Set(['🤖'])

var faces = Object.keys(raw)
  .sort()
  .map(function (name) {
    var polarity = Number(raw[name])
    var emoji = nameToEmoji[name]

    if (Number.isNaN(polarity)) {
      console.log('Invalid valence for %s: %s', name, raw[name])
    }

    if (!emoji) {
      console.log('Invalid gemoji %s', name)
    }

    all.push(emoji)

    return {name, emoji, polarity}
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
    !unclassified.has(gemoji[index].emoji)
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

fs.writeFileSync(
  'index.js',
  'export var emojiEmotion = ' + JSON.stringify(faces, null, 2) + '\n'
)
