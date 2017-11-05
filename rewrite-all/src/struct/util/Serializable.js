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
  constructor(funcs = []) {
    super((() => {
      if (!this.funcs) this.funcs = funcs || [];
      this.funcs.push('serialize');
      return this.funcs;
    })());
    ensureAbstract(this, Serializable);
    this.constructor.isImplemented(this);
  }
};

exports.Serializable = Serializable;
