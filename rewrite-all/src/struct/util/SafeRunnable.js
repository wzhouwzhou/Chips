'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Runnable } = require('./Runnable');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * SafeRunnable Interface
 *
 * @abstract
 * @interface
 */
const SafeRunnable = class SafeRunnable extends Runnable {
  constructor(funcs = []) {
    const myfuncs = Array.from(new Set([...funcs, 'shouldRun']));
    super(myfuncs);
    this.funcs = myfuncs;
    ensureAbstract(this, SafeRunnable);
    this.constructor.isImplemented(this);
  }
};

exports.SafeRunnable = SafeRunnable;
