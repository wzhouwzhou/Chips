'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const DBPunishmentSaver = class DBPunishmentSaver extends require('./DBPlugin').DBPlugin {
  constructor(database) {
    super({
      name: 'punishmentsaver',
      database,
    });

  }
};
