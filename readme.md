# emoji-emotion [![Build Status][travis-badge]][travis]

List of emoji rated for valence with an integer between minus five
(negative) and plus five (positive).

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
[ { name: '100', emoji: '💯', polarity: 3 },
  { name: 'angry', emoji: '😠', polarity: -3 },
  { name: 'anguished', emoji: '😧', polarity: -3 },
  { name: 'astonished', emoji: '😲', polarity: 2 },
  { name: 'black_heart', emoji: '🖤', polarity: 3 } ]
```

Note the information is intentionally limited.  Check out
[`gemoji`][gemoji] for more info: tags, descriptions, names, etc.

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

## Support

<!--support start-->

| Emoji | Name(s) | Polarity |
| ----- | ------- | -------- |
| 👿 | imp | -4 |
| 🖕 | middle_finger; fu | -4 |
| 😾 | pouting_cat | -4 |
| 😡 | rage; pout | -4 |
| 😠 | angry | -3 |
| 😧 | anguished | -3 |
| 💔 | broken_heart | -3 |
| 💩 | hankey; poop; shit | -3 |
| 😱 | scream | -3 |
| 🙀 | scream_cat | -3 |
| 😈 | smiling_imp | -3 |
| 😭 | sob | -3 |
| 😟 | worried | -3 |
| 👎 | -1; thumbsdown | -2 |
| 😰 | cold_sweat | -2 |
| 😖 | confounded | -2 |
| 😕 | confused | -2 |
| 😢 | cry | -2 |
| 😿 | crying_cat_face | -2 |
| 😞 | disappointed | -2 |
| 🤕 | face_with_head_bandage | -2 |
| 😨 | fearful | -2 |
| 😳 | flushed | -2 |
| ☹️ | frowning_face | -2 |
| 😬 | grimacing | -2 |
| 🤥 | lying_face | -2 |
| 🤢 | nauseated_face | -2 |
| 😮 | open_mouth | -2 |
| 😣 | persevere | -2 |
| 💀 | skull | -2 |
| ☠️ | skull_and_crossbones | -2 |
| 🤧 | sneezing_face | -2 |
| 😫 | tired_face | -2 |
| 😒 | unamused | -2 |
| 😩 | weary | -2 |
| 😥 | disappointed_relieved | -1 |
| 😵 | dizzy_face | -1 |
| 🤒 | face_with_thermometer | -1 |
| 👊 | fist_oncoming; facepunch; punch | -1 |
| 😦 | frowning | -1 |
| 👻 | ghost | -1 |
| 😯 | hushed | -1 |
| 😷 | mask | -1 |
| 🤓 | nerd_face | -1 |
| 😔 | pensive | -1 |
| 🙄 | roll_eyes | -1 |
| 🙁 | slightly_frowning_face | -1 |
| 😜 | stuck_out_tongue_winking_eye | -1 |
| 😓 | sweat | -1 |
| 🤔 | thinking | -1 |
| 🤐 | zipper_mouth_face | -1 |
| 🤡 | clown_face | 0 |
| 🤤 | drooling_face | 0 |
| 😑 | expressionless | 0 |
| 🤑 | money_mouth_face | 0 |
| 😐 | neutral_face | 0 |
| 😶 | no_mouth | 0 |
| 😴 | sleeping | 0 |
| 😪 | sleepy | 0 |
| 😝 | stuck_out_tongue_closed_eyes | 0 |
| 😤 | triumph | 0 |
| 🙃 | upside_down_face | 0 |
| 🤝 | handshake | 1 |
| 😆 | laughing; satisfied | 1 |
| 🙏 | pray | 1 |
| 🙂 | slightly_smiling_face | 1 |
| 😛 | stuck_out_tongue | 1 |
| 😎 | sunglasses | 1 |
| 👍 | +1; thumbsup | 2 |
| 😲 | astonished | 2 |
| 😊 | blush | 2 |
| 🤠 | cowboy_hat_face | 2 |
| 🤞 | crossed_fingers | 2 |
| 😁 | grin | 2 |
| 😀 | grinning | 2 |
| 🤗 | hugs | 2 |
| 💋 | kiss | 2 |
| 😗 | kissing | 2 |
| 😽 | kissing_cat | 2 |
| 😚 | kissing_closed_eyes | 2 |
| 😙 | kissing_smiling_eyes | 2 |
| 👄 | lips | 2 |
| 👌 | ok_hand | 2 |
| ☺️ | relaxed | 2 |
| 😌 | relieved | 2 |
| 😄 | smile | 2 |
| 😸 | smile_cat | 2 |
| 😃 | smiley | 2 |
| 😺 | smiley_cat | 2 |
| 😏 | smirk | 2 |
| 😼 | smirk_cat | 2 |
| 😅 | sweat_smile | 2 |
| ✌️ | v | 2 |
| 💯 | 100 | 3 |
| 🖤 | black_heart | 3 |
| 💙 | blue_heart | 3 |
| 👏 | clap | 3 |
| 💘 | cupid | 3 |
| 💝 | gift_heart | 3 |
| 💚 | green_heart | 3 |
| ❤️ | heart | 3 |
| 😍 | heart_eyes | 3 |
| 😻 | heart_eyes_cat | 3 |
| 💓 | heartbeat | 3 |
| 💗 | heartpulse | 3 |
| 😇 | innocent | 3 |
| 😂 | joy | 3 |
| 😹 | joy_cat | 3 |
| 😘 | kissing_heart | 3 |
| 💜 | purple_heart | 3 |
| 💞 | revolving_hearts | 3 |
| 💖 | sparkling_heart | 3 |
| 💕 | two_hearts | 3 |
| 😉 | wink | 3 |
| 💛 | yellow_heart | 3 |
| 😋 | yum | 3 |
| 🙌 | raised_hands | 4 |
| 🤣 | rofl | 4 |

<!--support end-->

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/emoji-emotion.svg

[travis]: https://travis-ci.org/wooorm/emoji-emotion

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[gemoji]: https://github.com/wooorm/gemoji

[unicode]: http://www.unicode.org/Public/emoji/1.0/full-emoji-list.html

[afinn-169]: https://github.com/wooorm/afinn-169
