// Client Message Events
let slSwitcher=false, helper3=false;
module.exports = function( send2 ) {
  client.on("message", message => {
    filter.filter(message);
    //rekt
    if(message.author.id=="244533925408538624" && (message.content.toLowerCase().indexOf("user muted successfully")>-1||message.content.toLowerCase().indexOf("user banned successfully")>-1))
      return message.channel.send("Omg rekt! https://giphy.com/gifs/TEcDhtKS2QPqE");

    if (message.author.bot) return;

    //wowbleach trigger
    if(message.content.toLowerCase().indexOf("wowbleach")>-1) message.channel.send(" \ _ \ _ \ <:Bleach:274628490844962826>\n\ <:WOW:290865903384657920>");

    if (!message.guild)
      return dmHandle(message);

    //console.log(monitorMode);
    if (monitorMode && message.channel == testC)
      console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.author.username + "] message content: " + message.content));

    if (message.content.toLowerCase().startsWith(prefix.toLowerCase()))
      CommandHandler(message, prefix);

    try{
      if(message.guild.id==Constants.servers.SNAP){
        send2(message, snLogs);
        snMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });
  c2.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.SK){ 
        if(slSwitcher)
          send2(m,sLogs);
        else
          send2(m,sLogs2);
        slSwitcher=!slSwitcher;
        sMsgs++;
      }else
      if(m.guild.id==Constants.servers.SINX){
        send2(m,sxLogs);
        sxMsgs++;
      }else
      if(m.guild.id==Constants.servers.STTOC){
        send2(m,stLogs);
        stMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });
  c3.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.NEB){
        send2(m,nLogs);
        nMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });
};
