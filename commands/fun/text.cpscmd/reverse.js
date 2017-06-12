const rs = (s)=> s.length==0?s:rs(s.substring(1)) + s[0];
const cb = '```';
ex = {
  name:'reverse',
  perm:['global.server.reverse'],
  customperm:['SEND_MESSAGES'],
  async func(msg, { reply, prefix, content }) {
    let reversed = rs(content.substring((prefix+'reverse ').length));
    return reply(`${cb}${reversed}${cb}`);
  }
};
