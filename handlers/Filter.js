
module.exports.filter = (message) => {
  let content = message.content;
  content = content.replace(/[\u200B-\u200D\uFEFF]/g, ''); //0 space joiners
  content = content.replace('*','');

  let id=message.channel.id;
  if(currentOkInterval[id]==null){currentOkInterval[id]=1; console.log("new interval entry for channel " + id);}
  if(okSpamLogs[id]==null){okSpamLogs[id]=1; console.log("new entry for channel " + id);}

  if(Constants.skblacklist.indexOf(content.toLowerCase())>-1){
    if(okFilter){
      console.log("ok received: " + content);
      okSpamLogs[id]=okSpamLogs[id]+1;currentOkInterval[id] = 0; console.log("ok num increase in channel: " + id +  " new: " + okSpamLogs[id]);
      if(okSpamLogs[id]>=maxOk){
        message.delete();
        console.log("ok deleted in channel "+ id);
      }
    }else if(!okFilter && currentOkInterval[id]>5){
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
