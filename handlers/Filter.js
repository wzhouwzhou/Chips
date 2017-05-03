global.maxOk = 3;
global.okInterval = 2;
global.onFilter={0: true};
global.autoOverride={0: true};

module.exports = function() {
  return async (message) => {
    let mContent = message.content.toLowerCase();//.replace(/[\|&;\$%@"<>\(\)\+,]/g, "");
    mContent = mContent.replace(/[\u200B-\u200D\uFEFF]/g, ""); //0 space joiners
    mContent = mContent.replace('*',"").toLowerCase();
    console.log("[SPAMMYDEBUG]: mContent: " + mContent);
    let id=message.channel.id;
    if(currentOkInterval[id]==null){currentOkInterval[id]=1; console.log("[Filter] New interval entry for channel " + id);}
    if(okSpamLogs[id]==null){okSpamLogs[id]=1; console.log("[Filter] New entry for channel " + id);}

    if((blacklist[message.guild.id]==null||onFilter[message.guild.id]==null)||autoOverride[message.guild.id]==null){
      console.log("[Filter] Creating new blacklist for guild " + message.guild.id);
      blacklist[message.guild.id]=['ok'];
      onFilter[message.guild.id]=true;
      autoOverride[message.guild.id]=false;
    }
    //console.log("[Filter][SUPER SPAMMYDEBUG] blacklist: " + Constants.BLACKLIST[message.guild.id]);
    //let blacklist = blacklist;
    //detect blacklisted content
    if(blacklist[message.guild.id].indexOf(mContent)>-1){ //=="ok"||mContent=="ko"){//(Constants.BLACKLIST[message.guild.id]).indexOf(mContent)>-1){
      console.log("[Filter] Blacklisted content found!");
      //console.log("[Filter] Message content: " + mContent);

      //increment blacklist occurence
      okSpamLogs[id]=okSpamLogs[id]+1;
      //reset interval
      currentOkInterval[id] = 0;
      console.log("[Filter] Match num increase in channel: " + id +  " new: " + okSpamLogs[id]);

      if(onFilter[message.guild.id]){
        if(okSpamLogs[id]>=maxOk){
          message.delete();
          console.log("[Filter] Blacklisted content deleted in channel "+ id);
        }
      }else if(!onFilter[message.guild.id] && okSpamLogs[id]>5){
        if(!autoOverride[message.guild.id]){
          //reenable filter if not being overriden
          onFilter[message.guild.id]=true;
          console.log("[Filter] Censoring reenabled due to over 5 black listed words in a row for channel: " + id);
        }
      }

    }else if(okSpamLogs[id]>0){
      currentOkInterval[id]=currentOkInterval[id]+1; console.log("currentOkInterval incr: "+ currentOkInterval[id] + " for channel "+ id);
      if(onFilter[message.guild.id] && currentOkInterval[id]>=okInterval){
        okSpamLogs[id]=0;
        console.log("[Filter] Reset filter for channel " + id);
        currentOkInterval[id]=0;
      }
    }
  };
};
