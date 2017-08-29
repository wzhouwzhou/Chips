'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => (arr, n) => {
    if(typeof n === 'object')
      n = n.count || n.num || n.n || 0;
    if(arr.constructor.name === 'Array')
      return arr.slice(-n);
    return arr;
  }
;
