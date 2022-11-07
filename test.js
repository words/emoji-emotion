import assert from 'node:assert/strict'
import test from 'node:test'
import {emojiEmotion} from './index.js'

test('emoji-emotion', function () {
  assert.ok(Array.isArray(emojiEmotion))

  assert.doesNotThrow(function () {
    let index = -1
    while (++index < emojiEmotion.length) {
      assert.strictEqual(
        typeof emojiEmotion[index].emoji,
        'string',
        JSON.stringify(emojiEmotion[index])
      )
    }
  }, 'each entry should have an `emoji` string field')

  assert.doesNotThrow(function () {
    let index = -1

    while (++index < emojiEmotion.length) {
      const label = JSON.stringify(emojiEmotion[index])

      assert.strictEqual(
        typeof emojiEmotion[index].polarity,
        'number',
        'number: ' + label
      )
      assert.strictEqual(
        Math.round(emojiEmotion[index].polarity),
        emojiEmotion[index].polarity,
        'integer: ' + label
      )
      assert.ok(emojiEmotion[index].polarity >= -5, 'gte -5: ' + label)
      assert.ok(emojiEmotion[index].polarity <= 5, 'lte 5: ' + label)
    }
  }, 'each entry should have an `polarity` integer field')
})
