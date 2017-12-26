const rs = s => s.length == 0 ? s : rs(s.substring(1)) + s[0];
const rsw = s => { let rw = ''; s.split(/\s+/).forEach(word => rw += `${rs(word)} `); return rw; };
const cb = '```';
ex = {
  name: 'reverse',
  func(msg, { reply, prefix, content }) {
    let reversed = '';
    if (~content.toLowerCase().indexOf('--keepwordorder')) {
      content = content.substring(`${prefix}reverse `.length).replace(/\s+--keepwordorder/, '');
      reversed = rsw(content);
    } else { reversed = rs(content.substring(`${prefix}reverse `.length)); }
    return reply(`${cb}${reversed}${cb}`);
  },
};

module.exports = ex;
