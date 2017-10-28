'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const Interface = class Interface {
  constructor() {
    ensureAbstract(this, Interface);
  }

  static isImplemented(object) {
    for (const k in Object.keys(this.prototype)) if (typeof this.prototype[k] === 'function') if (!object[k]) throw new Error(`Missing interface function ${k}`);
  }
};

exports.Interface = Interface;
