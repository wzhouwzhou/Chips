/* eslint no-console: 'off', no-undef: 'off' */
const cb = '```';
const asciify = require('asciify');

let font = 'letters';

const asciiCooldown = new Map();
const fontlistCooldown = new Map();
const COOLDOWN = 60 * 1000;

const fontlist = [];

module.exports = {
  name: 'ascii',
  async func(msg, { reply, send, prefix, content, guild, args, channel }) {
    if (!args[0]) return reply('No action specified');
    if (args[0] === 'help') return reply('Usage: `ascii font text to asciifi`. View fonts with `ascii listfonts`');

    if (args[0] === 'listfonts') {
      if (!fontlistCooldown.get((guild || channel).id)) {
        fontlistCooldown.set((guild || channel).id, true);
        setTimeout(() => fontlistCooldown.set((guild || channel).id, false), COOLDOWN);
        return send(`Fonts:\n${cb}${await fetchFonts()}${cb}`);
      }
      return send('Woah there this command has a 1 minute cooldown please wait before trying that again!')
        .then(mm => mm.delete({ timeout: 3000 }));
    }

    if (!fontlist || fontlist.length === 0) await fetchFonts();
    // Console.log(`Font to use: ${args[0]}`);
    if (fontlist.join('').indexOf(args[0]) < 0) {
      return reply('Invalid font given!')
        .then(mm => mm.delete({ timeout: 3000 }));
    }
    font = args[0];
    const actionReg = new RegExp(`${_.escapeRegExp(prefix)}ascii\\s+${_.escapeRegExp(font)}\\s*`, 'i');

    const split = content.replace(actionReg, '').split(/\s+/);
    if (split.length <= 0 || !split.every(w => w.length > 0 &&
       !w.match(/\s+/g))) {
      return send('You must provide at least one word to 3dtext!')
        .then(mm => mm.delete({ timeout: 3000 }));
    } else if (split.length <= 5) {
      if (!asciiCooldown.get((guild || channel).id)) {
        asciiCooldown.set((guild || channel).id, true);
        setTimeout(() => asciiCooldown.set((guild || channel).id, false), COOLDOWN);
        return split.forEach(word => (word && !word.match(/\s+/)) && asciify(word, { font }, (e, r) => {
          // (r.match(/\s+/) || [''])[0].length == r.length;
          const str = `${cb}${r && r.length < 1900 ? r : word.length < 1800 ? `too long to asciify:\n${word}` :
            'something too long'}${cb}`;
          if (split.indexOf(word) === 0) return reply(str);
          return send(str);
        }));
      } else {
        return send('Woah there this command has a 1 minute cooldown please wait before trying that again!')
          .then(mm => mm.delete({ timeout: 3000 }));
      }
    } else { return send('Too many words to asciify (>5)!').then(mm => mm.delete({ timeout: 3000 })); }
  },
};

const fetchFonts = () => new Promise((res, rej) => {
  let list = [], overflowOnce = false;
  return asciify.getFonts((err, fonts) => {
    if (err) return rej(err);
    fonts.forEach(fnt => {
      list.push((fnt + ' '.repeat(20)).substring(0, 18));
      if (list.length % 5 === 5)list.push('\n');

      if (list.join('').length > 1900) {
        fontlist.push(list.join(''));
        list = [];
        overflowOnce = true;
      }
    });
    if (!overflowOnce) fontlist.push(list.join(''));
    return res(fontlist);
  });
});
