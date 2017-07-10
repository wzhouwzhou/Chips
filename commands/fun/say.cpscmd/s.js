module.exports = {
  name: "s",
  async func(msg, { send, author, args, content }) {
    if (author.id == Constants.users.WILLYZ || author.id == Constants.users.EVILDEATHPRO){
      msg.delete();
      content = content.substr(content.indexOf(args[0]));
      send(content);
    }
  }
};
