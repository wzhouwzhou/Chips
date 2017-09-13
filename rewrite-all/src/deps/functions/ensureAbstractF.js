'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = () => (qInstance, qClass) => {
  if(qInstance.constructor === qClass)
    throw new Error('Abstract class BoardGame may not be instantiated');
};
