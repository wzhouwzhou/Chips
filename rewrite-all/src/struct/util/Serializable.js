'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Interface } = require('./Interface');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Serializable Interface
 *
 * @abstract
 * @interface
 */
const Serializable = class Serializable extends Interface {
  constructor(funcs = []) {
    super(Array.from(new Set([...funcs, 'serialize'])));
    this.funcs = Array.from(new Set([...funcs, 'serialize']));
    ensureAbstract(this, Serializable);
    this.constructor.isImplemented(this);
  }
};

exports.Serializable = Serializable;
