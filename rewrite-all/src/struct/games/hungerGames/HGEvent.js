'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const EventEmitter = require('events');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const HGEvent = class HGEvent extends EventEmitter {
  constructor() {
    super();
    ensureAbstract(this, HGEvent);
  }
};

exports.HGEvent = HGEvent;
