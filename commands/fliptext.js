const flip = require('flip-text')
let arg = args.join(" ");

let flipped = flip(arg);

async func(msg, { reply, author, guild, channel, member, prefix }) {
if (!arg) {
        message.channel.send(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }

message.channel.send("```" + flipped + "```")

module.exports = {
  name: "fliptext",
  perm: ["global.flip"],
  async func(msg, { send }) {
  }
}};
