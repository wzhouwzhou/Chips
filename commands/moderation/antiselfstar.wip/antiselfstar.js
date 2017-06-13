//const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

ex = {};

ex.name = "antiselfstar";
ex.perm = ["global.server.-vs"];
ex.customperm = ["BAN_MEMBERS"];
ex.func = async (msg, {send, guild, args/*, gMember*/, reply }) =>{
  let m = await send('Working...');
  if(!guild) return m.edit("You must use this in a server!");
  if (!args[0]) return m.edit("No action given :(");

  let action = args[0].toLowerCase();
  switch(action){
    case 'on':{
      if(disableSelfStar[guild.id]!=null&&disableSelfStar[guild.id]==true) {
        m.delete();
        return reply('Anti-selfstar is already enabled!');
      }

      m.delete();
      return await reply('Anti-selfstar turned on successfully');}

    case 'off':{
      if(disableSelfStar[guild.id]!=null&&disableSelfStar[guild.id]==true) {
        m.delete();
        return reply('Anti-selfstar is already disabled!');
      }

      m.delete();
      return await reply('Anti-selfstar turned off successfully');}

    case 'toggle':{
      memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
      await guild.setVerificationLevel(3);
      memberjoin.panics[guild.id]=true;
      return reply(`Panic activated, verification level is now ${guild.verificationLevel}`);}
  }
};

module.exports = ex;
