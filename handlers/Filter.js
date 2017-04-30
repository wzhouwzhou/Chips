
global.blacklist = {
  252525368865456130: [
      'ok',
      'k',
      'xani',
      'ko',
      'ok*'
    ],

};

let f = {};

f.filter = (message) => {
  let mContent = message.content.toLowerCase();//.replace(/[\|&;\$%@"<>\(\)\+,]/g, "");
  mContent = mContent.replace(/[\u200B-\u200D\uFEFF]/g, ""); //0 space joiners
  mContent = mContent.replace('*',"").toLowerCase();
  //console.log("[SPAMMYDEBUG]: mContent: " + mContent);
  let id=message.channel.id;
  if(currentOkInterval[id]==null){currentOkInterval[id]=1; console.log("new interval entry for channel " + id);}
  if(okSpamLogs[id]==null){okSpamLogs[id]=1; console.log("new entry for channel " + id);}

  /*if(Constants.BLACKLIST[message.guild.id]==null){
    console.log("Creating new blacklist for guild " + message.guild.id);
    Constants.BLACKLIST[message.guild.id]=['ok'];
  }*/
  //console.log("[SUPER SPAMMYDEBUG] blacklist: " + Constants.BLACKLIST[message.guild.id]);

  //detect blacklisted content
  if(mContent=="ok"||mContent=="ko"){//(Constants.BLACKLIST[message.guild.id]).indexOf(mContent)>-1){
    console.log("Blacklisted content found!");
    console.log("message content: " + mContent);

    //increment blacklist occurence
    okSpamLogs[id]=okSpamLogs[id]+1;
    //reset interval
    currentOkInterval[id] = 0;
    console.log("ok num increase in channel: " + id +  " new: " + okSpamLogs[id]);

    if(okFilter){
      if(okSpamLogs[id]>=maxOk){
        message.delete();
        console.log("ok deleted in channel "+ id);
      }
    }else if(!okFilter && okSpamLogs[id]>5){
      //reenable filter
      okFilter=true;
      console.log("censoring reenabled due to over 5 black listed words in a row for channel: " + id);
    }

  }else{
    currentOkInterval[id]=currentOkInterval[id]+1; console.log("currentOkInterval incr: "+ currentOkInterval[id] + " for channel "+ id);
    if(okFilter && currentOkInterval[id]>=okInterval){
      okSpamLogs[id]=0;
      console.log("ok reset for channel " + id);
      currentOkInterval[id]=0;
    }
  }
};

module.exports=f;
