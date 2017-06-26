const Discord = require('discord.js');
const Game = require('./Game');

const GameClass = class PokeGame extends Game {
  constructor ({
    basicdata,
    usingRxns,
  }) {
    super(basicdata);
    this.usingRxns = usingRxns;
    this.playerData = new Discord.Collection();
  }

  reloadAllPlayerData () {
    return new Promise( (res, rej) => {
      setImmediate(async () => {
        try{
          this.playerData = await r.table('pokemonData').run();
          res(true);
        }catch(err){
          rej(err);
        }
      });
    });
  }

  clearPlayerData (id) {
    return new Promise( async ( res ) => {
      const oldData = this.playerData[id];
      this.playerData[id] = null;
      res(oldData);
    });
  }

  getPlayerData (id) {
    return new Promise( async (res, rej) => {
      if(!this.playerData) await this.reloadAllPlayerData();

      if(this.playerData[id])
        res(this.playerData[id]);
      else
        rej(false);
    });
  }

};

module.exports = GameClass;
