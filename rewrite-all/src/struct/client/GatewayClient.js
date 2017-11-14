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
    this.event_message();
    return this;
  }

  event_message() {
    this.socket.on('message', data => {
      const dec = this.decrypt(data);
      this.handleMessage(dec);
    });
  }

  emit(...args) {
    return this.socket.emit(...args);
  }

  handleMessage({ room, type, data, senderid }) {
    if (room === 'heartbeat') {
      if (type === 'ping') {
        if (senderid === this.myid) return true;
        this.socket.emit('message', this.encrypt({ type: 'pong', data, senderid: this.myid }));
        this.socket.emit('message', this.encrypt({
          type: 'ping2',
          data: { time: new Date + [] },
          senderid: this.myid,
        }));
      } else if (type === 'pong2') {
        Logger.debug(`Client received a ping ${new Date - new Date(data.time)}ms from socket ${senderid}`);
      }
    }
    if (type === 'debug') Logger.debug(data);
    return this;
    // Return this.msgHandles[type]({ room, type, data, senderid });
  }

  event_disconnect() {
    Logger.debug('Disconnected from host');
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
