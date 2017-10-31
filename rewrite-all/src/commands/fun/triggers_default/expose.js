'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command', 'exposed');
const COLOR = 1;

Logger.debug('Entered into exposed.js');

exports.name = 'exposed';
exports.trigger = /^expo+se/i;

Logger.debug('Assembling exposed metadata...');
const metarel = '/metadata/exposed.json';

exports.metapath = __dirname + metarel;
exports.metadata = require(`.${metarel}`);
delete require.cache[require.resolve(`.${metarel}`)];
Logger.debug('Metadata assembly done!');

exports.handle = async(
  ctx,
  modules
) => {
  Logger.debug('Entered handle');

  return await this.selfPreHandle(ctx, modules);
};

exports.selfPreHandle = async(
  ctx,
  modules,
  settings = {}
) => {
  Logger.debug('Entered selfPreHandle');

  settings.embeddable = ctx.guild ? ctx.guild.me.hasPermission('EMBED_LINKS') : !0;
  settings.color = ctx.guild ? ctx.member.displayColor : COLOR;
  settings.EXPOSE = `*Exp${'o'.repeat(modules._.random(2, 15 - 4))}sed!*`;

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async(
  { send },
  { Discord },
  { embeddable, color, EXPOSE }
) => {
  Logger.debug('Entered exec');

  return embeddable ?
    await send(new Discord.MessageEmbed().setDescription(EXPOSE).setColor(color)) :
    await send(EXPOSE);
};

exports.selfPostHandle = async(
  ctx,
  modules,
  settings,
  result
) => {
  Logger.debug('Entered selfPostHandle');

  return result;
};
