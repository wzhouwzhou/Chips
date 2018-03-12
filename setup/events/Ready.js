/* eslint no-undef: 'off', no-console: 'off' */
const GW = require('../../rewrite-all/src/struct/client/GatewayClient').GatewayClient;

module.exports = send => {
  if (process.env.BETA !== null && process.env.BETA === 'true') {
    client.database.load().then(() => client.login(process.env.BETATOKEN));
  } else {
    console.log('Logging in…');
    client.database.load().then(() => client.login(process.env.TOKEN));
    console.log('Chips login called');
  }
  if (client.id !== '309504998864060416') {
    hclient.login(process.env.HTOKEN);
    h2client.login(process.env.H2TOKEN);
  }
  h3client.login(process.env.H3TOKEN);

  if (process.env.C2TOKEN && process.env.C2TOKEN !== '') c2.login(process.env.C2TOKEN);
  else c2.login(require(path.join(__dirname, '../sBotT'))[0]);

  if (process.env.C3TOKEN && process.env.C3TOKEN !== '') c3.login(process.env.C3TOKEN);
  else c3.login(require(path.join(__dirname, '../sBotT'))[1]);
  let bumps = ['dbump', '=bump', 'dlm!bump', ';;bump'];
  setInterval(() => bumps.forEach(e => c3.channels.get('315264060226535424').send(e)), 2 * 60 * 60 * 1000);

  client.on('ready', async() => {
    require(path.join(__dirname, '../../handlers/DiepAddons')).getServers();
    try {
      console.log(`[DBLOADER][DB] Latest start: ${await client.database.fetchLastStartStatus()}`);
      await client.database.writeLastStart();
    } catch (err) {
      console.error('Unable to save starts');
    }
    setTimeout(async() => { statusC = await client.channels.get(Constants.channels.STATUS); statusC && send(`Chips restart! **${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}**`, statusC); }, 5000);

    const MH = require('../../rewrite-all/src/struct/music/MusicHandler').default;
    client.mh = new MH(0, client);

    client.mhfunc = async() => {
      await client.mh.startNCSBroadcast()
        .then(() => client.mh.playAllNCS());
      await client.mh.startMonstercatBroadcast()
        .then(() => client.mh.playAllMonstercat());
      await client.mh.startLMBroadcast()
        .then(() => client.mh.playAllLM());
      await client.mh.startChillHopBroadcast()
        .then(() => client.mh.playAllChillHop());
      await client.mh.startWQXRBroadcast()
        .then(() => client.mh.playAllWQXR());
      await client.mh.startTGLBroadcast()
        .then(() => client.mh.playAllTGL());
    };
    client.mhfunc();
    client.musicCheck = setInterval(client.mhfunc, 30 * 60 * 1000);
    // Console events
    if (client.shard.id === 0) {
      rl.on('line', line => {
        console.log(`Received: ${line}`);
        evalConsoleCommand(line.trim());
      });
    }
    /* Stdin.addListener('data', d => {
          if (testC == null) {
            return;//console.log('YOU HAVEN'T DEFINED AN OUTPUT CHANNEL');
          }
          if (consoleTyping == false) {
            consoleTyping = true;
            rl.question('\x1b[1mInput? \x1b[0m', txt => {
              console.log('\x1b[0m', '\tConsole input:', txt);
              if (txt == '') {
                consoleTyping = false;
              } else {
                evalConsoleCommand(txt);
                consoleTyping = false;
              }
            });
          }
      });*/

    console.log('Chips is booting up!');
    client.user.setStatus('online');
    client.user.setPresence({
      status: 'online',
      activity: {
        name: `${process.env.BETA}` === 'true' ? 'Chips PTB' : '-info bot | support.chipsbot.me | And, when you want something, all the universe conspires in helping you to achieve it.',
        type: 'STREAMING',
        url: 'https://twitch.tv/twitch',
      },
    });

    client.gatewayc = new GW(client).socketInit();
    // SetTimeout(()=>{DMLogger = require(path.join(__dirname, '../../handlers/DMLogger'))(Discord, client, dmC, moment);},3000);
  });
  hclient.on('ready', () => {
    testC = hclient.channels.get(Constants.channels.TEST);
    sLogs = hclient.channels.get(Constants.channels.SLUGS);
    dmC = hclient.channels.get(Constants.channels.DMS);
    snLogs = hclient.channels.get(Constants.channels.DWAGONLOGS);

    console.log('Chips helper is ready!');
    hclient.user.setStatus('online');
    // Hclient.user.setGame('Chips is bae!');
  });
  h2client.on('ready', _ => {
    sxLogs = h2client.channels.get(Constants.channels.SXLOGS);

    console.log('Chips helper 2 is ready!');
    h2client.user.setStatus('online');
    // H2client.user.setGame('Chips and Chips helper are bae!');
  });
  h3client.on('ready', _ => {
    sLogs2 = h3client.channels.get(Constants.channels.SLUGS);
    nLogs = h3client.channels.get(Constants.channels.SARK);
    stLogs = h3client.channels.get(Constants.channels.HOMEY);

    console.log('Chips helper 3 is ready!');
    h3client.user.setStatus('online');
    // H3client.user.setGame('Chips, Chips2 and Chips3 are bae!');
  });
  c2.on('ready', _ => {
    console.log('Bot is ready!');
  });
  c3.on('ready', _ => {
    console.log('Bot2 is ready!');
  });

  client.on('warn', info => console.log(`[DJS Warn] ${info}`));
  client.on('debug', info => console.log(`[DJS Debug] ${info}`));
  // client.on('guildMembersChunk', (members, guild) => console.log(`[DJS Debug] Received new chunk of ${members.size} members for guild |${guild.name}|:|(${guild.id})|`));
  client.on('disconnect', ({ code }) => {
    console.error('[FATAL] Client lost connection to ws, rebooting the bot');
    process.exit(code || 404);
  });
  // Hclient.on('debug', console.log);
  // h2client.on('debug', console.log);
  // h3client.on('debug', console.log);
  let numCmds = 0;
  client.loadErrors = new Map;
  const load = startPath => {
    let subset = [];
    if (!fs.existsSync(startPath)) return;
    let files = fs.readdirSync(startPath);
    files.forEach(f => {
      let filename = path.join(startPath, f);
      let stat = fs.lstatSync(filename);
      console.log(`[COMMAND LOADER] File or folder found: ${filename}`);
      if (stat.isDirectory() && !/\.cpscmd/.test(filename)) { subset = subset.concat(load(filename)); } else if (stat.isDirectory() && /\.cpscmd/.test(filename)) {
        try {
          console.log(`[COMMAND LOADER] Loading cmd list: ${filename}`);
          let precmdlist = require(path.join(__dirname, '../../', filename));
          precmdlist.forEach(precmd => {
            let cmdpath = `${filename}/${precmd[0]}`;
            console.log(`[COMMAND LOADER] Loading cmd: ${cmdpath}`);
            client.commands[precmd[0]] = new Command(precmd[1]);
            subset.push([filename, precmd]);
            numCmds++;
            console.log(`[COMMAND LOADER] loaded: ${cmdpath}`);
          });
        } catch (err) {
          const full = path.join(__dirname, '../..', filename);
          const backreg = new RegExp(_.escapeRegExp(path.join(__dirname, '../..')), 'gi');
          const item = full.replace(backreg, '%');
          const error = err.stack.replace(backreg, '%');
          errstr = `[COMMAND LOADER][ERR] Could not load: ${item}\n${error}`;
          console.log(errstr);
          client.loadErrors.set(filename, errstr);
        }
      }
    });
    return subset;
  };
  load('./commands');
  console.log(`[COMMAND LOADER] Loaded a total of ${numCmds} commands!`);
  // Const music = require('discord.js-music-v11');
  // music(client, { prefix: '-', anyoneCanSkip: true });
  client.on('guildCreate', g => {
    require('snekfetch').get(`${Constants.APIURL}bothooks`)
      .set('Authorization', process.env.RETHINKPSWD)
      .set('X-Data-Src', require('erlpack').pack({
        content: ' ',
        embeds: [{
          title: 'Guild Join',
          description: [
            `**ID:** ${g.id}`,
            `**Name:** ${g.name}`,
            `**${g.members.size}** members`,
            `**Owner:** ${g.owner + []}, ${g.owner.user.tag}`,
          ].join('\n'),
          color: _.random(1, 0xfffffe),
        }],
      }).toString('base64'))
      .then(r => console.log(r.body));

    console.log(`I just joined a new server ${g.id}! Its name is ${g.name.replace('@', '(at)')} and it has ${g.members.size} members! It id owned by <@${g.ownerID}>, ${g.owner.user.tag}`);
  });

  client.on('guildDelete', g => {
    require('snekfetch').get(`${Constants.APIURL}bothooks`)
      .set('Authorization', process.env.RETHINKPSWD)
      .set('X-Data-Src', require('erlpack').pack({
        content: ' ',
        embeds: [{
          title: 'Guild Leave',
          description: [
            `**ID:** ${g.id}`,
            `**Name:** ${g.name}`,
            `**${g.members.size}** member(s)`,
            `**Owner:** ${g.owner + []}, ${g.owner.user.tag}`,
          ].join('\n'),
          color: _.random(1, 0xfffffe),
        }],
      }).toString('base64'))
      .then(r => console.log(r.body));

      console.log(`I just left a server ${g.id}, its name was ${g.name.replace(/@/g, '(at)')} and it had ${g.members.size} members! It was owned by <@${g.ownerID}>, ${g.owner.user.tag}`);
  });
  require('./GuildMemberAdd')();
};


const evalConsoleCommand = txt => {
  txt = detectPastes(txt);
  if (txt == 'monitor') {
    monitorMode = true;
    console.log('\tActivating Monitor Mode');
  } else if (txt == 'unmon') {
    monitorMode = false;
    console.log('\tDeactivating Monitor Mode');
  } else {
    try {
      let r = eval(txt);
      if (r && r.constructor && r.constructor.name === 'Promise') r.catch(e => { throw e; });
      console.log(r);
    } catch (err) {
      console.error(err);
    }
  }
};

const detectPastes = txt => {
  const pairPastes = _.toPairs(Constants.PASTES);
  for (const i in pairPastes) {
    if (txt == pairPastes[i][0]) {
      console.log(`paste ${i} found!`);
      return pairPastes[i][1];
    }
  }
  return txt;
};
