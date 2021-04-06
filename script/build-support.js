import zone from 'mdast-zone'
import u from 'unist-builder'
import sort from 'alphanum-sort/lib/compare.js'
import {gemoji, emojiToName} from 'gemoji'
import {emojiEmotion} from '../index.js'

export default function buildSupport() {
  return transformer
}

function transformer(tree) {
  zone(tree, 'support', replace)
}

function replace(start, nodes, end) {
  return [start, table(), end]
}

function table() {
  var head = u('tableRow', [cell('Emoji'), cell('Name(s)'), cell('Polarity')])

  var body = emojiEmotion
    .sort(function (a, b) {
      return (
        a.polarity - b.polarity ||
        sort({}, emojiToName[a.emoji], emojiToName[b.emoji])
      )
    })
    .map(function (d) {
      var info = gemoji.find((g) => g.emoji === d.emoji)

      return u('tableRow', [
        cell(d.emoji),
        cell(info.names.join('; ')),
        cell(d.polarity)
      ])
    })

  return u('table', {align: []}, [head].concat(body))
}

function cell(value) {
  return u('tableCell', [u('text', value)])
}
