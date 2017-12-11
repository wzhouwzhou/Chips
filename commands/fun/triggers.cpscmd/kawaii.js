const kawaii = [
  '(づ◕ ͜ʖ◕)づ', '୧ʘᨓʘ୨', '(งಠ‸ಠ)ง',	'(∩ȍ∀ȍ)⊃━☆ﾟ.*', '("◕‿◕✿)',
  '(◠‿◠✿)', '(◠﹏◠✿)', '（＊＾Ｕ＾）人（≧Ｖ≦＊）/', 'ôヮô', '∧( ‘Θ’ )∧',
  '(¤﹏¤)', '●‿●', 'ʕ·ᴥ·ʔ', '＼（＾○＾）人（＾○＾）／', 'ヾ(＠⌒▽⌒＠)ﾉ',
  '(°∀°)', 'ヾ｜￣ー￣｜ﾉ', '(☉‿☉✿)', '┏(＾0＾)┛┗(＾0＾) ┓', '(◡‿◡✿)',
  '✿◕ ‿ ◕✿', 'ヽ(‘ ∇‘ )ノ', ' ☆(❁‿❁)☆',
  '❀◕ ‿ ◕❀', 'ヽ(^◇^*)/', '(*^ -^*)', '(⊙‿⊙✿)', '(ﾟヮﾟ)',
  'ヅ', '●ᴥ●', '(∪ ◡ ∪)', '≧◡≦', '٩◔‿◔۶', '｡◕ ‿ ◕｡',
  'ヾ(＠＾▽＾＠)ﾉ', '(✿◠‿◠)', '(￣ｰ￣)', '~,~', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
  '(*~▽~)', '❀‿❀', '(^L^)', '(^▽^)', '(◕‿◕✿)',
  '（ ；´Д｀）', '⊙﹏⊙', '✿｡✿', 'ヽ(゜∇゜)ノ', ' ｡(✿‿✿)｡', '(´∀｀)♡',
];
module.exports = {
  name: 'kawaii',
  func(msg, { send }) {
    return send(kawaii[_.random(0, kawaii.length - 1)]);
  },
};
