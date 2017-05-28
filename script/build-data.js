'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var gemoji = require('gemoji').name;
var toJSON = require('plain-text-data-to-json');

/* Read. */
var faces = toJSON(fs.readFileSync('faces.txt', 'utf8'));
var all = [];
var unclassified = ['🤖'];

/* Manipulate. */
faces = Object.keys(faces).sort().map(function (name) {
  var num = Number(faces[name]);

  if (isNaN(num)) {
    console.log('Invalid valence for %s: %s', name, faces[name]);
  }

  if (!gemoji[name]) {
    console.log('Invalid gemoji %s', name);
  }

  all.push(gemoji[name].emoji);

  return {
    name: name,
    emoji: gemoji[name].emoji,
    polarity: num
  };
});

Object.keys(gemoji).forEach(function (name) {
  var info = gemoji[name];
  var emoji = info.emoji;

  if (info.category !== 'people') {
    return;
  }

  if (!/\bface\b/.test(info.description)) {
    return;
  }

  if (all.indexOf(emoji) === -1 && unclassified.indexOf(emoji) === -1) {
    throw new Error('Missing definition for ' + emoji + ' (' + info.description + ')');
  }
});

/* Write. */
var doc = JSON.stringify(faces, null, 2) + '\n';

/* Write the dictionary. */
fs.writeFileSync(path.join('index.json'), doc);
