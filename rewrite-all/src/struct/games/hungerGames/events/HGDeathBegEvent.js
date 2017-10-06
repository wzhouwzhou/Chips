'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGConflictEvent } = require('./HGConflictEvent');

const HGDeathBegEvent = class HGDeathBegEvent extends HGConflictEvent {
  constructor () {
    super();
  }
};

exports.HGDeathBegEvent = HGDeathBegEvent;
