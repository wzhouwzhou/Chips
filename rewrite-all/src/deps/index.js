'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const rrequire = (m) => {
  delete require.cache[require.resolve(m)];
  return require(m);
};
exports.rrequire = rrequire;

const Discord = rrequire('discord.js');
exports.Discord = Discord;

const fs = rrequire('fs');
exports.fs = fs;

const _ = rrequire('lodash');
exports._ = _;

const path = rrequire('path');
exports.path = path;
