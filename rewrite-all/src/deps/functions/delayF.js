'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () =>
  const delay = (ms) => new Promise(res => setTimeout(() => res(ms), ms));
  return delay;
};
