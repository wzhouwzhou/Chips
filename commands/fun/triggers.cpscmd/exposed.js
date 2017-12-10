module.exports = {
  name: 'exposed',
  async func(msg, { send }) {
    return send(`*Exp${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
  },
};
