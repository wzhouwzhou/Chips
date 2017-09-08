'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','derp');
const COLOR = 1;

Logger.debug('Entered into derp.js');

exports.name = 'derp';

Logger.debug('Assembling reverse metadata...');
const metarel = '/metadata/derp.json';

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

  settings.derp = ctx.suffix.replace(/[^\s]{1,2}/g, m => `${m[0].toUpperCase()}${m[1]?m[1].toLowerCase():''}`);

  const result = await this.exec(ctx, modules, settings);
  return await this.selfPostHandle(ctx, modules, settings, result);
};

exports.exec = async (
  { send },
  { Discord },
  { embeddable, color, cb, derp },
) => {
  Logger.debug('Entered exec');

  return embeddable
    ? await send('', { embed: new Discord.MessageEmbed().setDescription(derp).setColor(color) })
    : await send(cb+derp+cb);
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
