'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('./Serializable');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

/**
 * Stringifiable Interface
 *
 * @abstract
 * @interface
 */
const Stringifiable = class Stringifiable extends Serializable {
  constructor(funcs = []) {
    super(Array.from(new Set([...funcs, 'stringify'])));
    this.funcs = Array.from(new Set([...funcs, 'stringify']));
    ensureAbstract(this, Stringifiable);
    this.constructor.isImplemented(this);
  }
};

exports.Stringifiable = Stringifiable;
