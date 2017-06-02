module.exports = {
  name: "aboose",
  perm: ["server.aboose"],
  async func(msg, { send }) {
    send("*Aboooosed!*");
  }
};
