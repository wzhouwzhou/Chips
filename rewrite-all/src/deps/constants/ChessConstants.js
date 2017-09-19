'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.B = '<:ab:358643642954416156>';  //'⬛';
exports.W = '<:aw:358643894654730251>';  //'⬜';
exports.label2 = [':white_small_square:'].concat(new Array(8).fill(0).map((x,i) => `:regional_indicator_${String.fromCharCode(97 + i)}:`));

exports.startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
exports.randFen = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1  b - c3 0 19';
exports.pieceIds = [
  [ 'bbb', '358643660809568257' ],
  [ 'bwb', '358643673447137292' ],
  [ 'kbb', '358643694792081408' ],
  [ 'kwb', '358643732494680065' ],
  [ 'nbb', '358643746247540736' ],
  [ 'nwb', '358643760491659266' ],
  [ 'pbb', '358643773808443412' ],
  [ 'pwb', '358643788660473856' ],
  [ 'qbb', '358643802749140993' ],
  [ 'qwb', '358643817047392272' ],
  [ 'rbb', '358643835972222976' ],
  [ 'rwb', '358643850618863616' ],
  [ 'bbw', '358643922018238474' ],
  [ 'bww', '358643934307549194' ],
  [ 'kbw', '358643948048089089' ],
  [ 'kww', '358644054906503168' ],
  [ 'nbw', '358644111395389442' ],
  [ 'nww', '358644136426995712' ],
  [ 'pbw', '358644150632972291' ],
  [ 'pww', '358644164650598400' ],
  [ 'qbw', '358644180739817483' ],
  [ 'qww', '358644241729323008' ],
  [ 'rbw', '358644253041098757' ],
  [ 'rww', '358644265431334913' ],
];

exports.chessPieces = new Map(
  exports.pieceIds.map(t =>
    [
      t[0],
      `<:${t[0]}:${t[1]}>`,
    ]
  )
);
const emojiURLBase = 'https://cdn.discordapp.com/emojis/', ext='.png';
exports.piecesURLs = new Map(pieceIds.map(e=>[e[0],`${emojiURLBase}${e[1]}${ext}`]));
