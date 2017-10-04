'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const District = class District {
  constructor(number, tributes = new Map()) {
    this.number = number;
    this.tributes = tributes;
  }

  addTribute (newTribute) {
    this.tributes.set(newTribute.id, newTribute);
    return this;
  }
};

exports.District = District;
