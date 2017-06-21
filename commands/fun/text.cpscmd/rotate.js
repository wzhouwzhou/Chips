
const backslash = input => {
  let pushed = input+'\n';
  let split = input.split('');
  while(true){
    split.unshift(split.pop());
    let next = split.join('');
    while(true){
      if(next[0]==' ')
        next = next.substring(1);
      else break;
    }
    pushed += next+'\n';
    if(input.replace(/\s+/,'')==next.replace(/\s+/,''))
      break;
  } return pushed;
};

const cb = '```';

module.exports = {
  name: "rotate",
  async func(msg, { args, send }) {
    if(args[0]==('\\'))
      send(`${cb}${backslash(_.drop(args).join(' '))}${cb}`);
  }
};
