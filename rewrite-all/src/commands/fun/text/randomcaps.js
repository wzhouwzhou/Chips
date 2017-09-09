'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','randomcaps');
const COLOR = 1;

Logger.debug('Entered into randomcaps.js');

exports.name = 'randomcaps';

Logger.debug('Assembling randomcaps metadata...');
const metarel = '/metadata/randomcaps.json';

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
    ? await send(new Discord.MessageEmbed().setDescription(randomCapsF(suffix)).setColor(color))
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
