import assert from 'node:assert/strict'
import {zone} from 'mdast-zone'
import {u} from 'unist-builder'
// @ts-expect-error untyped.
import sort from 'alphanum-sort/lib/compare.js'
import {gemoji, emojiToName} from 'gemoji'
import {emojiEmotion} from '../index.js'

export default function buildSupport() {
  return transformer
}

/**
 * @param {import('mdast').Root} tree
 */
function transformer(tree) {
  zone(tree, 'support', function (start, _, end) {
    return [start, table(), end]
  })
}

/**
 * @returns {import('mdast').Table}
 */
function table() {
  const head = u('tableRow', [cell('Emoji'), cell('Name(s)'), cell('Polarity')])

  const body = emojiEmotion
    .sort(function (a, b) {
      return (
        a.polarity - b.polarity ||
        sort({}, emojiToName[a.emoji], emojiToName[b.emoji])
      )
    })
    .map(function (d) {
      const info = gemoji.find((g) => g.emoji === d.emoji)
      assert(info, 'expected emoji for `' + d.name + '`')

      return u('tableRow', [
        cell(d.emoji),
        cell(info.names.join('; ')),
        cell(String(d.polarity))
      ])
    })

  return u('table', {align: []}, [head].concat(body))
}

/**
 * @param {string} value
 * @returns {import('mdast').TableCell}
 */
function cell(value) {
  return u('tableCell', [u('text', value)])
}
