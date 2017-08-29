'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => (ms) =>
  new Promise(res => setTimeout(() => res(ms), ms))
;
