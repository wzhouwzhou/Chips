
module.exports = function() {
  client.on('channelUpdate', (oldC,newC)=>{
    checkPosition(oldC, newC);
  });
};

const checkPosition = (oldC, newC) =>{
  if((oldC.position && newC.position)&&(oldC.position != newC.position))
    if(newC.guild.id==Constants.servers.SINX){
      let bold='';
      if(Math.abs(oldC.position-newC.position)>1) bold = '**';
      client.channels.get(Constants.channels.SBKCHIPSLOGS).send(`${bold}Channel Position Update: ${newC.name.replace(/@/,'(at)')} was moved from position ${oldC.position} to ${newC.position}.${bold}`);
    }
};
