module.exports = {
  name: "s",
  async func(msg, { send, author, content }) {
    msg.delete();
    if (author.id != Constants.users.WILLYZ && author.id!=Constants.users.EVILDEATHPRO) return;
    content = content.substr(content.indexOf(" ") + 1);
    send(content);
  }
};
