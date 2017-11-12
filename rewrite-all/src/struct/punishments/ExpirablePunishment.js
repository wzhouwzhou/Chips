'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Punishment } = require('./Punishment');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const ExpirablePunishment = class ExpirablePunishment extends Punishment {
  constructor(options = {}) {
    super(options);
    this.duration = options.duration || 0;
    this.checkOver();
    this.type = options.type;
    ensureAbstract(this, ExpirablePunishment);
    this.constructor.isImplemented(this);
  }

  serialize(cache = false) {
    const data = super.serialize(cache);
    data.duration = this.duration;

    if (cache) this.data = data;
    return data;
  }

  checkOver(dateB = new Date) {
    if (this.timeLeft(dateB) <= 0) {
      this.concluded = true;
      this.emit('expired', this.serialize(false));
    } else {
      this.concluded = false;
    }
    return this.concluded;
  }

  isOver(...args) {
    this.checkOver(...args);
  }

  timeLeft(dateB = new Date) {
    return this.date - dateB + this.duration;
  }
};

exports.ExpirablePunishment = ExpirablePunishment;
