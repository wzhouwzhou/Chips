module.exports = {
  name: "s",
  async func(msg, { send, author, args, content }) {
    msg.delete();
    if ((author.id == Constants.users.WILLYZ || author.id == Constants.users.EVILDEATHPRO)||author.id == Constants.users.KONEKO){
      content = content.substr(content.indexOf(args[0]));
      send(content);
    }
  }
};
