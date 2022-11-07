import fs from 'node:fs'
import {gemoji, nameToEmoji} from 'gemoji'
import {toJson} from 'plain-text-data-to-json'

/** @type {Object.<string, string>} */
const raw = toJson(fs.readFileSync('faces.txt', 'utf8'))
/** @type {Array.<string>} */
const all = []
const unclassified = new Set(['🤖'])

const faces = Object.keys(raw)
  .sort()
  .map(function (name) {
    const polarity = Number(raw[name])
    const emoji = nameToEmoji[name]

    if (Number.isNaN(polarity)) {
      console.log('Invalid valence for %s: %s', name, raw[name])
    }

    if (!emoji) {
      console.log('Invalid gemoji %s', name)
    }

    all.push(emoji)

    return {name, emoji, polarity}
  })

let index = -1

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
  'export const emojiEmotion = ' + JSON.stringify(faces, null, 2) + '\n'
)
