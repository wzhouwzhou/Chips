module.exports = {
  name: "happy",
  async func(msg, { send }) {
    let chance = Math.floor(8*Math.random());
    switch(chance){
      case 0:
      case 1:
        return send("https://cdn.discordapp.com/attachments/292323883640684547/306399364044161024/5918f56a-fdf4-4130-8178-aabe84b0a0ea.gif");
      case 2:
        return send("");
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      default:
        return send("https://cdn.discordapp.com/attachments/292323883640684547/306399364044161024/5918f56a-fdf4-4130-8178-aabe84b0a0ea.gif");
    }
  }
};
