let d = '', consoleTyping = false;
global.statusC;
const readline = require('readline');

module.exports = function( send ) {
  if(process.env.BETA!=null&&process.env.BETA=='true')
    client.login(process.env.BETATOKEN);
  else{
    console.log('Logging in…');
    client.login(process.env.TOKEN);
    console.log('Chips login called');
  }
  if(client.id!='309504998864060416'){
    hclient.login(process.env.HTOKEN);
    h2client.login(process.env.H2TOKEN);
  }
  h3client.login(process.env.H3TOKEN);

  if(process.env.C2TOKEN!=null&&process.env.C2TOKEN!='')
    c2.login(process.env.C2TOKEN);
  else
    c2.login(require(path.join(__dirname, '../sBotT'))[0]);

  if(process.env.C3TOKEN!=null&&process.env.C3TOKEN!='')
    c3.login(process.env.C3TOKEN);
  else
    c3.login(require(path.join(__dirname, '../sBotT'))[1]);

  client.on('ready', async function() {
    require(path.join(__dirname, '../../handlers/DiepAddons')).getServers();

    setTimeout(async function(){statusC = await client.channels.get(Constants.channels.STATUS); statusC&&send('Chips restart! **' + moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')+'**', statusC);},5000);

    //Console events
    if(client.shard.id===0)
      rl.on('line', (line) => {
        console.log(`Received: ${line}`);
        evalConsoleCommand(line.trim());
      });
      /*stdin.addListener('data', d => {
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
        name: process.env.BETA=='true'?'Chips PTB':'Do -help | PFP credits to Devonx#3388',
        type: 'STREAMING',
        url: 'https://twitch.tv/twitch',
      }
    });

    //setTimeout(()=>{DMLogger = require(path.join(__dirname, '../../handlers/DMLogger'))(Discord, client, dmC, moment);},3000);
  });
  hclient.on('ready', () => {
    testC  = hclient.channels.get(Constants.channels.TEST);
    sLogs  = hclient.channels.get(Constants.channels.SLUGS);
    dmC    = hclient.channels.get(Constants.channels.DMS);
    snLogs = hclient.channels.get(Constants.channels.DWAGONLOGS);

    console.log('Chips helper is ready!');
    hclient.user.setStatus('online');
    //hclient.user.setGame('Chips is bae!');
  });
  h2client.on('ready', _ => {
    sxLogs = h2client.channels.get(Constants.channels.SXLOGS);

    console.log('Chips helper 2 is ready!');
    h2client.user.setStatus('online');
    //h2client.user.setGame('Chips and Chips helper are bae!');
  });
  h3client.on('ready', _ => {
    sLogs2 = h3client.channels.get(Constants.channels.SLUGS);
    nLogs = h3client.channels.get(Constants.channels.SARK);
    stLogs = h3client.channels.get(Constants.channels.HOMEY);

    console.log('Chips helper 3 is ready!');
    h3client.user.setStatus('online');
    //h3client.user.setGame('Chips, Chips2 and Chips3 are bae!');
  });
  c2.on('ready', _ => {
    console.log('Bot is ready!');
  });
  c3.on('ready', _ => {
    console.log('Bot2 is ready!');
  });

  client.on('warn', info => console.log('[DJS Warn] '+info));
  client.on('debug', info => console.log('[DJS Debug] '+info));
  client.on('guildMembersChunk', (members, guild) => console.log(`[DJS Debug] Received new chunk of ${members.size} members for guild |${guild.name}|:|(${guild.id})|`));
  client.on('disconnect', ({ code }) => {
    console.error('[FATAL] Client lost connection to ws, rebooting the bot');
    process.exit(code||404);
  });
  //hclient.on('debug', console.log);
  //h2client.on('debug', console.log);
  //h3client.on('debug', console.log);
  let numCmds = 0;
  const load = (startPath) =>{
    let subset = [];
    if (!fs.existsSync(startPath))
      return;
    let files=fs.readdirSync(startPath);
    files.forEach(f=>{
      let filename=path.join(startPath,f);
      let stat = fs.lstatSync(filename);
      console.log('[COMMAND LOADER] File or folder found: '+filename);
      if (stat.isDirectory()&&(!(/\.cpscmd/.test(filename))))
        subset = subset.concat(load(filename));
      else if (stat.isDirectory()&&/\.cpscmd/.test(filename)){
        try{
          console.log('[COMMAND LOADER] Loading cmd list: '+filename);
          let precmdlist = require(path.join(__dirname, '../../',filename));
          precmdlist.forEach(precmd=>{
            let cmdpath = filename+'/'+precmd[0];
            console.log('[COMMAND LOADER] Loading cmd: '+cmdpath);
            client.commands[precmd[0]] = new Command(precmd[1]);
            subset.push([filename,precmd]);
            numCmds++;
            console.log('[COMMAND LOADER] loaded: '+cmdpath);
          });
        }catch(err){
          console.error('[COMMAND LOADER][ERR] Could not load: ',path.join(__dirname, '../../',filename),err);
        }
      }
    });
    return subset;
  };
  load('./commands');
  console.log('[COMMAND LOADER] Loaded a total of ' + numCmds + ' commands!');
  //const music = require('discord.js-music-v11');
  //music(client, { prefix: '-', anyoneCanSkip: true });
  client.on('guildCreate', g => {
    const scpt = `try { client.channels.get('307624059984674816').send('I just joined a new server! Its name is ${g.name.replace('@','(at)')} and it has ${g.members.size} members!');} catch(err){}`;
    clientutil.broadcastEval(scpt);
    console.log('I just joined a new server! Its name is '+g.name.replace('@','(at)') +' and it has ' + g.members.size + ' members!');
  });

  client.on('guildDelete', gu => {
    try{
      const scpt = `try { client.channels.get('307624059984674816').send('I just left a server! Its name was ${gu.name.replace('@','(at)')} and it had ${gu.members.size} members!');} catch(err){}`;
      clientutil.broadcastEval(scpt);
      console.log('I just left a server! Its name was '+gu.name.replace('@','(at)') +' and it had ' + gu.members.size + ' members!');
    }catch(err){
      console.error(err);
    }
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
    try{
      let r = eval(txt);
      if(r&&r.constructor&&r.constructor.name==='Promise')
        r.catch(e=>{ throw e; });
      console.log(r);
    }catch(err){
      console.error(err);
    }
  }
};

const detectPastes = txt => {
  const pairPastes = _.toPairs(Constants.PASTES);
  for (const i in pairPastes) {
    if (txt == pairPastes[i][0]) {
      console.log('paste ' + i + ' found!');
      return pairPastes[i][1];
    }
  }
  return txt;
};
