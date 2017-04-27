module.exports = function( send, send2 ) {
  client.on("ready", _ => {
    statusC = client.channels.get(Constants.channels.STATUS);

    send('Chips restart!', statusC);

    console.log('Chips is ready!');
    client.user.setStatus("online");
    client.user.setGame("Do -help","https://twitch.tv/twitch");//client.user.setGame("Updated -help!");

    DMLogger = require("./app/handlers/DMLogger")(Discord, client, dmC, moment);
  });
  hclient.on("ready", _ => {
    testC  = hclient.channels.get(Constants.channels.TEST);
    sLogs  = hclient.channels.get(Constants.channels.SLOGS);
    dmC    = hclient.channels.get(Constants.channels.DMS);
    snLogs = hclient.channels.get(Constants.channels.SNLOGS);

    console.log('Chips helper is ready!');
    hclient.user.setStatus("online");
    hclient.user.setGame("Chips is bae!");
  });
  h2client.on("ready", _ => {
    sxLogs = h2client.channels.get(Constants.channels.SXLOGS);

    console.log('Chips helper 2 is ready!');
    h2client.user.setStatus("online");
    h2client.user.setGame("Chips and Chips helper are bae!");
  });
  h3client.on("ready", _ => {
    sLogs2 = h3client.channels.get(Constants.channels.SLOGS);
    nLogs = h3client.channels.get(Constants.channels.NLOGS);
    stLogs = h3client.channels.get(Constants.channels.STLOGS);

    console.log('Chips helper 3 is ready!');
    h2client.user.setStatus("online");
    h2client.user.setGame("Chips, Chips2 and Chips3 are bae!");
  });
  c2.on("ready", _ => {
    console.log('Bot is ready!');
  });
  c3.on("ready", _ => {
    console.log('Bot2 is ready!');
  });

  client.on("debug", console.log);
  hclient.on("debug", console.log);
  h2client.on("debug", console.log);
  h3client.on("debug", console.log);


  fs.readdirSync("./app/commands").map(f => {
    if (/\.js/.test(f)) {
      const precmd = require(`./app/commands/${f}`);
      client.commands[precmd.name] = new Command(precmd);
    }
  });
  require('./app/setup/events/ClientMessage')(send2);
};
