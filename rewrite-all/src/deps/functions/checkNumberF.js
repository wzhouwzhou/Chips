'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => {
  const checkNumber = (value, strict) => {
    if(isNaN(value)||isNaN(+value)) return false;
    const data = {};

    if(!strict){
      data.positive = +x>0;
      data.negative = +x<0;
      data.zero = +x==0;

      const whole = (+x|0) == +x;
      data.integer = whole;
      data.whole = whole&&+x>=0;
      data.natural = whole&&+x>0;
    }else{
      data.positive = x>0;
      data.negative = x<0;
      data.zero = x===0;

      const whole = (x|0) === x;
      data.integer = whole;
      data.whole = whole&&x>=0;
      data.natural = whole&&x>0;
    }
    return data;
  };

  return checkNumber;
};
