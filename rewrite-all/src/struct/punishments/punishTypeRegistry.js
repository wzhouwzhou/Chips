'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');

exports.mutePath = path.join(__dirname, './Mute');
exports.banPath = path.join(__dirname, './Ban');
exports.kickPath = path.join(__dirname, './Kick');

exports.__init__ = () => {
  Object.defineProperty(exports, 'Mute', { get: () => {
    const { Mute } = require(exports.mutePath);
    delete require.cache[require.resolve(exports.mutePath)];
    return Mute;
  },
  });

  Object.defineProperty(exports, 'Ban', { get: () => {
    const { Ban } = require(exports.banPath);
    delete require.cache[require.resolve(exports.banPath)];
    return Ban;
  },
  });

  Object.defineProperty(exports, 'Kick', { get: () => {
    const { Kick } = require(exports.mutePath);
    delete require.cache[require.resolve(exports.kickPath)];
    return Kick;
  },
  });
};

exports.__init__();
