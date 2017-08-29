'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const reverse = require('./reverseF').default();

exports.default = () => (s) =>
  s.split(/\s+/).reduce((s,word) => s+=`${reverse(word)} `, '').trim()
;
