'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const times = ["years","months","weeks","days","hours","minutes","seconds"];

exports.default = ({ moment }) =>
  timeAgo = (date, time) => {
    if(date instanceof Date){
      if(!~times.indexOf(time)) throw 'Invalid unit of time given';
      let i = times.indexOf(time);
      let diff = moment().diff(date, time, true).toFixed(2);
      while(i<times.length-1){
        if(diff>1) return [diff,times[i]];
        diff = moment().diff(date, times[++i], true).toFixed(2);
      }
      return [diff,times[i]];
    }else{
      throw 'Invalid date!';
    }
  }
;
