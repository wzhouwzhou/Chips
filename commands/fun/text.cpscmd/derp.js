
module.exports = {
  name: "derp",
  async func(msg, { args, send }) {
    send(args.join(' ').replace(/[^\s]{2,2}/g, m=>`${m[0].toUpperCase()}${m[1]}`));
  }
};
