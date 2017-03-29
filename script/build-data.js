'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var gemoji = require('gemoji');
var toJSON = require('plain-text-data-to-json');

/* Read. */
var faces = toJSON(fs.readFileSync('faces.txt', 'utf8'));

/* Manipulate. */
faces = Object.keys(faces).sort().map(function (name) {
  return {
    name: name,
    emoji: gemoji.name[name].emoji,
    polarity: Number(faces[name])
  };
});

/* Write. */
var doc = JSON.stringify(faces, null, 2) + '\n';

/* Write the dictionary. */
fs.writeFileSync(path.join('index.json'), doc);
