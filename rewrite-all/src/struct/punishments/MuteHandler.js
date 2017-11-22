'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../../util/Serializable');
const { Mute } = require('./Mute');

const MuteHandler = class MuteHandler extends Serializable {
  constructor(pHandler) {
    super();
    this.id = pHandler.id || 0;

    this.pHandler = pHandler;
    this.guild = pHandler.guild;
    this.log = new Map;
  }

  mute(opts) {
    const mute = new Mute(opts);
    mute.execute();
    this.save(mute);
  }

  save(mute) {
    this.log.set(Date.now(), mute);
    this.pHandler.save('mute', Date.now(), mute);
  }
};

exports.MuteHandler = MuteHandler;
