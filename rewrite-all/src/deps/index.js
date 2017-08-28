'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const rrequire = (m) => {
  delete require.cache[require.resolve(m)];
  return require(m);
};

const Discord = rrequire('discord.js');
exports.Discord = Discord;

const fs = rrequire('fs');
exports.fs = fs;
