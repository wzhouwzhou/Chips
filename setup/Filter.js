module.exports.filter = (message) => {
  content = message.content.replace(/[\u200B-\u200D\uFEFF]/g, '');

  let id=message.channel.id;
  if(currentOkInterval[id]==null){currentOkInterval[id]=1; console.log("new interval entry for channel " + id);}
  if(okSpamLogs[id]==null){okSpamLogs[id]=1; console.log("new entry for channel " + id);}

  if(content.toLowerCase()=="ok"||content.toLowerCase()=="k"){
    if(okFilter){
      console.log("ok received: " + content);
      okSpamLogs[id]=okSpamLogs[id]+1;currentOkInterval[id] = 0; console.log("ok num increase in channel: " + id +  " new: " + okSpamLogs[id]);
      if(okSpamLogs[id]>=maxOk){
        message.delete();
        console.log("ok deleted in channel "+ id);
      }
    }
    if(okSpamLogs[id] >= 0) {
      currentOkInterval[id]=currentOkInterval[id]+1; console.log("currentOkInterval incr: "+ currentOkInterval[id]);
      if(currentOkInterval[id]>=okInterval){
        okSpamLogs[id]=0;
        console.log("ok reset for channel " + id);
        currentOkInterval[id]=0;
      }
    }
    if(!okFilter && currentOkInterval[id]>5)okFilter=true;
  }
};
