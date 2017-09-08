'use strict';
Object.defineProperty(exports,'__esModule', { value: true });

const Logger = require('../../../struct/client/Logger').create('command','reverse');
const COLOR = 1;

Logger.debug('Entered into reverse.js');

exports.name = 'reverse';

Logger.debug('Assembling reverse metadata...');
const metarel = '/metadata/reverse.json';

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
