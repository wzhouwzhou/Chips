module.exports = {
  name: "s",
  async func(msg, { send, author, content }) {
    msg.delete();
    if (author.id != Constants.users.WILLYZ) return;
    content = content.substr(content.indexOf(" ") + 1);
    send(content);
  }
};
