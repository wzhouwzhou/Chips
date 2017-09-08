'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => {
  const reverse = s => s.length===0 ? s : reverse(s.substring(1))+s[0];
  return reverse;
};
