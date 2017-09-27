module.exports = {
  name: "exposed",
  async func(msg, { send }) {
    return send("*Expoooooooosed!*");
  }
};
