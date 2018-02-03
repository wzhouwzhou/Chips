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

  encrypt(item, i = 0) {
    const buffer = erlpack.pack(item);
    const cipher = crypto.createCipher(algorithm, _keys.get(this));
    const final = Buffer.concat([cipher.update(buffer), cipher.final()]).toString('base64');
    if (i <= 0) return final;
    else return this.encrypt(final, i - 1);
  }

  decrypt(str, i = 0) {
    const buffer = new Buffer(str, 'base64');
    const decipher = crypto.createDecipher(algorithm, _keys.get(this));
    const final = erlpack.unpack(Buffer.concat([decipher.update(buffer), decipher.final()]));
    if (i <= 0) return final;
    else return this.decrypt(final, i - 1);
  }

  setKey(newKey, oldKey) {
    if (_keys.get(this) !== oldKey) return false;
    _keys.set(this, newKey);
    return true;
  }
};

exports.Encryptor = Encryptor;
