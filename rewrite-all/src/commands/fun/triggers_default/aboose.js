'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','aboose');
const COLOR = 1;

exports.name = 'aboose';
exports.trigger = /^ab(?:o){2,}se/i;

exports.metadata = {
  categories: ['fun'],

  exec_config: {
    inhibitors: {
      guildOnly: !1,
      ownerOnly: !1,
      enabled: !0,
      hidden: !1,
    },

    bot_permissions: {
      custom: {
        required: [
          'global.fun.triggers_default.aboose',
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
          'global.fun.triggers_default.aboose',
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
    usage: ['aboose',"The command works with 2 or more o's, so aboooose would work as well." ],
    example: 'aboooose',
  },
};

exports.handle = async (ctx, modules) => {
  Logger.debug('Entered handle');

  return await this.selfPreHandle (ctx, modules);
};

exports.selfPreHandle = async (ctx, modules, settings = {}) => {
  Logger.debug('Entered selfPreHandle');

  settings.embeddable = ctx.guild ? ctx.guild.me.hasPermission('EMBED_LINKS') : !0;
  settings.color = ctx.guild ? ctx.member.displayColor : COLOR;
  settings.ABOOSE = `Ab${'o'.repeat(modules._.random(2,15-4))}se`;

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async ({ send }, { Discord }, { embeddable, color, ABOOSE }) => {
  Logger.debug('Entered exec');

  return embeddable
    ? await send('', { embed: new Discord.MessageEmbed().setDescription(ABOOSE).setColor(color) })
    : await send(ABOOSE);
};

exports.selfPostHandle  = async (ctx, modules, settings, result) => {
  Logger.debug('Entered selfPostHandle');

  return result;
};
