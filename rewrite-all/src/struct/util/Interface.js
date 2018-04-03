'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Interface
 *
 * @type {Interface}
 * @abstract
 */
const Interface = class Interface {
  constructor(funcs) {
    this.funcs = funcs;
    ensureAbstract(this, Interface);
    if (this.funcs) this.constructor.isImplemented(this);
  }

  static isImplemented(object) {
    for (const k of object.funcs) {
      if (typeof object.constructor.prototype[k] !== 'function' || !object[k]) {
        throw new Error(`Missing interface function ${k}`);
      }
    }
    return object;
  }
};

exports.Interface = Interface;
