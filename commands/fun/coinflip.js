const flip=()=>{return(_.random([+[]]+[],[+!+[]]+[])==[+[]]+[])?"Heads":"Tails";};

module.exports = {
  name: "coinflip",
  perm: ['server.coinflip'],
  async func(msg, { reply }) {
    return reply(flip());
  }
};
