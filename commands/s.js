module.exports = {
  name: "s",
  async func(msg, { send }) {
    if(msg.author.id==259209114268336129)
      send(msg);
    msg.delete();
  }
};
