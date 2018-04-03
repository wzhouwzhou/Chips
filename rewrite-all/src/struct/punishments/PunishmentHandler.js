'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../util/Serializable');

const { MuteHandler, BanHandler, KickHandler } = require('./punishTypeRegistry');

const PunishmentHandler = class PunishmentHandler extends Serializable {
  constructor(opts) {
    super();
    const { client, guildid, punishOptions } = opts || {};
    this._client = client;
    this.id = guildid;
    this.guild = this._client ? this._client.guilds.get(this.id || 0) : null;
    this.punishOptions = punishOptions;

    for (const [k, v] of Object.entries(Object.assign({},
      opts,
      { client: undefined, guildid: undefined, punishOptions: undefined })
    )) this[k] = v;

    this.muteHandler = opts.muteHandler || new MuteHandler(this);
    this.banHandler = opts.banHandler || new BanHandler(this);
    this.kickHandler = opts.kickHandler || new KickHandler(this);

    if (this.guild) this.active = true;
  }

  mute({ targets, executors, reason, duration }) {
    return this.muteHandler.mute({ targets, executors, reason, duration });
  }

  ban({ targets, executors, reason, duration, bantype }) {
    return this.banHandler.ban({ targets, executors, reason, duration, bantype });
  }

  kick({ targets, executors, reason }) {
    return this.kickHandler.kick({ targets, executors, reason });
  }

  execute(punishment, { targets, executors }, metadata) {
    switch (punishment) {
      case 'mute': {
        return this.mute(Object.assign({ duration: 10 }, { targets, executors }, metadata));
      }
      default: {
        throw new Error(`Invalid punishment type of ${punishment} received`);
      }
    }
  }
};

exports.PunishmentHandler = PunishmentHandler;
