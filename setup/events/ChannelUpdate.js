module.exports = function() {
  client.on('channelUpdate', (oldC, newC) => {
    checkPosition(oldC, newC);
  });
};

const checkPosition = (oldC, newC) => {
  if ((oldC.position && newC.position) && (oldC.position != newC.position)) {
    if (newC.guild.id == Constants.servers.SURSKIT) {
      let bold = '';
      if (Math.abs(oldC.position - newC.position) > 1) bold = '**';
      client.channels.get(Constants.channels.SBKCHIPSLOGS).send(`${bold}Channel Position Update: ${newC.name.replace(/@/, '(at)')} was moved from position ${oldC.position} to ${newC.position}.${bold}`);
    } else if (newC.guild.id == '313738223690186752') {
      let bold = '';
      if (Math.abs(oldC.position - newC.position) > 1) bold = '**';
      client.channels.get('313757929780150272').send(`${bold}Channel Position Update: ${newC.name.replace(/@/, '(at)')} was moved from position ${oldC.position} to ${newC.position}.${bold}`);
    }
  }
};
