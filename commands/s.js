module.exports = {
  name: "s",
  async func(msg, { send, author, content }) {
    msg.delete();
    if(author.id!=259209114268336129) return;
    content=content.substr(content.indexOf(" ") + 1);
    send(content);
  }
};
