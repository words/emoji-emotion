# emoji-emotion [![Build Status](https://img.shields.io/travis/wooorm/emoji-emotion.svg?style=flat)](https://travis-ci.org/wooorm/emoji-emotion) [![Coverage Status](https://img.shields.io/coveralls/wooorm/emoji-emotion.svg?style=flat)](https://coveralls.io/r/wooorm/emoji-emotion?branch=master)

List of emoji rated for valence with an integer between minus five (negative) and plus five (positive).

## Installation

npm:

```bash
$ npm install emoji-emotion
```

Component:

```bash
$ component install wooorm/emoji-emotion
```

Bower:

```bash
$ bower install emoji-emotion
```

## Usage

```javascript
var emotion = require('emoji-emotion');

emotion[0];
```

Yields:

```json
{
  "emoji": "😠",
  "polarity": -4
}
```

Note the information is intentionally limit. Check out [wooorm/gemoji](https://github.com/wooorm/gemoji) for more information, such as tags, descriptions, and names regarding these faces.

## Supported Emoji

See [Support.md](Support.md).

## Data

The contained emoji are the faces and cats defined by [Unicode](http://www.unicode.org/Public/emoji/1.0/full-emoji-list.html). The polarity was hand classified (by one person) based on the names of these emoji (sometimes synonyms) and their [AFINN-111](https://github.com/wooorm/afinn-111) values. Special care was given to **not** classify based on the images (as different vendors use different pictograms), but only on words and how they are used.

Note that some emoji receive arguably confusing polarities, such as `stuck_out_tongue_closed_eyes` (`0`), due to being used for both positive and negative emotions.

No images are included in this repository—the copyrighted material may or may not be available on the users computer.

## License

MIT © [Titus Wormer](http://wooorm.com)
