'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const io = require('socket.io-client');
const erlpack = require('erlpack');

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const Logger = require('./Logger').create('GatewayClient', 'Main');

const _keys = new WeakMap;

const GatewayClient = class GatewayClient {
  constructor(client) {
    this.myid = client.shard.id;
    _keys.set(this, client.token);
  }

  encrypt(item) {
    const buffer = erlpack.pack(item);
    const cipher = crypto.createCipher(algorithm, _keys.get(this));
    const final = Buffer.concat([cipher.update(buffer), cipher.final()]).toString('base64');
    return final;
  }

  decrypt(str) {
    const buffer = new Buffer(str, 'base64');
    const decipher = crypto.createDecipher(algorithm, _keys.get(this));
    const final = erlpack.unpack(Buffer.concat([decipher.update(buffer), decipher.final()]));
    return final;
  }

  socketInit() {
    this.socket = io(process.env.GATEWAY);
    this.event_disconnect();
    this.event_HBConnect();
    return this;
  }

  event_message() {
    this.socket.on('message', data => {
      const dec = this.decrypt(data);
      this.handleMessage(dec);
    });
  }

  handleMessage({ room, type, data, senderid }) {
    if (room === 'heartbeat' && type === 'ping') {
      if (senderid === this.id) return true;
      Logger.debug(`Client received a ping ${new Date - new Date(data.time)}ms from socket ${senderid}`);
      this.socket.emit('message', this.encrypt({ type: 'pong', data: { time: new Date + [] }, senderid: this.id }));
    }
    if (type === 'debug') console.dir(data);
    return this;
    // return this.msgHandles[type]({ room, type, data, senderid });
  }

  event_disconnect() {
    Logger.warn('Disconnected from host');
  }

  event_HBConnect() {
    this.socket.on('connect', () => {
      this.socket.emit('room', 'heartbeat');
      Logger.debug('Heartbeat room request');
    });
    return this;
  }
};

exports.GatewayClient = GatewayClient;
