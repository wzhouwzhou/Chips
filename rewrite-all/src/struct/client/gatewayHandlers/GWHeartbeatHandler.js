'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('./Logger').create('GatewayHandler', 'Heartbeat');

const GWHeartbeatHandler = class GWHeartbeatHandler extends require('./GatewayHandler') {
  constructor({ gatewayClient }) {
    super({
      gatewayClient,
      trigger: /(ping|pong)\d/i,
      type: 'message',
      disableSelf: true,
      room: 'heartbeat',
    });

    this.typeA = 'ping';
    this.typeB = 'pong';
  }

  run({ type, data, senderid }) {
    if (type === this.typeA) {
      this._client.emit('message', this._client.encrypt({ type: this.typeB, data, senderid: this._client.myid }));
      this._client.emit('message', this._client.encrypt({
        type: `${this.typeA}2`,
        data: { time: new Date + [] },
        senderid: this._client.myid,
      }));
    } else if (type === `${this.typeB}2`) {
      Logger.debug(`Client received a ping ${new Date - new Date(data.time)}ms from socket ${senderid}`);
    }
    return this;
  }
};

exports.GWHeartbeatHandler = GWHeartbeatHandler;
