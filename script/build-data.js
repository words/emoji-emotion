'use strict';

/**
 * Dependencies.
 */

var fs,
    gemoji,
    toJSON;

fs = require('fs');
gemoji = require('gemoji');
toJSON = require('plain-text-data-to-json');

/**
 * Cached access.
 */

var read,
    write;

write = fs.writeFileSync;
read = fs.readFileSync;

/**
 * Data.
 */

var faces;

faces = toJSON(read('./data/faces.txt', 'utf-8'));

/**
 * Manipulate.
 */

faces = Object.keys(faces).sort().map(function (name) {
    return {
        'name': name,
        'emoji': gemoji.name[name].emoji,
        'polarity': faces[name]
    }
});

/**
 * Apply interpolation because emoticons represent more
 * emotion that words.
 */

var min,
    max;

min = Math.min.apply(Math, faces.map(function (face) {
    return face.polarity;
}));

max = Math.max.apply(Math, faces.map(function (face) {
    return face.polarity;
}));

function interpolate(weigth, a, b) {
    return a + weigth * (b - a);
}

function reverseInterpolate(value, a, b) {
    return (value - a) / (b - a);
}

faces.forEach(function (face) {
    face.polarity = Math.round(interpolate(
        reverseInterpolate(face.polarity, min, max), -5, 5
    ));
});

/**
 * Write
 */

write('./data/emoji-emotion.json', JSON.stringify(faces.map(function (face) {
    return {
        'emoji': face.emoji,
        'polarity': face.polarity
    };
}), null, 2) + '\n');
