import fs from 'node:fs/promises'
import {gemoji, nameToEmoji} from 'gemoji'
import {toJson} from 'plain-text-data-to-json'

/** @type {Record<string, string>} */
const raw = toJson(String(await fs.readFile('faces.txt')))
/** @type {Array<string>} */
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

await fs.writeFile(
  'index.js',
  '/**\n * @typedef Info\n *    Emoji rated for valence.\n * @property {string} name\n *    Name of emoji, according to `wooorm/gemoji`.\n * @property {string} emoji\n *    Unicode emoji.\n * @property {number} polarity\n *    Integer between minus five (negative) and plus five (positive).\n */\n\n/**\n * List of emoji rated for valence.\n *\n * @type {Array<Info>}\n */\nexport const emojiEmotion = ' +
    JSON.stringify(faces, null, 2) +
    '\n'
)
