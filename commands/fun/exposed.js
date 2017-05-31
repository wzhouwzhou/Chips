module.exports = {
  name: "exposed",
  perm: ["server.exposed"],
  async func(msg, { send }) {
    return send("*Expoooosed!*");
  }
};
