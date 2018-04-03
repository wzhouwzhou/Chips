'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../../struct/client/Logger').create('exports', 'fetchMessagesRF');

exports.default = ({ Discord, _ }) => {
  const firstF = require('./firstF').default({ _ });
  const { Collection } = Discord;
  const fetchAuditR = (guild, options = { limit: 100 }, collection = new Collection()) => {
    const limit = options.limit;
    const type = options.type;
    return new Promise((res, rej) => {
      if (typeof limit !== 'number') return rej(new Error('Invalid limit'));
      if (collection.size >= limit) return res(firstF(collection, limit));
      return guild.fetchAuditLogs(Object.assign({}, options,
        { limit: Math.min(options.limit, 100), type })
      ).then(async logs => {
        if (logs.entries.size === 0) return res(collection);
        Array.from(logs.entries.values()).forEach(e => collection.set(e.id, e));
        try {
          return res(await fetchAuditR(guild, {
            limit,
            before: Array.from(logs.entries.values())
              .sort((a, b) => a.createdAt - b.createdAt)[0].id,
            type,
          }, collection));
        } catch (err) {
          Logger.error(err);
          return rej(err);
        }
      }).catch(rej);
    });
  };
  return fetchAuditR;
};
