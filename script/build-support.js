'use strict';

var zone = require('mdast-zone');
var u = require('unist-builder');
var sort = require('alphanum-sort/lib/compare');
var gemoji = require('gemoji').unicode;
var emotion = require('..');

module.exports = support;

function support() {
  return transformer;
}

function transformer(tree) {
  zone(tree, 'support', replace);
}

function replace(start, nodes, end) {
  return [start, table(), end];
}

function table() {
  var header = ['Emoji', 'Name(s)', 'Polarity'];

  return u('table', {align: []}, [
    u('tableRow', header.map(cell))
  ].concat(
    emotion
      .sort(function (a, b) {
        return a.polarity - b.polarity ||
          sort({}, gemoji[a.emoji].name, gemoji[b.emoji].name);
      })
      .map(function (emotion) {
        return u('tableRow', [
          cell(emotion.emoji),
          cell(gemoji[emotion.emoji].names.join('; ')),
          cell(emotion.polarity)
        ]);
      })
  ));
}

function cell(value) {
  return u('tableCell', [u('text', value)]);
}
