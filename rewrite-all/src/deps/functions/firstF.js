'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => {
  const first = (arr, n) => {
    if(typeof n === 'object')
      n = n.count || n.num || n.n || 0;
    if(arr.constructor.name === 'Array')
      return arr.slice(0,n);
    return arr;
  };
  return first;
};
