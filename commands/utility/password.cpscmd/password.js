const crypto = require('crypto');

module.exports = {
  name: "password",
  async func(msg, { guild, author, args, reply}) {
    const numQ = args.join(' ').match(/^[^\d]*(\d+)[^\d]*$/);
    const length = numQ?+(numQ[1]):10;
    if(length>1800) return reply('Password is too long!');
    const generated = crypto.randomBytes(+length);
    const optionsQ = args.join(' ').match(/^[^aunh]*(uni(?!code)|unicode|alphanumer(?:ic)?(?!(?:al))|(?!alpha)an|(?!alpha)numerical|number|num(?!(?:er(?:ic)?))|hex)[^]*$/i);
    const options = optionsQ?optionsQ[1]:'an';
    const password = (()=>{
      switch(options){
        case 'uni':
        case 'unicode':
          return generated.toString();

        case 'alphanumeric':
        case 'alphanumer':
        case 'an':
          return (+(generated.join(''))).toString(36);

        case 'numerical':
        case 'number':
        case 'num':
          return (generated.join('').toString());

        case 'hex':
          return (generated.toString('hex'));
      }
    })().substring(0,+length);

    author.send(`Here is your generated password!\n${password}`);
    if(guild) reply('Your password has been sent to dms!');
  }
};
