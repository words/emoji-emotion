'use strict'

var zone = require('mdast-zone')
var u = require('unist-builder')
var sort = require('alphanum-sort/lib/compare')
var gemoji = require('gemoji')
var emojiToName = require('gemoji/emoji-to-name')
var emotion = require('..')

module.exports = support

function support() {
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

  var body = emotion
    .sort(function (a, b) {
      return (
        a.polarity - b.polarity ||
        sort({}, emojiToName[a.emoji], emojiToName[b.emoji])
      )
    })
    .map(function (emotion) {
      var info = gemoji.find((d) => d.emoji === emotion.emoji)

      return u('tableRow', [
        cell(emotion.emoji),
        cell(info.names.join('; ')),
        cell(emotion.polarity)
      ])
    })

  return u('table', {align: []}, [head].concat(body))
}

function cell(value) {
  return u('tableCell', [u('text', value)])
}
