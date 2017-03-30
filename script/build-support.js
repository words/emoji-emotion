'use strict';

/* Dependencies. */
var fs = require('fs');
var table = require('markdown-table');
var width = require('string-width');
var sort = require('alphanum-sort/lib/compare');
var gemoji = require('gemoji');
var emotion = require('..');

/* Set up data. */
var data = [[
  'Emoji',
  'Name(s)',
  'Escaped Unicode',
  'Polarity'
]].concat(
  emotion
    .sort(function (a, b) {
      var diff = a.polarity - b.polarity;
      return diff || sort({}, gemoji.unicode[a.emoji].name, gemoji.unicode[b.emoji].name);
    })
    .map(function (emotion) {
      return [
        emotion.emoji,
        gemoji.unicode[emotion.emoji].names.join('; '),
        escape(emotion.emoji),
        emotion.polarity
      ];
    })
);

var doc = [
  '# Support',
  '',
  '<!--lint disable table-pipe-alignment-->',
  '',
  'Note that this file does not contain the gemoji’s as rendered',
  'by GitHub.  You need a browser capable of viewing unicode-emoji',
  'to make sense of the first column!',
  '',
  table(data, {align: 'c', stringLength: width}),
  ''
].join('\n');

/* Write. */
fs.writeFileSync('support.md', doc);

/**
 * Escape a string into its unicode points.
 *
 * @param {string} value - Value to encode.
 * @return {string}
 */
function escape(value) {
  return value.split('').map(function (character) {
    return '\\u' + character.charCodeAt(0).toString(16);
  }).join('');
}
