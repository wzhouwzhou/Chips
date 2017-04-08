module.exports = {
  name: "s",
  async func(msg, { send, author }) {
    let content=msg.content;
    msg.delete();
    if(author.id==259209114268336129)
      send(content);
  }
};
