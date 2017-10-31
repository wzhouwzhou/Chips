'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Interface } = require('./Interface');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Serializable Interface
 *
 * @interface
 */

const Serializable = class Serializable extends Interface {
  constructor() {
    super();
    ensureAbstract(this, Serializable);
    if (!this.funcs) this.funcs = [];
    this.funcs.push('serialize');
  }
};

exports.Serializable = Serializable;
