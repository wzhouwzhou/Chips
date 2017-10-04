'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const HGTribute = class HGTribute {
  constructor(user, options) {
    this.name = user.tag;
    this.id = user.id;
    this.district = options.district;
    this.gender = options.gender;
  }
};

exports.HGTribute = HGTribute;
