'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const io = require('socket.io-client');

const Logger = require('./Logger').create('GatewayClient', 'Main');
const { Encryptor } = require('../util/Encryptor');

const _keys = new WeakMap;

const GatewayClient = class GatewayClient {
  constructor(client) {
    this.myid = client.shard.id;
    _keys.set(this, client.token);
    this.lastpings = [];
    this.crypt = new Encryptor(client);
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
      const dec = this.crypt.decrypt(data);
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
        this.socket.emit('message', this.crypt.encrypt({ type: 'pong', data, senderid: this.myid }));
        this.socket.emit('message', this.crypt.encrypt({
          type: 'ping2',
          data: { time: new Date + [] },
          senderid: this.myid,
        }));
      } else if (type === 'pong2') {
        Logger.debug(`Client received a roundtrip ping ${new Date - new Date(data.time)}ms from socket ${senderid}`);
        this.lastpings.push((new Date - new Date(data.time)) / 2);
        this.lastpings.reverse();
        this.lastpings.length = Math.min(this.lastpings.length, 3);
        this.lastpings.reverse();
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

  getPingAvg() {
    return ~~(100 * this.lastpings.reduce((a, b) => a + b, 0) / this.lastpings.length) / 100;
  }
};

exports.GatewayClient = GatewayClient;
