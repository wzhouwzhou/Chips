'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const HGTribute = class HGTribute {
  constructor(user, options) {
    this.name = user.tag;
    this.id = user.id||'0';
    this.district = options.district||null;
    this.gender = options.gender;
    this.sanity = options.sanity || 100;
    this.inventory = new HGTributeInventory(this, []);
  }

  serialize () {
    const serialized = {
      name: this.name,
      id: this.id,
      district: this.district,
      gender: this.gender,
      sanity: this.sanity,
      inventory: this.inventory.serialize()
    };
    return serialized;
  }
};

exports.HGTribute = HGTribute;
