'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','aboose');
const COLOR = 1;

Logger.debug('Entered into aboose.js');

exports.name = 'aboose';
exports.trigger = /^ab(?:o){2,}se/i;

Logger.debug('Assembling aboose metadata...');
const metarel = '/metadata/aboose.json';

exports.metapath = __dirname+metarel;
exports.metadata = require(`.${metarel}`);
delete require.cache[require.resolve(`.${metarel}`)];
Logger.debug('Metadata assembly done!');

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
  settings.ABOOSE = `*Ab${'o'.repeat(modules._.random(2,15-4))}se*`;

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async (
  { send },
  { Discord },
  { embeddable, color, ABOOSE }
) => {
  Logger.debug('Entered exec');

  return embeddable
    ? await send(new Discord.MessageEmbed().setDescription(ABOOSE).setColor(color))
    : await send(ABOOSE);
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
