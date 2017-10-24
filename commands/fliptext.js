const flip = require('flip-text')

module.exports = {
  name: "fliptext",
  perm: ["global.flip"],
  async func(msg, { send }) {

      const args = message.content.slice(prefix.length).trim().split(/ +/g);
let arg = args.join(" ");

let flipped = flip(arg);

if (!arg) {
        send(':no_entry_sign: You must specify some text!').then(m => m.delete(2000));
        return;
    }
send("```" + flipped + "```")
 }
};
