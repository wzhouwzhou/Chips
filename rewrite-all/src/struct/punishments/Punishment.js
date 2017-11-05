'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../util/Serializable');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const Punishment = class Punishment extends Serializable {
  constructor(options = {}) {
    super();
    this.executors = options.executors || [];
    this.targets = options.executors || [];
    this.type = options.type;
    this.date = options.date || new Date;
    ensureAbstract(this, Punishment);
    this.constructor.isImplemented(this);
  }

  serialize(cache = false) {
    const data = {
      executors: this.executors.map(e => e.id),
      targets: this.targets.map(t => t.id),
      type: this.type,
      date: this.date,
    };
    if (cache) this.data = data;
    return data;
  }
};

exports.Punishment = Punishment;
