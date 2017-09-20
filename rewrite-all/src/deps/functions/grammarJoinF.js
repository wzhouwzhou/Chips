'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = ({_}) => {
  const first = require('./firstF').default({_});
  return a => first(a,a.length-1).join(', ')+(a.length>2?',':'')+(a.length>1?' or ':'')+(a[a.length-1]);
};
