'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const _ = require('lodash');

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const GatewayHandler = class GatewayHandler extends require('../util/Runnable').Runnable {
  constructor({ trigger, gatewayClient, type, room, disableSelf }) {
    super();
    this._client = gatewayClient;
    this.trigger = typeof trigger === 'string' ? new RegExp(`^${_.escapeRegExp(trigger)}$`) : trigger;
    this.type = type || 'message';
    this.room = room;
    this.disableSelf = disableSelf;

    ensureAbstract(this, GatewayHandler);
  }

  shouldRun({ room, type, senderid }) {
    if (this.room && this.room !== room) return false;
    if (this.type && this.type !== type) return false;
    if (this.disableSelf && this._client.id === senderid) return false;
    return true;
  }
};

exports.GatewayHandler = GatewayHandler;
