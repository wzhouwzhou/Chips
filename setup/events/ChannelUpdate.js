
module.exports = function() {
  client.on('channelUpdate', (oldC,newC)=>{
    checkPosition(oldC, newC);
  });
};

const checkPosition = (oldC, newC) =>{
  if(oldC.position && newC.position)
    if(newC.guild.id==Constants.servers.SINX)
      client.channels.get(Constants.channels.SBKCHIPSLOGS).send(`Channel Position Update: ${newC.name} was moved from position ${oldC.position} to ${newC.position}.`);
};
