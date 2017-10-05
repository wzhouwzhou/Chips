'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const District = class District {
  constructor(number, tributes = new Map()) {
    if(!number) throw new Error('No district number given');
    this.number = number;
    this.tributes = tributes.filter(e=>e.district===this||e.districtNumber===this.number);
  }

  addTribute (newTribute) {
    if(newTribute.district===this||newTribute.districtNumber===this.number) {
      this.tributes.set(newTribute.id, newTribute);
      newTribute.district = this;
      newTribute.districtNumber = this.number;
    }
    return this;
  }
};

exports.District = District;
