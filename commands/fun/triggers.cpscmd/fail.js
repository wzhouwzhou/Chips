const fails = [
    'https://giphy.com/gifs/wasted-RLi2oeVZiVkE8',
    'https://giphy.com/gifs/gta-wasted-gta5-AHMHuF12pW4b6',
    'https://www.tenor.co/uZUh.gif',
    'https://www.tenor.co/o6Fc.gif',
    'https://www.tenor.co/uHLF.gif',
    'https://www.tenor.co/sDpP.gif',
    'https://www.tenor.co/EVdG.gif',
    'https://www.tenor.co/wWMv.gif',
    'https://www.tenor.co/vtFA.gif',
    'https://www.tenor.co/ttdh.gif',
    'https://www.tenor.co/tphJ.gif',
    'https://www.tenor.co/GbH3.gif',
    'https://www.tenor.co/wK2a.gif',
    'https://giphy.com/gifs/wasted-sign-uAH7abSiUAlPO',
    'https://giphy.com/gifs/Jalikml2XiUgw \n Wait for it!',
    'https://media.giphy.com/media/uMWIZ4uioxFja/giphy.gif',
    'https://media.giphy.com/media/12fFFvFOaffWww/giphy.gif',
    'https://media.giphy.com/media/xT9IgF8MrlZiZUwyU8/giphy.gif',
    'https://media.giphy.com/media/HQZiHJ7haZ5JK/giphy.gif',
    'https://media.giphy.com/media/QWKspPE4Ehtra/giphy.gif',
    'https://media.giphy.com/media/9ZVdNukqksT04/giphy.gif',
    'https://media.giphy.com/media/qRMobwGqHdvck/giphy.gif',
    'https://media.giphy.com/media/3ohhwFfsEJJFQpEY24/giphy.gif'
  
  ];
  
  module.exports = {
    name: 'fail',
    async func(msg, { send }) {
      return send(fails[_.random(0, fails.length - 1)]);
    },
  };