'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','reverse');
const COLOR = 1;

Logger.debug('Entered into reverse.js');

exports.name = 'reverse';

exports.metadata = {
  categories: ['fun'],

  exec_config: {
    ratelimit_default: {
      user: 1,
      member: 0.1,
      role: 0.01,
      channel: 0.01,
      guild: 0.001,
    },

    flags: ['--keepwordorder'],

    inhibitors: {
      guildOnly: !1,
      ownerOnly: !1,
      enabled: !0,
      hidden: !1,
    },

    bot_permissions: {
      custom: {
        required: [
          'global.fun.text.reverse',
        ],
        optional: [],
      },

      native: {
        required: [
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
          'global.fun.text.reverse',
        ],
        optional: [],
      },

      native: {
        required: [
          'SEND_MESSAGES',
        ],
        optional: [],
      },
    },
  },

  help: {
    usage: ['reverse','This command reverses some text, you can add the --keepwordorder flag to reverse each word separately.' ],
    example: ['reverse some testing text'],
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

  const woReg = /--keep(?:w(?:ord)?)?order/gi;
  settings.wordOrder = woReg.test(ctx.suffix);
  settings._content = ctx.suffix.replace(woReg,'');

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async (
  { send },
  { Discord, rs, rws },
  { embeddable, color, cb, wordOrder, _content },
) => {
  Logger.debug('Entered exec');
  const reversed = wordOrder ? rws(_content) : rs(_content);
  return embeddable
    ? await send('', { embed: new Discord.MessageEmbed().setDescription(reversed).setColor(color) })
    : await send(cb+reversed+cb);
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
