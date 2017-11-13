'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Interface } = require('./Interface');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Runnable Interface
 *
 * @abstract
 * @interface
 */
const Runnable = class Runnable extends Interface {
  constructor(funcs = []) {
    const myfuncs = Array.from(new Set([...funcs, 'run']));
    super(myfuncs);
    this.funcs = myfuncs;
    ensureAbstract(this, Runnable);
    this.constructor.isImplemented(this);
  }
};

exports.Runnable = Runnable;
