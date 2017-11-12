'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');

exports.mutePath = path.join(__dirname, './Mute');
exports.banPath = path.join(__dirname, './Ban');
exports.kickPath = path.join(__dirname, './Kick');

exports.muteHPath = path.join(__dirname, './MuteHandler');
exports.muteHPath = path.join(__dirname, './BanHandler');
exports.muteHPath = path.join(__dirname, './KickHandler');

exports.__init__ = () => {
  Object.defineProperty(exports, 'Mute', { enumerable: true, get: () => {
    const { Mute } = require(exports.mutePath);
    delete require.cache[require.resolve(exports.mutePath)];
    return Mute;
  },
  });

  Object.defineProperty(exports, 'Ban', { enumerable: true, get: () => {
    const { Ban } = require(exports.banPath);
    delete require.cache[require.resolve(exports.banPath)];
    return Ban;
  },
  });

  Object.defineProperty(exports, 'Kick', { enumerable: true, get: () => {
    const { Kick } = require(exports.kickPath);
    delete require.cache[require.resolve(exports.kickPath)];
    return Kick;
  },
  });
};

exports.__init__();
