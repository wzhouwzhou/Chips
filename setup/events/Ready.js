global.statusC;
module.exports = function( send ) {
  if(process.env.BETA!=null&&process.env.BETA=="true")
    client.login(process.env.BETATOKEN);
  else
    client.login(process.env.TOKEN);
  hclient.login(process.env.HTOKEN);
  h2client.login(process.env.H2TOKEN);
  h3client.login(process.env.H3TOKEN);

  if(process.env.C2TOKEN!=null&&process.env.C2TOKEN!="")
    c2.login(process.env.C2TOKEN);
  else
    c2.login(require(path.join(__dirname, '../sBotT'))[0]);

  if(process.env.C3TOKEN!=null&&process.env.C3TOKEN!="")
    c3.login(process.env.C3TOKEN);
  else
    c2.login(require(path.join(__dirname, '../sBotT'))[1]);

  client.on("ready", async function() {
    require(path.join(__dirname, '../../handlers/DiepAddons')).getServers();

  setTimeout(async function(){statusC = await client.channels.get(Constants.channels.STATUS); statusC&&send('Chips restart! **' + moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')+'**', statusC);},5000);

    console.log('Chips is ready!');
    client.user.setStatus("online");
    if(process.env.BETA=="true")
      client.user.setGame("PFP Credits to Wendie","https://twitch.tv/twitch");//client.user.setGame("Updated -help!");
    else
      client.user.setGame("Do -stats","https://twitch.tv/twitch");//client.user.setGame("Do -help!");

    setTimeout(_=>{DMLogger = require(path.join(__dirname, '../../handlers/DMLogger'))(Discord, client, dmC, moment);},3000);
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
    h3client.user.setStatus("online");
    h3client.user.setGame("Chips, Chips2 and Chips3 are bae!");
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

  fs.readdirSync(path.join(__dirname, '../../commands')).map(f => {
    if (/\.js/.test(f)) {
      console.log("New command loaded!: " + f);
      const precmd = require(path.join(__dirname, '../../commands', f));
      client.commands[precmd.name] = new Command(precmd);
    }
  });

  client.on("guildMemberAdd",  (member) => {
    try {
      let memberguild = member.guild;
      let userid= member.user.id;
      if(memberguild.id=="257889450850254848"){
        setTimeout(_ =>{
          console.log("[SINX] adding role...");
          member.addRole(memberguild.roles.get("305302877641900052")||memberguild.roles.find('name',"unverified"));
          console.log("[SINX] sending welcome msg...");
          let welcomeC=client.channels.get("307342989783728131")||memberguild.channels.find('name','unverified');
          /*welcomeC.send(`<@${userid}>, Welcome to Sinbadx Knights! **If you would like to get verified and be able to speak in the other channels, please answer the following questions!**
            1. How did you hear about this server?
            2. Why did you join this server?
            3. Do you promise to read <#308361914923089940>?
            4. What is your favorite diep.io tank?
            (you can answer these with just a sentence or two, no need to write an essay!)`).then(console.log("[SINX] Welcome msg sent"));*/
        }, 1500);
      }else if(memberguild.id=="252525368865456130"){
        setTimeout(_ => {
          console.log("[SK] adding role...");
          member.addRole(memberguild.roles.get("303587467741757440")||memberguild.roles.find('name',"lollipop-unverified"));
          console.log("[SK] sending welcome msg...");
          let welcomeC=memberguild.channels.get("308772937731670016")||memberguild.channels.find('name','unverified');
          welcomeC.send(`<@${userid}>, Welcome! Please read <#307895557815402496> and become acquainted with the rules here, then contact a staff member to be able to speak in other channels!`);
        }, 1000);
      }
    } catch (err) {
      console.log("could not add unverified role");
    }
  });
};
