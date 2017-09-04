'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = ({ Discord }) => {
  let obj;

  const splitChunkMF = ( object, options = {chunksize: 100} ) => {
    if(typeof object !== 'object') throw new Error('Invalid object provided');
    if(object.constructor.name === 'Array'){
      const chunks = [], size = options.chunksize || options.size || 100;

      while (object.length > 0)
        chunks.push(object.splice(0, size));

      return chunks;
    }
  };
  return splitChunkMF;
};
