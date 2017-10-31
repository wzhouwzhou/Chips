const gifs = [
  'https://i.imgur.com/xVMT4eS.gif',
  'https://i.imgur.com/vuzemSp.gif',
  'https://i.imgur.com/XXZSPRN.gif',
  'https://i.imgur.com/dxGpQbT.gif',
  'https://i.imgur.com/HElXgBG.gif',
  'https://i.imgur.com/b4cCxJe.gif',
  'https://i.imgur.com/JNRJTfO.gif',
  'https://i.imgur.com/3e4F3pI.gif',
  'https://i.imgur.com/rpeskCl.gif',
  'https://i.imgur.com/aT4BkiS.gif',
  'https://i.imgur.com/8eKhTGq.gif',
  'https://i.imgur.com/d9AD2WN.gif',
  'https://i.imgur.com/sqG4xnS.gif',
  'https://i.imgur.com/yr5V88m.gif',
  'https://i.imgur.com/OspLu6e.gif',
  'https://i.imgur.com/oOFFnyv.gif',
];

module.exports = {
  name: 'happy',
  async func(msg, { send }) {
    return send(gifs[_.random(0, gifs.length - 1)]);
  },
};
