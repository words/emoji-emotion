'use strict';

var assert = require('assert');
var test = require('tape');
var emojiEmotion = require('./');

test('emoji-emotion', function (t) {
  t.ok(Array.isArray(emojiEmotion));

  t.doesNotThrow(function () {
    emojiEmotion.forEach(function (emotion) {
      assert.equal(typeof emotion.emoji, 'string', JSON.stringify(emotion));
    });
  }, 'each entry should have an `emoji` string field');

  t.doesNotThrow(function () {
    emojiEmotion.forEach(function (emotion) {
      var label = JSON.stringify(emotion);

      assert.equal(typeof emotion.polarity, 'number', 'number: ' + label);
      assert.equal(Math.round(emotion.polarity), emotion.polarity, 'integer: ' + label);
      assert.ok(emotion.polarity >= -5, 'gte -5: ' + label);
      assert.ok(emotion.polarity <= 5, 'lte 5: ' + label);
    });
  }, 'each entry should have an `polarity` integer field');

  t.end();
});
