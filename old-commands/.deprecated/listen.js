module.exports = {
  name: "listen",
  async func(msg, { send, channel }) {
    rl.question("Input? ", function(answer) {
      console.log("Console input:", answer);
      send(answer);
      //rl.close();
    });
  }
};
