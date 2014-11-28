'use strict';

/**
 * Dependencies.
 */

var emojiEmotion,
    assert;

emojiEmotion = require('./');
assert = require('assert');

/**
 * Tests for basic structure.
 */

describe('emoji-emotion', function () {
    it('should be an array', function () {
        assert(Array.isArray(emojiEmotion));
    });
});

describe('emoji-emotion[n]', function () {
    it('should be an object', function () {
        emojiEmotion.forEach(function (emotion) {
            assert(typeof emotion === 'object');
        });
    });

    it('should have an `emoji` string field', function () {
        emojiEmotion.forEach(function (emotion) {
            assert(typeof emotion.emoji === 'string');
        });
    });

    it('should have a `polarity` integer field', function () {
        emojiEmotion.forEach(function (emotion) {
            assert(typeof emotion.polarity === 'number');
            assert(Math.round(emotion.polarity) === emotion.polarity);
        });
    });
});

describe('emoji-emotion[n].polarity', function () {
    it('should be gte -5 and lte 5', function () {
        emojiEmotion.forEach(function (emotion) {
            assert(emotion.polarity >= -5);
            assert(emotion.polarity <= 5);
        });
    });
});
