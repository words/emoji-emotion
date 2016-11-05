'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var gemoji = require('gemoji');
var lerp = require('lerp');
var unlerp = require('unlerp');
var toJSON = require('plain-text-data-to-json');

/* Read. */
var faces = toJSON(fs.readFileSync('faces.txt', 'utf8'));

/* Manipulate. */
faces = Object.keys(faces).sort().map(function (name) {
  return {
    name: name,
    emoji: gemoji.name[name].emoji,
    polarity: faces[name]
  };
});

/* Apply interpolation because emoticons represent more
 * emotion than words. */
var min = Math.min.apply(Math, faces.map(pick));
var max = Math.max.apply(Math, faces.map(pick));

/* Write. */
var doc = JSON.stringify(faces.map(function (face) {
  var polarity = Math.round(lerp(-5, 5, unlerp(min, max, face.polarity)));
  return {emoji: face.emoji, polarity: polarity};
}), null, 2) + '\n';

/* Write the dictionary. */
fs.writeFileSync(path.join('index.json'), doc);

function pick(face) {
  return face.polarity;
}
