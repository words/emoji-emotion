/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module emoji-emotion:script:data
 * @fileoverview Transform data.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var table = require('markdown-table');
var width = require('string-width');
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
      if (a.polarity === b.polarity) {
        return gemoji.unicode[a.emoji].name.charCodeAt(0) -
          gemoji.unicode[b.emoji].name.charCodeAt(0);
      }

      return a.polarity - b.polarity;
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
