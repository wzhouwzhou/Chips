/* eslint no-console: 'off', consistent-return: 'off', no-unused-vars: 'off' */
Object.defineProperty(exports, '__esModule', { value: true });
const express = require('express');
const pmx = require('pmx').init({
  network: true,
  ports: true,
});
const startprobe = pmx.probe();

const SHARDCOUNT = 2;

const Discord = require('discord.js');
let nodefile = ['./chips.js'];
// Setup + start
// Website start
require('./setup/AppSetup')();
const colors = require('chalk');

const changeConsole_1 = require('./setup/logging/changeConsole');
changeConsole_1.default(true);
let Manager;

const start = () => {
  console.log('Master process is running.');
  Manager = new Discord.ShardingManager(nodefile[0], {
    totalShards: SHARDCOUNT,
  });
  Manager.spawn(SHARDCOUNT, 11000).then(shards => {
    exports.shards = shards;
    console.log('Spawned', colors.cyan(shards.size.toString()), 'shards!');
  });
};
exports.start = start;
start();

const app = express();
const router = express.Router();
const port = 2469;

router.use((req, res, next) => {
  console.log(req.url);
  return next();
});

router.use('/api/guildcount', (req, res) => {
  Manager.broadcastEval(`this.guilds.size`).then(results => {
    if (!req.query.callback) {
      res.json({ count: results.reduce((p, v) => p + v, 0) });
    } else {
      res.send(`${req.query.callback}(${JSON.stringify({ count: results.reduce((p, v) => p + v, 0) })})`);
    }
  }).catch(err => {
    console.error(err);
    return res.json({ error: err });
  });
});

router.use('/api/channelcount', (req, res) => {
  Manager.broadcastEval(`this.channels.size`).then(results => {
    if (!req.query.callback) {
      res.json({ count: results.reduce((p, v) => p + v, 0) });
    } else {
      res.send(`${req.query.callback}(${JSON.stringify({ count: results.reduce((p, v) => p + v, 0) })})`);
    }
  }).catch(err => {
    console.error(err);
    return res.json({ error: err });
  });
});
const snek = require('snekfetch');
const posting = async() => {
  try {
    const shardarr = await Manager.broadcastEval(`this.guilds.size`);
    await snek.post('https://discordbots.org/api/bots/296855425255473154/stats')
      .set('Authorization', process.env.DBLTOKEN)
      .send({ shards: shardarr });
  } catch (err) {
    //
  }
};
setInterval(posting, 30 * 60 * 1000);

router.use('/api/ram', (req, res) => {
  Manager.broadcastEval(`(~~(100*process.memoryUsage().rss / 1024 / 1024))/100`).then(results => {
    if (!req.query.callback) {
      res.json({ mb: results.reduce((p, v) => p + v, 0).toFixed(2) });
    } else {
      res.send(`${req.query.callback}(${JSON.stringify({ mb: results.reduce((p, v) => p + v, 0).toFixed(2) })})`);
    }
  }).catch(err => {
    console.error(err);
    return res.json({ error: err });
  });
});

router.use('/api/cpu', (req, res) => {
  Manager.broadcastEval(`Math.ceil(require('os').loadavg()[0] * 100) / 100`).then(results => {
    if (!req.query.callback) {
      res.json({ p: results.reduce((p, v) => p + v, 0).toFixed(2) });
    } else {
      res.send(`${req.query.callback}(${JSON.stringify({ p: results.reduce((p, v) => p + v, 0).toFixed(2) })})`);
    }
  }).catch(err => {
    console.error(err);
    return res.json({ error: err });
  });
});

router.use('/api/membercount', (req, res) => {
  Manager.broadcastEval(`let m = 0; this.guilds.forEach(g=>m+=g.members.size); m`)
    .then(results => {
      if (!req.query.callback) {
        res.json({ count: results.reduce((p, v) => p + v, 0) });
      } else {
        res.send(`${req.query.callback}(${JSON.stringify({ count: results.reduce((p, v) => p + v, 0) })})`);
      }
    }).catch(err => {
      console.error(err);
      return res.json({ error: err });
    });
});

router.use('/api/simpleguildstats', (req, res) => {
  if (!req.headers.guildid) return res.json({ error: 'guildid missing from header' });
  Manager.broadcastEval(`(() => {
    let guild = this.guilds.get('${req.headers.guildid}');
    if (!guild) return null;

    let members_on = guild.members.filter(member => {
      const presence = member.presence;
      switch (presence.status) {
        case 'online':
        case 'idle':
        case 'dnd':
          return true;
        default:
          return false;
      }
    }).size;
    const member_count = guild.members.size;
    const offline = member_count - members_on;

    const object = {
      id: guild.id,
      name: guild.name,
      member_count,
      offline,
      members_on,
    };
    return object;
  })()`)
    .then(results => {
      const gs = results.filter(_ => _);
      if (!gs || !gs[0]) return res.status(404).json({ error: 'no guild' });
      const object = gs[0];
      if (!req.query.callback) {
        res.json(object);
      } else {
        res.send(`${req.query.callback}(${JSON.stringify(object)})`);
      }
    }).catch(err => {
      console.error(err);
      return res.json({ error: err });
    });
});

router.use('/api/guildstats', (req, res) => {
  if (!req.headers.guildid) return res.json({ error: 'guildid missing from header' });
  Manager.broadcastEval(`(() => {
      let guild = this.guilds.get('${req.headers.guildid}');
      if (!guild) return null;
      let members_online = [], members_idle = [], members_dnd = [], members_on = [];

      guild.members.filter(member => {
        const presence = member.presence;
        switch (presence.status) {
          case 'online':
            members_online.push(member.id);
            members_on.push(member.id);
            break;
          case 'idle':
            members_idle.push(member.id);
            members_on.push(member.id);
            break;
          case 'dnd':
            members_dnd.push(member.id);
            members_on.push(member.id);
            break;
        }
        return true;
      });

      const member_count = guild.members.size;
      const offline = member_count - members_on;

      const object = {
        id: guild.id,
        name: guild.name,
        channels: Array.from(guild.channels.values()).map(c => {
          const obj = {
            id: c.id,
            name: c.name,
            topic: c.topic || '',
            nsfw: c.nsfw,
            parent_id: c.parentID,
            type: c.type,
          };
          if (c.members) {
            obj.members = Array.from(c.members.values()).map(m => m.id);
          }
          return obj;
        }),
        roles: Array.from(guild.roles.values()).map(r => ({
          id: r.id,
          name: r.name,
          color: r.color,
          hoist: r.hoist,
          permissions: r.permissions,
        })),
        emojis: Array.from(guild.emojis.entries()).map(e => e + []),
        member_count,
        members_on,
        members_online,
        members_idle,
        members_dnd,
        icon: guild.icon,
        ownerID: guild.ownerID,
        region: guild.region,
        splash: guild.splash,
        verif_lvl: guild.verificationLevel,
      };
      return object;
    })();
    `)
    .then(results => {
      const gs = results.filter(_ => _);
      if (!gs || !gs[0]) return res.status(404).json({ error: 'no guild' });
      const object = gs[0];
      if (!req.query.callback) {
        res.json(object);
      } else {
        res.send(`${req.query.callback}(${JSON.stringify(object)})`);
      }
    }).catch(err => {
      console.error(err);
      return res.json({ error: err });
    });
});

const usercount = startprobe.metric({
  name: 'Total Users',
});
setInterval(async() => {
  usercount.set((await Manager.broadcastEval(`let m = 0; this.guilds.forEach(g=>m+=g.members.size); m`))
    .reduce((p, v) => p + v, 0));
}, 5000);

const histogram = startprobe.histogram({
  name: 'cpuavg',
  measurement: 'mean',
});

let latency = 0;

setInterval(async() => {
  latency = (await Manager.broadcastEval(`require('os').loadavg()[1] * 100`)).reduce((p, v) => p + v, 0);
  histogram.update(latency);
}, 2000);

const memused = startprobe.metric({
  name: 'internalMUsed',
});
setInterval(async() => {
  try {
    memused.set(await Manager.broadcastEval(`process.memoryUsage().heapUsed / 1024 / 1024`)).reduce((p, v) => p + v, 0);
  } catch (err) {
  // ;
  }
}, 750);

const memallo = startprobe.metric({
  name: 'internalMAllo',
});
setInterval(async() => {
  try {
    memallo.set(await Manager.broadcastEval(`process.memoryUsage().heapTotal / 1024 / 1024`)).reduce((p, v) => p + v, 0);
  } catch (err) {
    // Idk;
  }
}, 750);

router.use('/api/inGuild', (req, res) => {
  if (!req.headers.guildid) return res.json({ error: 'guildid missing from header' });
  Manager.broadcastEval(`this.guilds.has("${req.headers.guildid}")`).then(results => {
    if (~results.indexOf(true)) return res.json({ in: true });
    else return res.json({ in: false });
  }).catch(err => {
    console.error(err);
    return res.json({ error: err });
  });
});
process.on('message', m => {
  let obj = m;
  if (typeof m === 'string') {
    try {
      obj = JSON.parse(m);
    } catch (err) {
      return true;
    }
  }
  if (!('type' in obj)) return true;
  if (!/^eval$/i.exec(obj.type)) return true;
  if (!('eval' in obj)) return true;
  return eval(obj.eval);
});
app.use('/', router);
app.listen(port, () => {
  console.log(`2469 api listening on port ${port}`);
});

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const stdProxy = httpProxy.createProxyServer();

const apiRedirect = express();
const apiOpen = express.Router();

const stdRedirect = express();
const stdOpen = express.Router();

const apiPort = 8880;
const stdPort = 80;

apiOpen.get('*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:2469' });
  console.log('Redirected from 8880 to 2469');
  // res.redirect('http://chipsbot.tk:2469'+req.url);
});

stdOpen.get('/api', (req, res) => {
  console.log('Redirecting api from 80 to 8880');
  stdProxy.web(req, res, { target: 'http://localhost:8880' });
});

stdOpen.get('/', (req, res) => {
  console.log('Redirecting / from 80 to 8080');
  stdProxy.web(req, res, { target: 'http://localhost:8080' });
});

apiRedirect.use('/', apiOpen);
apiRedirect.listen(apiPort, () => {
  console.log(`api proxy listening on port${apiPort}`);
});

stdRedirect.use('/', stdOpen);
/* StdRedirect.listen(stdPort, () => {
  console.log('std proxy listening on port' + stdPort);
});
*/
