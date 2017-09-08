'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','randomcaps');
const COLOR = 1;

Logger.debug('Entered into randomcaps.js');

exports.name = 'randomcaps';

exports.metadata = {
  categories: ['fun'],

  exec_config: {
    ratelimit_default: {
      user: 3,
      member: 1,
      role: 0.01,
      channel: 0.01,
      guild: 0.001,
    },

    inhibitors: {
      guildOnly: !1,
      ownerOnly: !1,
      enabled: !0,
      hidden: !1,
    },

    bot_permissions: {
      custom: {
        required: [
          'global.fun.text.randomcaps',
        ],
        optional: [],
      },

      native: {
        require: [
          'SEND_MESSAGES',
        ],
        optional: [
          'EMBED_LINKS',
        ]
      },
    },

    user_permissions: {
      custom: {
        required: [
          'global.fun.text.randomcaps',
        ],
        optional: [],
      },

      native: {
        require: [
          'SEND_MESSAGES',
        ],
        optional: [],
      },
    },
  },

  help: {
    usage: ['randomcaps','This command randomly capitalises the letters in your sentences.' ],
    example: ['randomcaps some testing text'],
  },
};

exports.handle = async (
  ctx,
  modules
) => {
  Logger.debug('Entered handle');

  return await this.selfPreHandle (ctx, modules);
};

exports.selfPreHandle = async (
  ctx,
  modules,
  settings = {}
) => {
  Logger.debug('Entered selfPreHandle');

  settings.embeddable = ctx.guild ? ctx.guild.me.hasPermission('EMBED_LINKS') : !0;
  settings.color = ctx.guild ? ctx.member.displayColor : COLOR;
  settings.cb = '\u0070'.repeat(3);

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async (
  { send, suffix },
  { Discord, randomCapsF },
  { embeddable, color, cb },
) => {
  Logger.debug('Entered exec');

  return embeddable
    ? await send('', { embed: new Discord.MessageEmbed().setDescription(randomCapsF(suffix)).setColor(color) })
    : await send(cb+randomCapsF(suffix)+cb);
};

exports.selfPostHandle  = async (
  ctx,
  modules,
  settings,
  result
) => {
  Logger.debug('Entered selfPostHandle');

  return result;
};
