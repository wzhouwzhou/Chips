'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../../util/Serializable');
const { Kick } = require('./Kick');

const KickHandler = class KickHandler extends Serializable {
  constructor(pHandler) {
    super();
    this.id = pHandler.id || 0;

    this.pHandler = pHandler;
    this.guild = pHandler.guild;
    this.log = new Map;
  }

  kick(opts) {
    const kick = new Kick(opts);
    kick.execute();
    this.log.set(Date.now(), kick);
  }
};

exports.KickHandler = KickHandler;
