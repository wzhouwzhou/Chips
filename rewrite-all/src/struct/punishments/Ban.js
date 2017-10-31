'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Punishment } = require('./Punishment');

const Ban = class Ban extends Punishment {
  constructor(options) {
    options.type = 'ban';
    super(options);
  }
};

exports.Ban = Ban;
