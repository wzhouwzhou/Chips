'use strict';
module.exports = {
  name: "stats",
  async func(msg, {
    send,
    guild,
    member,
    channel,
    bot,
    Discord,
  }) {
    let start = (new Date).getTime();
    channel.startTyping();
    let globalValues = await getGlobalStats();

    //Lets Get Some Values that are global
    let guildCountG = globalValues[0];
    let channelCountG = globalValues[1];
    let userCountG = globalValues[2];
    let averagePingG = globalValues[3];
    let textCountG = globalValues[4];
    let voiceCountG = globalValues[5];
    let cpuAveG = globalValues[6];
    let memAveG = globalValues[7];
    let totalMemG = globalValues[10];
    //Local Boissss
    //let avatar = bot.user.avatarURL(2048);
    let uptime = formatUptime(process.uptime());
    let currentTime = moment().format('ddd, Do of MMM @ HH:mm:ss.SSS');
    let guilds = bot.guilds.size;
    let channels = bot.channels.size;
    let users = bot.users.size;
    let ping = bot.ping;
    let textChannels = bot.channels.filter(c => c.type === "text").size;
    let voiceChannels = bot.channels.filter(c => c.type === "voice").size;
    let cpuAverage = Math.ceil(require('os').loadavg()[1] * 1000) / 10;
    let memAverage = ~~(2e-1 + process.memoryUsage().heapUsed /1024 / 1024);
    //let memTotal = Math.round(process.memoryUsage().heapTotal / 1024 / 1024);
    //Create the embed
    let embed = new Discord.RichEmbed();
    embed.setTitle(`Chip's Stats Report! Current Time: ${currentTime}`);
    embed.setColor(guild?member.displayColor:1503);

    //embed.setImage("https://cdn.discordapp.com/attachments/307625096078426123/314201502669471744/Chips.jpg");
    embed.addField(`Chips stats for shard ${bot.shard.id+1}/${clientutil.count}:`, [
      ['Shard uptime: ', uptime],
      ['Shard ping (ms): ',ping],
      ['Shard User count:', users],
      ['Server count:', guilds],
      ['Memory:', `${memAverage} MB`],
      ['CPU usage (%):', cpuAverage],
      [`Shard channel count: ${channels}`,`Text Channel Count: ${textChannels}, Voice Channel Count: ${voiceChannels}`],
    ].map(e=>`${e[0]}**${e[1]}**`).join('\n').substring(0,1000));

    embed.addField("Chips 0.3.4 stats across all shards:", [
      ['Total User Count:', userCountG],
      ['Total Server Count:', guildCountG],
      ['Total Channel Count:', channelCountG],
      ['Total Text Channel Count:', textCountG],
      ['Total Voice Channel Count:', voiceCountG],
      ['Average Client Ping:', `${averagePingG} ms`],
      ['Total CPU Usage:', `${cpuAveG}%`],
      ['Total Memory Usage', `${memAveG} of ${totalMemG} MB`],
      [`Node **${process.version}**, lib **v${Discord.version}**`,''],
    ].map(e=>`${e[0]}**${e[1]}**`).join('\n'));
    //console.log('[DEBUG] results from broadcastEval: ' + JSON.stringify(globalValues[9]).replace(/@/,''));
    embed.setFooter(`--Chips stats lookup and calculations took ${(new Date).getTime() - start}MS.--`);
    channel.stopTyping();
    return await send(embed);
  }
};

const getGlobalStats = async () => {
  let results = await clientutil.broadcastEval(`let m = 0; client.guilds.forEach(g=>m+=g.members.size); m`);
  let members = results.reduce((p, v)=>p+v,0);
  results = await clientutil.fetchClientValues('guilds.size');
  let guilds = results.reduce((prev, val) => prev + val, 0);
  results = await clientutil.fetchClientValues('channels.size');
  let channels = results.reduce((prev, val) => prev + val, 0);
  results = await clientutil.fetchClientValues('users.size');
  let users = results.reduce((prev, val) => prev + val, 0);
  results = await clientutil.fetchClientValues('ping');
  let ping = results.reduce((prev, val) => prev + val, 0) / clientutil.count;
  let text=0, voice=0, cpu=0, mem=0, memtotal=0;
  results = await clientutil.broadcastEval(`client.channels.filter(c => c.type === 'text').size`);
  results.forEach(s=>text+=s);
  results = await clientutil.broadcastEval(`client.channels.filter(c => c.type === 'voice').size`);
  results.forEach(s=>voice+=s);
  results = await clientutil.broadcastEval(`Math.ceil(require('os').loadavg()[1] * 1000) / 100`);
  results.forEach(s=>cpu+=s);
  results = await clientutil.broadcastEval(`process.memoryUsage().heapUsed / 1024 / 1024`);
  results.forEach(s=>mem+=s);
  results = await clientutil.broadcastEval(`process.memoryUsage().heapTotal / 1024 / 1024`);
  results.forEach(s=>memtotal+=s);
  return [guilds, channels, members, ping, text, voice, Math.round(cpu), Math.round(mem), users, results, memtotal];
  //        0        1        2        3    4       5        6                 7             8      9        10
};

const formatUptime = (seconds) => {
  let temp = Math.floor(seconds / 60);
  seconds = +((+(seconds % 60)).toFixed(3));
  let minutes = temp % 60;

  temp = Math.floor(temp / 60);
  let hours = temp % 24;

  let days = Math.floor(temp / 24);

  seconds = `${seconds}`;
  minutes = `${minutes}`;
  hours = `${hours}`;
  days = `${days}`;

  return `${days !== '0' ? `${days}:` : ''}${hours}:${minutes}:${seconds}`;
};

/*module.exports = {
  name: "stats",
  perm: ["global.stats"],
  async func(msg, {
    reply,
    channel,
    bot
  }) {
    await channel.startTyping();
    let start = process.hrtime();
    let end;
    let globalTotals = [0, 0, 0, 0, 0, 0.00, 0.00, 0.00];

    //Eval across all shards
    clientutil.broadcastEval(`
      'use strict';

      let startTime  = process.hrtime();
      let startUsage = process.cpuUsage();

      let now = Date.now();
      while (Date.now() - now < 500){}
      let diff = process.hrtime(startTime);
      let elapTime = diff[0] * 1e9 + diff[1];
      let elapUsage = process.cpuUsage(startUsage);

      let elapTimeMS = elapTime;
      let elapUserMS = elapUsage.user;
      let elapSystMS = elapUsage.system;
      let cpuPercent = 100 * ((elapUserMS + elapSystMS) / elapTimeMS);

      console.log('cpu percent: ', cpuPercent + '%');

      let userCount = 0;
      let guildCount = 0;
      let channelCount = 0;
      let textC = 0;
      let voiceC = 0;
      let memusage = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024));
      client.guilds.array().forEach(g=> {
        userCount+=g.members.size;
        console.log(userCount);
        guildCount++;
        g.channels.forEach(c=>{
          switch(c.type){
            case 'text':
            textC++;
            break;
            case 'voice':
            voiceC++;
            break;
          }
          channelCount++;
        });
      });
      let ping = client.ping;
      // 0             1            2     3       4          5         6       7
      [guildCount, channelCount, textC, voiceC, userCount ,memusage, ping, cpuPercent];
    `).then(results => {
      results.forEach(shardStat => {
        globalTotals[0] += shardStat[0];
        globalTotals[1] += shardStat[1];
        globalTotals[2] += shardStat[2];
        globalTotals[3] += shardStat[3];
        globalTotals[4] += shardStat[4];
        globalTotals[5] += shardStat[5];
        globalTotals[6] += shardStat[6];
        globalTotals[7] += parseFloat(shardStat[7]);
        console.log("shardstat guild count" + shardStat[0]);
        console.log("globaltotals guild count" + globalTotals[0]);
      });

      let bad = new Discord.RichEmbed();
      bad.setColor("1503").setAuthor(`Chips (-help) stats report for shard #${clientutil.id+1} (of ${clientutil.count})!`);

      bad.setTitle(`Current time: ${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}!`);

      let userCount = 0;
      let guildCount = 0;

      client.guilds.array().forEach(g => {
        userCount += g.members.size;
        guildCount++;
      });

      bad.addField("User count: ", `${userCount}`, true);
      bad.addField("Server count: ", `${guildCount}`, true);

      let uptime = formatUptime(process.uptime());
      bad.addField("Bot uptime: ", `${uptime}`, true);

      let memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(4)} MB`;
      bad.addField("Memory usage:", `${memory}`, true);

      let startTime = process.hrtime();
      let startUsage = process.cpuUsage();

      let now = Date.now();
      while (Date.now() - now < 500) { //;
      }

      let diff = process.hrtime(startTime);
      let elapTime = diff[0] * 1e9 + diff[1];
      let elapUsage = process.cpuUsage(startUsage);

      let elapTimeMS = elapTime;
      let elapUserMS = elapUsage.user;
      let elapSystMS = elapUsage.system;
      let u = parseFloat(100. * ((elapUserMS + elapSystMS) / elapTimeMS));

      bad.addField("CPU usage (%):", `${u.toFixed(3)}`, true);

      let cpuUsage = process.cpuUsage().user;
      bad.addField("CPU usage (raw):", `${cpuUsage}`, true);

      channel.send(' ', {
        embed: bad
      });
      let avatar = bot.user.avatarURL(2048);
      console.log("avatarURL" + avatar);
      bad = new Discord.RichEmbed();
      bad.setColor("1503").setAuthor(`Chips global stats report across all shards!`);
      bad.setThumbnail(avatar);
      bad.setImage("https://cdn.discordapp.com/attachments/307625096078426123/314201502669471744/Chips.jpg");
      bad.setTitle(`Current time: ${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}!`);
      bad.addField("Total User Count: ", `${globalTotals[4]}`);
      bad.addField("Total Server Count: ", `${globalTotals[0]}`);
      bad.addField("Total Channel Count: ", `${globalTotals[1]}`, true);
      bad.addField("Total Text Channel Count: ", `${globalTotals[2]}`, true);
      bad.addField("Total Voice Channel Count: ", `${globalTotals[3]}`, true);
      bad.addField("Average Client Ping: ", `${(globalTotals[6]/clientutil.count).toFixed(2)} ms`, true);
      bad.addField("Total CPU Usage: ", `${globalTotals[7].toFixed(4)}%`, true);
      bad.addField("Total Memory Usage: ", `${globalTotals[5].toFixed(2)} MB`, true);

      let invite = "[Click Here!](https://discordapp.com/oauth2/authorize?client_id=296855425255473154&scope=bot&permissions=2146958591)";
      bad.addField("Invite link: ", `${invite}`, false);

      let support = "[Click Here!](https://discord.gg/jj5FzF7)";
      bad.addField("Support server: ", `${support}`, false);
      let website = "[Click Here!](http://www.chipsbot.tk:8080/)";
      bad.addField("Official Website: ", `${website}`, false);
      let donate = "https://www.paypal.me/wzhouwzhou";
      bad.addField("Feeling generous? Donate here to help us pay for hosting and keep our bot updated constantly!", `${donate}`, false);
      let hrTime = process.hrtime(start);
      let µs = false;
      end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
      if (end < 1) {
        µs = true;
        end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
      }
      µs ? end += 'µs' : end += 'ms';
      bad.setFooter(`Image made by @xdlf#6477.--Chips stats lookup and calculations took ${(end)}.--`);
      channel.stopTyping();
      reply('Chips v0.3.3 stats!', {
        embed: bad
      });
    });
  }
};*/
