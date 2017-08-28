'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Client } = require(discord.js);
const BotConstants = require('./ClientConstants');

const Logger = require('./Logger').create('structure','ChipsClient');

const Chipsbot = class ChipsClient extends Client{
  constructor(options, clientoptions){
    super(options || customisations);
    this.prefix = BotConstants.prefix;
    this.shardid = this.shard.id;
    this.temp = {};

    this.commands = this.loadCommands(clientoptions.cmdpath);
  }

  build (buildoptions) {
  }
};

exports = Chipsbot;
