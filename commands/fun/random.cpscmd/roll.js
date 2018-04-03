module.exports = {
  name: 'roll',
  func(msg, { reply, content, author, channel }) {
    let par = content.split(' ');
    let atx = content.slice(par[0].length + 1);
    let expr = atx;
    let cind = '#';
    // Comment indicator
    let ns = author.toString();
    let sdx = atx.indexOf(cind);
    if (sdx >= 0) {
      expr = atx.substring(0, sdx);
      ns += ` ${atx.substring(sdx + cind.length)}`;
    }
    ns += `: ${expr} = `;
    expr = expr.split(' ').join('');
    for (let i = 0; i < expr.length; i++) {
      if (!'0123456789+-*/()d'.includes(expr[i])) {
        return reply('error: invalid expression!');
      }
    }
    let dnumt = 0;
    let ncycles = 0;
    while (expr.includes('d')) {
      ncycles += 1;
      if (ncycles > 50) {
        return reply('error: too many separate dice rolls!');
      }
      let dex = expr.indexOf('d');
      let pre = dex - 1;
      for (;pre > -1 && '0123456789'.includes(expr[pre]); pre--);
      let dnum = 1;
      if (pre < dex - 1) dnum = parseInt(expr.substring(pre + 1, dex));
      if (dnum == 0) {
        return reply('error: invalid expression!');
      }
      dnumt += dnum;
      if (dnumt > 99) {
        return reply('error: too many dice rolls!');
      }
      let suf = dex + 1;
      for (;suf < expr.length && '0123456789'.includes(expr[suf]); suf++);
      if (suf == dex + 1) {
        return reply('error: invalid expression!');
      }
      if (suf - dex > 6) {
        return reply('error: dice has too many faces!');
      }
      let dfaces = parseInt(expr.substring(dex + 1, suf));
      let rolls = '';
      for (let i = 0; i < dnum; i++) {
        if (i != 0) rolls += '+';
        let nrol = Math.ceil(Math.random() * dfaces);
        rolls += nrol.toString();
      }
      expr = `${expr.substring(0, pre + 1)}(${rolls})${expr.substring(suf)}`;
    }
    try {
      let evaled = eval(expr);
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      ns += `${expr} = ${evaled}`;
      ns = ns.split('*').join('\\*');
      if (ns.length >= 2000) {
        return reply('error: result exceeds message size limit!');
      }
      return channel.send(ns);
    } catch (e) {
      return reply('evaluation error...');
    }
  },
};
