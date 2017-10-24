'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../Serializable');

const Punishment = class Punishment extends Serializable {
  constructor(options) {
    super();
    this.executors = options.executors||[];
    this.targets = options.executors||[];
    this.type = options.type;
    this.constructor.isImplemented(this);
  }

  serialize (cache = false) {
    const data = {
      executors: this.executors.map(e => e.id),
      targets: this.targets.map(t => t.id),
      type: this.type,
    };
    if(cache) this.data = data;
    return data;
  }
};

exports.Punishment = Punishment;
