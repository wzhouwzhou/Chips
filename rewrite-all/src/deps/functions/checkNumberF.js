'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => {
  const checkNumber = (value, strict) => {
    if(isNaN(value)||isNaN(+value)) return false;
    const data = {};

    if(!strict){
      data.positive = +value>0;
      data.negative = +value<0;
      data.zero = +value==0;

      const whole = (+value|0) == +value;
      data.integer = whole;
      data.whole = whole&&+value>=0;
      data.natural = whole&&+value>0;
    }else{
      data.positive = value>0;
      data.negative = value<0;
      data.zero = value===0;

      const whole = (value|0) === value;
      data.integer = whole;
      data.whole = whole&&value>=0;
      data.natural = whole&&value>0;
    }
    return data;
  };

  return checkNumber;
};
