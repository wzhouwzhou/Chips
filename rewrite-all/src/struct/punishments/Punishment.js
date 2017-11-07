'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Serializable } = require('../util/Serializable');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const Punishment = class Punishment extends Serializable {
  constructor(options = {}) {
    super();
    this.executors = options.executors || [];
    this.targets = options.executors || [];
    this.type = options.type;
    this.date = options.date || new Date;
    ensureAbstract(this, Punishment);
    this.constructor.isImplemented(this);

    this.callbacks = {};
  }

  serialize(cache = false) {
    const data = {
      executors: this.executors.map(e => e.id),
      targets: this.targets.map(t => t.id),
      type: this.type,
      date: this.date,
    };
    if (cache) this.data = data;
    return data;
  }

  on(event, callback, original) {
    if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
    if (original && typeof original !== 'function') throw new TypeError('Original callback must be a function');
    this.addCallback(event, callback, original);
    return this;
  }

  once(event, callback) {
    const oncecb = (...args) => {
      this.removeCallback(event, oncecb);
      return callback(...args);
    };

    this.on(event, oncecb, callback);
    return this;
  }

  addCallback(event, callback, original) {
    const callbacks = this.callbacks[event] || [];
    if (!original || !~callbacks.indexOf(original)) callbacks.push(callback);
    this.callbacks[event] = Array.from(new Set(callbacks));
    return callback;
  }

  removeCallback(event, callback) {
    if (!callback) this.callbacks[event] = [];
    let callbacks = this.callbacks[event] || [];
    if (callbacks.length !== 0) {
      if (callbacks.length === 1 && callbacks[0] === callback) {
        callbacks = [];
      } else {
        const ind = !!~callbacks.indexOf(callback);
        if (ind) {
          callbacks.splice(ind, 1);
        }
      }
    }
    if (callbacks.length === 0) delete this.callbacks[event];
    else this.callbacks[event] = callbacks;
    return this;
  }

  emit(event, ...data) {
    for (const cb of this.callbacks[event] || []) {
      // As opposed to setImmediate so that other events will fire first.
      setTimeout(() => cb(...data), 0);
    }
    return data;
  }

  getListeners(event) {
    return this.callbacks[event];
  }
};

exports.Punishment = Punishment;
