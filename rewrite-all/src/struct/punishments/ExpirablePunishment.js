'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Punishment } = require('./Punishment');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const ExpirablePunishment = class ExpirablePunishment extends Punishment {
  constructor(options) {
    super(options);
    this.duration = options.duration || 0;
    this.checkOver();
    this.type = options.type;
    ensureAbstract(this, ExpirablePunishment);
    this.constructor.isImplemented(this);
  }

  serialize(cache = false) {
    const data = super.serialize(false);
    data.duration = this.duration;

    if (cache) this.data = data;
    return data;
  }

  checkOver(dateB) {
    if (this.date + this.duration > (dateB || new Date)) this.concluded = true;
    this.concluded = false;
    return this.concluded;
  }
};

exports.ExpirablePunishment = ExpirablePunishment;
