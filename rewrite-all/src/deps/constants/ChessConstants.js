'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.W = '⬜';
exports.B = '⬛';

exports.startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
exports.randFen = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1  b - c3 0 19';

exports.chessPieces = new Map(
  [
    ['bb','358369725635362827'],
    ['bw','358369737929129984'],
    ['kb','358369745906434050'],
    ['kw','358369754416939020'],
    ['nb','358369767175880704'],
    ['nw','358369778555027457'],
    ['pb','358369801367977984'],
    ['pw','358369820573564938'],
    ['qb','358369834708369409'],
    ['qw','358369846129328138'],
    ['rb','358369854950211584'],
    ['rw','358369866132226048'],
  ].map(t =>
    [
      t[0],
      `<:${t[0]}:${t[1]}>`,
    ]
  )
);
