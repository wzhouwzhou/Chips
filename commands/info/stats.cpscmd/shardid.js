module.exports = {
  name: 'shardid',
  async func(msg, { send, client }) {
    send(client.shard.id);
  },
};
