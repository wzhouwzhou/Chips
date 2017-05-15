module.exports = {
  name: "stats",
  perm: ["global.stats"],
  async func(msg, { channel, send }) {
    let globalTotals = [0, 0, 0, 0, 0];

    //Eval across all shards
    clientutil.broadcastEval(`
let userCount = 0;
let guildCount = 0;
let channelCount = 0;
let textC = 0;
let voiceC = 0;
client.guilds.array().forEach(g=> {
  userCount+=g.memberCount;
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
[guildCount, channelCount, textC, voiceC, userCount];`).then(results=>{
      results.forEach(shardStat => {
        globalTotals[0] += shardStat[0];
        globalTotals[1] += shardStat[1];
        globalTotals[2] += shardStat[2];
        globalTotals[3] += shardStat[3];
        globalTotals[4] += shardStat[4];
        console.log("shardstat guild count" + shardStat[0]);
        console.log("globaltotals guild count" + globalTotals[0]);
      });

      let bad = new Discord.RichEmbed();
      bad.setColor("1503").setAuthor(`Chips (-help) stats report for shard #${client.shard.id+1}!`);

      bad.setTitle(`Current time: ${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}!`);

      let userCount = 0;
      let guildCount = 0;

      client.guilds.array().forEach(g=> {
        userCount+=g.memberCount;
        guildCount++;
      });

      bad.addField("User count: ", `${userCount}`, true);
      bad.addField("Server count: ", `${guildCount}`, true);

      let uptime = formatUptime(process.uptime());
      bad.addField("Bot uptime: ", `${uptime}`, true);

      let memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
      bad.addField("Memory usage:", `${memory}`, true);

      let hrTime = process.hrtime()[0];
      bad.addField("CPU hrtime:", `${hrTime}`, true);

      let cpuUsage = process.cpuUsage().user;
      bad.addField("CPU usage:", `${cpuUsage}`, true);
      channel.send(' ', {embed: bad});

      bad=new Discord.RichEmbed();
      bad.setColor("1503").setAuthor(`Chips global stats report across all shards!`);
      bad.setTitle(`Current time: ${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}!`);

      bad.addField("Total User Count: ", `${globalTotals[4]}`);
      bad.addField("Total Server Count: ", `${globalTotals[0]}`);
      bad.addField("Total Channel Count: ", `${globalTotals[1]}`,true);
      bad.addField("Total Text Channel Count: ", `${globalTotals[2]}`,true);
      bad.addField("Total voice Channel Count: ", `${globalTotals[3]}`,true);

      let invite = "https://discordapp.com/oauth2/authorize?client_id=296855425255473154&scope=bot&permissions=83147";
      bad.addField("Invite link: ", `${invite}`, false);

      let support = "https://discord.gg/jj5FzF7";
      bad.addField("Support server: ", `${support}`, false);
      channel.send(' ', {embed: bad});
    });
  }
};

const formatUptime = (seconds) =>{
  let temp =  Math.floor(seconds / 60);
  seconds = +((+ (seconds % 60)).toFixed(3));
  let minutes = temp % 60;

  temp =  Math.floor(temp / 60);
  let hours = temp % 24;

  let days = Math.floor(temp / 24);

  seconds = `${seconds}`;
  minutes = `${minutes}`;
  hours   = `${hours}`;
  days    = `${days}`;

  return `${days !== '0' ? `${days}:` : ''}${hours}:${minutes}:${seconds}`;
};
