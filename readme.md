# emoji-emotion [![Build Status][travis-badge]][travis]

List of emoji rated for valence with an integer between minus five
(negative) and plus five (positive).

This list does not contain emoji modifiers (skin-tones).  Use something like
[`strip-skin-tone`][strip-skin-tone] to remove them if you’d like.

## Installation

[npm][]:

```bash
npm install emoji-emotion
```

## Usage

```javascript
var emotion = require('emoji-emotion');

console.log(emotion.slice(0, 5));
```

Yields:

```js
[ { name: 'angry', emoji: '😠', polarity: -3 },
  { name: 'anguished', emoji: '😧', polarity: -3 },
  { name: 'astonished', emoji: '😲', polarity: 2 },
  { name: 'blush', emoji: '😊', polarity: 2 },
  { name: 'clown_face', emoji: '🤡', polarity: 0 } ]
```

Note the information is intentionally limited.  Check out
[`gemoji`][gemoji] for more info: tags, descriptions, names, etc.

## Support

See [support.md][support].

## Data

The contained emoji are the faces and cats defined by [Unicode][].
The polarity was hand classified (by one person) based on the names of
these emoji (sometimes synonyms) and their [AFINN-169][] values.
Special care was given to **not** classify based on the images (as
different vendors use different pictograms), but only on words and how
they are used.

Note that some emoji receive arguably confusing polarities, such as
`stuck_out_tongue_closed_eyes` (`0`), due to being used for both
positive and negative emotions.

No images are included in this repository—the copyrighted material
may or may not be available on the users computer.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/emoji-emotion.svg

[travis]: https://travis-ci.org/wooorm/emoji-emotion

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[support]: support.md

[gemoji]: https://github.com/wooorm/gemoji

[unicode]: http://www.unicode.org/Public/emoji/1.0/full-emoji-list.html

[afinn-169]: https://github.com/wooorm/afinn-169

[strip-skin-tone]: https://github.com/wooorm/strip-skin-tone
