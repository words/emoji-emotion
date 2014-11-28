'use strict';

/**
 * Dependencies.
 */

var emojiEmotion,
    fs,
    table,
    gemoji;

emojiEmotion = require('..');
fs = require('fs');
table = require('markdown-table');
gemoji = require('gemoji');

/**
 * Escape a string into its unicode points.
 *
 * @param {string} value
 * @return {string} value
 */

function escape(value) {
    return value.split('').map(function (character) {
        return '\\u' + character.charCodeAt(0).toString(16);
    }).join('');
}

/**
 * Create an expression from all emoji.
 */

var expression;

expression = new RegExp(Object.keys(gemoji.unicode).join('|'), 'g');

/**
 * Set up data.
 */

var data;

data = [
    ['Emoji', 'Name(s)', 'Escaped Unicode', 'Polarity']
].concat(
    emojiEmotion.sort(function (a, b) {
        if (a.polarity === b.polarity) {
            return gemoji.unicode[a.emoji].name.charCodeAt(0) -
                gemoji.unicode[b.emoji].name.charCodeAt(0);
        }

        return a.polarity - b.polarity;
    }).map(function (emotion) {
        return [
            emotion.emoji,
            gemoji.unicode[emotion.emoji].names.join('; '),
            escape(emotion.emoji),
            emotion.polarity
        ]
    })
);

/**
 * Write support.
 */

fs.writeFileSync('Support.md',
    'Support:\n' +
    '=================\n' +
    '\n' +
    'Note that this file does not contain the ' +
    'gemoji\'s as rendered by GitHub. You need a ' +
    'browser capable of viewing unicode-emoji to make ' +
    'sense of the first column!\n' +
    '\n' +

    table(data, {
        'align': ['c', 'c', 'c', 'c'],
        'stringLength': function (value) {
            return value.replace(expression, '  ').length;
        }
    }) +

    '\n'
);
