module.exports = {
  name: "stats",
  async func(msg, { channel }) {
    let bad = new Discord.RichEmbed();
    bad.setColor("1503").setAuthor("Chips stats report!");

    bad.setTitle(`Current time: ${moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')}!`);

    let userCount = 0;
    let guildCount = 0;

    for(g of client.guilds.array()) {
      userCount+=g.members.array().length;
      guildCount++;
    }

    bad.addField("User count: ", `${userCount}`, true);
    bad.addField("Server count: ", `${guildCount}`, true);

    let uptime = formatUptime(process.uptime());
    bad.addField("Bot uptime: ", `${uptime}`, true);

    let memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
    bad.addField("Memory usage:", `${memory}`, true);

    let hrTime = process.hrtime()[0];
    bad.addField("CPU hrtime:", `${htTime}`, true);

    let cpuUsage = process.cpuUsage().user;
    bad.addField("CPU usage:", `${cpuUsage}`, true);

    let invite = "https://discordapp.com/oauth2/authorize?client_id=296855425255473154&scope=bot&permissions=83147";
    bad.addField("Invite link: ", `${invite}`, false);

    let support = "https://discord.gg/jj5FzF7";
    bad.addField("Support server: ", `${support}`, false);

    channel.sendEmbed(bad);
  }
};

const formatUptime = (seconds) =>{
  let temp =  Math.floor(seconds / 60);
  seconds = seconds % 60;
  let minutes = temp % 60;

  temp =  Math.floor(temp / 60);
  let hours = temp % 24;

  let days = Math.floor(temp / 24);

  seconds = `${'0'.repeat(3 - seconds.toString().length)}${seconds}`;
  minutes = `${'0'.repeat(2 - minutes.toString().length)}${minutes}`;
  hours = `${'0'.repeat(2 - hours.toString().length)}${hours}`;
  days = `${'0'.repeat(Math.max(0, 2 - days.toString().length))}${days}`;

  return `${days !== '00' ? `${days}:` : ''}${hours}:${minutes}:${seconds}`;
};
