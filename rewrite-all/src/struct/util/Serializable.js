'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Interface } = require('./Interface');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const Serializable = /*interface*/ class Serializable extends Interface {
  constructor () {
    super();
    ensureAbstract(this, Serializable);
  }

  serialize () { }
};

exports.Serializable = Serializable;
