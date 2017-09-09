'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = ({_}) => {
  const splitChunkF = ( object, options = {chunksize: 100, clone: !0} ) => {
    if(typeof object !== 'object') throw new Error('Invalid object provided');
    const chunks = [], size = options.chunksize || options.size || 100;
    let temp;
    object = options.clone&&_ ? _.clone(object) : object;
    switch(object.constructor.name){
      case 'Array':
        while (object.length > 0)
          chunks.push(object.splice(0, size));

        return chunks;

      case 'Map':
      case 'Collection':
        temp = Array.from(object);
        while (temp.length > 0)
          chunks.push(temp.splice(0, size));
        return chunks.map(e=>new (object.constructor)(e));

      default:
        throw new Error(`Unsupported constructor type of ${object.constructor.name} given`);
    }
  };
  return splitChunkF;
};
