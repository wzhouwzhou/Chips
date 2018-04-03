'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = ({ _ } = {}) => (arr, n) => {
  let clone = !0;
  if (typeof n === 'object') {
    if ('clone' in n) clone = n.clone;
    n = n.count || n.num || n.n || 0;
  }
  switch (arr.constructor.name) {
    case 'Collection':
    case 'Map':
      return new arr.constructor(Array.from(arr.values()).slice(0, n).map(e => [e.id, e]));
    case 'Array':
      return _ && clone ? _.clone(arr, !0).slice(0, n) : arr.slice(0, n);
    case 'String':
      return arr.substr(0, n);
    default:
      return arr;
  }
}
;
