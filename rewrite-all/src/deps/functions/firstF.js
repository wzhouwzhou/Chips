'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => (arr, n) => {
    if(typeof n === 'object')
      n = n.count || n.num || n.n || 0;

    if(arr.constructor.name === 'Collection')
      return new (arr.constructor)(Array.from(arr.values()).slice(0,n).map(e=>[e.id,e]));
    else if(arr.constructor.name === 'Array')
      return arr.slice(0,n);

    return arr;
  }
;
