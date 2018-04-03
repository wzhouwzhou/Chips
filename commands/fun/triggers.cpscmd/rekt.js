module.exports = {
  name: 'rekt',
  func(msg, { send }) {
    //return send('Slain! https://giphy.com/gifs/TEcDhtKS2QPqE');
    return send('Slain!', new Discord.MessageAttachment('https://media.giphy.com/media/f9Sij046DveTptk2Dl/giphy.gif', 'hi.gif'));
  },
};
