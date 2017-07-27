'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const DEFAULTCOLOR = 143526;
const PAGEBTNS = '⏮ ⬅ ➡ ⏭ 🔢 ⏏'.split(' ');
const TIME = 864e5;
const TIME2 = 60e3;
const Paginator = class Paginator {
  constructor(msg, data, Discord = require('discord.js')) {
    this._msg = msg;
    this.embed = new Discord.RichEmbed();
    if(data) this.loadData (data);
    this.currentPage = 0;
  }

  loadData ( data ) {
    if(this.stopped) return null;
    if(!data.type) throw new Error('No data type!');
    if(data.type === 'paged')
      this.pages = data.pages;
    else if(data.type === 'pagedfn')
      pagedfn(this);
    else if(data.type === 'rawtext')
      this.pages = data.raw.split(data.splitter||/\s+/);

    this.embedding = true;
    this.fielding = data.fielding;
    this.title = data.title;
    this.footer = data.footer;
    this.color = data.color||(this._msg.member?this._msg.member.displayColor:DEFAULTCOLOR);
    this.text = data.text;
    this.author = data.author;
    this.buttons = data.buttons || PAGEBTNS;
    this.help = data.help;
    return this;
  }

  sendFirst () {
    return new Promise( (res, rej) => {
      if(this.stopped) res(null);
      this.updateInternal(0);

      this.updateView().catch(rej);
      res(true);
    });
  }

  updateInternal (pageNum) {
    if(this.stopped) return null;
    if(this.embedding){
      this.embed.setTitle(this.title||'').setFooter(this.footer.replace(/{pagenum}/gi,pageNum).replacce(/{totalpages}/gi,this.pages.length)||`Page ${pageNum} of ${this.pages.length}`).setColor(this.color||DEFAULTCOLOR);
      this.author&&this.embed.setAuthor(this.author);

      if(this.fielding){
        this.pages[pageNum].forEach(field=>this.embed.addField(...field));
      }else{
        this.embed.setDescription(this.pages[pageNum]);
      }
    }
    return true;
  }

  updateView () {
    return new Promise ( async (res, rej) =>{
      if(this.stopped) return res(null);
      try{
        if(!this.sentMsg){
          if(this.replying)
            this.sentMsg = await this._msg.reply(typeof this.text==='string'?this.text:this.text[this.currentPage], { embed: this.embed });
          else
            this.sentMsg = await this._msg.channel.send(typeof this.text==='string'?this.text:this.text[this.currentPage], { embed: this.embed });
          await this.pageButtons(this.sentMsg);
        }else{
          if(this.replying)
            await this.sentMsg.edit(this._msg.author+(typeof this.text==='string'?this.text:this.text[this.currentPage]), { embed: this.embed });
          else
            await this.sentMsg.edit(typeof this.text==='string'?this.text:this.text[this.currentPage], { embed: this.embed });
        }
      }catch(err){
        rej(err);
      }

      res(true);
    });
  }

  pageButtons (sentMsg) {
    return new Promise( async (res, rej) => {
      if(this.stopped) return res(null);
      this.collector = sentMsg.createReactionCollector( (reaction, user) => {
        if((!!~this.buttons.indexOf(reaction.emoji.toString())||reaction.emoji.toString()=='ℹ') && this._msg.author.id === user.id) {
          reaction.remove(user);
          return true;
        }
        return false;
      },
      { time: TIME }
      );
      this.collector.on('collect', async r => {
        switch(r.emoji.toString()){
          case '⏮':{
            return this.setPage(0);
          }
          case '⏭':{
            return this.setPage(this.pages.length-1);
          }
          case '⬅':{
            return this.prevPage();
          }
          case '➡':{
            return this.nextPage();
          }
          case '⏏':{
            return this.collector.stop();
          }
          case '🔢':{
            let tempmsg;
            const mCol = sentMsg.channel.createMessageCollector(
              query => query.content.match(/^(\d+|cancel)$/i)&&query.author.id===this._msg.author.id,
              { max: 1, time: TIME2, errors: ['time'] }
            );

            mCol.on('collect', async m => {
              if(!m.content) return;
              if(/^cancel$/i.test(m.content)) mCol.stop();

              const num = /^\d+$/i.test(m.content);
              try {
                await this.setPage(+num);
                tempmsg.delete();
              }catch(err){
                m.reply('Invalid page number specified!').then(mmm=>mmm.delete(3000));
              }
              m.delete();
            });

            mCol.on('end', collected => {
              if(collected.size===0){
                return this._msg.reply('Timed out').then(m2=>{
                  setTimeout(()=>{
                    tempmsg.delete();
                    m2.delete();
                  }, 3000);
                });
              }
            });

            tempmsg = await this._msg.reply('Please enter the page number to jump to, or __cancel__ to cancel');
          }
        }
      });

      this.collector.on('end', () => this.shutdown());

      let btns = 0;
      try{
        if(this.help) await sentMsg.react('ℹ');
        for(const e of this.buttons){
          await sentMsg.react(e);
          btns++;
        }
      }catch(err){
        rej(err);
      }
      if(btns != this.buttons.length) rej('Not all buttons reacted!');
      res(true);
    });
  }

  nextPage () {
    if(this.stopped) return null;
    return this.setPage(this.currentPage+1);
  }

  prevPage () {
    if(this.stopped) return null;
    return this.setPage(this.currentPage-1);
  }

  setPage (num) {
    return new Promise( async (res, rej) => {
      if(this.stopped) return res(null);
      try{
        if(!this.validateUpdatePage(num)) return rej('Invalid page');
        this.currentPage = num;
        this.updateInternal(this.currentPage);
        await this.updateView();
      }catch(err){
        return rej(err);
      }
      res(true);
    });
  }

  validateUpdatePage (direction) {
    if(this.stopped) return false;
    if(typeof direction === 'string'){
      if(+direction+this.currentPage < this.pages.length) return true;
    }else if(typeof direction === 'number')
      if(-1<direction&direction<this.pages.length&&direction!==this.currentPage) return true;
    return false;
  }

  shutdown () {
    return new Promise( async (res, rej) => {
      if(this.stopped) res(true);
      this.stopped = true;
      try{
        await this.sentMsg.delete();
        this.sentMsg = null;
      }catch(err){
        rej(err);
      }
      res(true);
    });
  }
};

exports.Paginator = Paginator;
