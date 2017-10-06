'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGEvent } = require('../HGEvent');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const HGConflictEvent = class HGConflictEvent extends HGEvent {
  constructor() {
    super();
    ensureAbstract(this, HGConflictEvent);
  }
};

exports.HGConflictEvent = HGConflictEvent;
