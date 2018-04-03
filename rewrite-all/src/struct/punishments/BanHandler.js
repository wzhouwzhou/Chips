'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../../util/Serializable');
const { Ban } = require('./Ban');

const BanHandler = class BanHandler extends Serializable {
  constructor(pHandler) {
    super();
    this.id = pHandler.id || 0;

    this.pHandler = pHandler;
    this.guild = pHandler.guild;
    this.log = new Map;
  }

  ban(opts) {
    const ban = new Ban(opts);
    ban.execute();
    this.log.set(Date.now(), ban);
  }
};

exports.BanHandler = BanHandler;
