'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const erlpack = require('erlpack');

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const _keys = new WeakMap;

const Encryptor = class Encryptor {
  constructor(client) {
    this.id = client.shard.id;
    this._client = client;
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
};

exports.Encryptor = Encryptor;
