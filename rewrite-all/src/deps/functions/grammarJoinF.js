'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const first = require('./firstF').default();

exports.default = () => a =>
  first(a,a.length-1).join(', ')+(a.length>2?',':'')+(a.length>1?' or ':'')+(a[a.length-1])
;
