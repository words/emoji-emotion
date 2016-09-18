/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module emoji-emotion
 * @fileoverview Test suite for `emoji-emotion`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var emojiEmotion = require('./');

/* Tests for basic structure. */
test('emoji-emotion', function (t) {
  t.ok(Array.isArray(emojiEmotion));
  t.end();
});

test('emoji-emotion[n]', function (t) {
  t.test('should have an `emoji` string field', function (st) {
    emojiEmotion.forEach(function (emotion) {
      st.equal(typeof emotion.emoji, 'string');
    });

    st.end();
  });

  t.test('should have an `polarity` integer field', function (st) {
    emojiEmotion.forEach(function (emotion) {
      st.equal(typeof emotion.polarity, 'number');
      st.equal(Math.round(emotion.polarity), emotion.polarity);
      st.ok(emotion.polarity >= -5);
      st.ok(emotion.polarity <= 5);
    });

    st.end();
  });

  t.end();
});
