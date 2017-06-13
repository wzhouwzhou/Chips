
module.exports = function() {
  client.on("guildMemberAdd",  (member) => {
    let memberguild = member.guild;
    let userid= member.user.id;

    if(memberjoin.panics[memberguild.id]&&memberjoin.panicKick[memberguild.id])
      return setTimeout(()=>member.kick(),3000);

    try {
      if(memberguild.id=="257889450850254848"){
        setTimeout(() =>{
          console.log("[SINX] adding role...");
          member.addRole(memberguild.roles.get("305302877641900052")||memberguild.roles.find('name',"Unverified"));
          /*console.log("[SINX] sending welcome msg...");
          let welcomeC=client.channels.get("307342989783728131")||memberguild.channels.find('name','unverified');
          welcomeC.send(`<@${userid}>, Welcome to Sinbadx Knights! **If you would like to get verified and be able to speak in the other channels, please answer the following questions!**
            1. How did you hear about this server?
            2. Why did you join this server?
            3. Do you promise to read <#308361914923089940>?
            4. What is your favorite diep.io tank?
            (you can answer these with just a sentence or two, no need to write an essay!)`).then(console.log("[SINX] Welcome msg sent"));*/
        }, 1000);
      }else if(memberguild.id=="252525368865456130"){
        setTimeout(() => {
          console.log("[SK] adding role...");
          member.addRole(memberguild.roles.get("303587467741757440")||memberguild.roles.find('name',"lollipop-unverified"));
          console.log("[SK] sending welcome msg...");
          let welcomeC=memberguild.channels.get("308772937731670016")||memberguild.channels.find('name','unverified');
          welcomeC.send(`<@${userid}>, Welcome! Please read <#307895557815402496> and become acquainted with the rules here, then contact a staff member to be able to speak in other channels!`);
        }, 700);
      }else if(memberguild.id=="315891125825044482"){
        setTimeout(() =>{
          console.log("[SK2] adding role...");
          member.addRole(memberguild.roles.get("316017088160595970")||memberguild.roles.find('name',"unverified"));
          console.log("[SK2] sending welcome msg...");
          let welcomeC=client.channels.get("307342989783728131")||memberguild.channels.find('name','unverified');
          welcomeC.send(`<@${userid}>, Welcome to Sunk Nights! **If you would like to get verified and be able to speak in the other channels, please answer the following questions!**
            1. How did you hear about this server?
            2. Why did you join this server?
            3. Do you promise to read <#316019707276820483>?
            4. What is your favorite diep.io tank?
            (you can answer these with just a sentence or two, no need to write an essay!)`).then(console.log("[SK2] Welcome msg sent"));
        }, 700);
      }else if(memberguild.id=="315502587111669772"){
        setTimeout(()=>{
          console.log("Changing nick...");
          member.setNickname(`(♤)${member.user.username}`.substring(0,Math.min(member.user.username+`(♤)`.length,32)));
        });
      }
    } catch (err) {
      console.log("could not add unverified role or set nick");
    }
  });
  require('./ChannelUpdate')();
};
