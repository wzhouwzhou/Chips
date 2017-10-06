'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGEvent } = require('../HGEvent');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const HGActionEvent = class HGActionEvent extends HGEvent {
  constructor() {
    super();
    ensureAbstract(this, HGActionEvent);
  }
};

exports.HGActionEvent = HGActionEvent;
