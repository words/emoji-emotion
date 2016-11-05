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
    polarity: faces[name]
  };
});

/* Apply interpolation because emoticons represent more
 * emotion that words. */
var min = Math.min.apply(Math, faces.map(function (face) {
  return face.polarity;
}));

var max = Math.max.apply(Math, faces.map(function (face) {
  return face.polarity;
}));

/* Write. */
var doc = JSON.stringify(faces.map(function (face) {
  var polarity = reverse(face.polarity, min, max);
  polarity = interpolate(polarity, -5, 5);
  return {emoji: face.emoji, polarity: Math.round(polarity)};
}), null, 2) + '\n';

/* Write the dictionary. */
fs.writeFileSync(path.join('index.json'), doc);

function interpolate(weight, a, b) {
  return a + (weight * (b - a));
}

function reverse(value, a, b) {
  return (value - a) / (b - a);
}
