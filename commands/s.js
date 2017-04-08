module.exports = {
  name: "s",
  async func(msg, { send, author }) {
    if(author.id!=259209114268336129) return;
    let content=msg.content;
    msg.delete();
    content=content.substr(msg.content.indexOf(" ") + 1);
    send(content);
  }
};
