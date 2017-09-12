'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const DEFAULTCOLOR = 143526;
const PAGEBTNS = '⏮ ⬅ ➡ ⏭ 🔢'.split(' ');
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
    this.image = data.image;
    if(!this.pages&&this.image) this.pages = new Array(this.image.length>1?this.image.length:1).fill(' ');
    if(!this.title) this.title = new Array(this.pages.length>1?this.pages.length:1).fill(' ');
    if(!this.text ) this.text  = new Array(this.pages.length>1?this.pages.length:1).fill(' ');
    this.thumbnail = data.thumbnail;
    this.buttons = data.buttons || PAGEBTNS;
    this.help = data.help;
    this.locked = data.locked!=null?data.locked:!0;
    this.lockToggle = !!data.lockToggle;
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

  updateInternal (pageNum, Discord = require('discord.js')) {
    if(this.stopped) return null;
    if(this.embedding){
      this.embed=new Discord.RichEmbed();
      this.currentTitle = this.title?typeof this.title==='string'?this.title:this.title[pageNum]?this.title[pageNum]:' ':null;

      this.embed.setTitle(this.currentTitle)
                .setFooter(this.footer?typeof this.footer==='string'?this.footer.replace(/{pagenum}/gi,pageNum+1).replace(/{totalpages}/gi,this.pages.length):this.footer[pageNum]?this.footer[pageNum].replace(/{pagenum}/gi,pageNum+1).replace(/{totalpages}/gi,this.pages.length):`Page ${pageNum+1} of ${this.pages.length}`:`Page ${pageNum+1} of ${this.pages.length}`)
                .setColor(this.color||DEFAULTCOLOR);
      this.author&&this.embed.setAuthor(this.author);

      if(this.fielding){
        for(const fieldp of this.pages[pageNum])
          this.embed = this.embed.addField(...fieldp,false);
      }else{
        this.embed.setDescription(this.pages[pageNum]);
      }
      this.currentImage = this.image?typeof this.image === 'string'?this.image:this.image[pageNum]:null;
      this.currentImage&&this.embed.setImage(this.currentImage);
      this.currentThumbnail = this.thumbnail?typeof this.thumbnail === 'string'?this.thumbnail:this.thumbnail[pageNum]:null;
      this.currentThumbnail&&this.embed.setThumbnail(this.currentThumbnail);
    }
    return true;
  }

  updateView () {
    return new Promise ( async (res, rej) =>{
      if(this.stopped) return res(null);
      try{
        this.currentText = typeof this.text==='string'?this.text:this.text[this.currentPage]?this.text[this.currentPage]:' ';
        if(!this.sentMsg){
          if(this.replying)
            this.sentMsg = await this._msg.reply(this.currentText, { embed: this.embed });
          else
            this.sentMsg = await this._msg.channel.send(this.currentText, { embed: this.embed });
          await this.pageButtons(this.sentMsg);
        }else{
          if(this.replying)
            await this.sentMsg.edit(this._msg.author+this.currentText, { embed: this.embed });
          else
            await this.sentMsg.edit(this.currentText, { embed: this.embed });
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
        if(this._msg.author.id !== user.id && this.locked) return false;
        if(!!(~this.buttons.indexOf(reaction.emoji.toString()))||reaction.emoji.toString()==='ℹ') {
          reaction.remove(user).catch(()=>console.log(`g${this._msg.guild?this._msg.guild.id:':dm'} [Paginator] could not remove reactions`));
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
            return this.prevPage().catch(_=>_);
          }
          case '➡':{
            return this.nextPage().catch(_=>_);
          }
          case '⏏':{
            return this.collector.stop();
          }
          case '🔒':{
            return this.toggleLock(!0);
          }
          case '🔓':{
            return this.toggleLock(!1);
          }
          case '🔢':{
            let tempmsg;
            const mCol = sentMsg.channel.createMessageCollector(
              query => (!!query.content.match(/(\d+|cancel)/i))&&query.author.id===this._msg.author.id,
              { max: 1, time: TIME2, errors: ['time'] }
            );

            mCol.on('collect', async m => {
              if(!m.content) return;
              if(/^cancel$/i.test(m.content)) mCol.stop();

              const num = m.content.match(/\d+/)?m.content.match(/\d+/)[0]:0;
              try {
                await this.setPage(+num-1);
              }catch(err){
                m.reply(`Invalid page number of \`${+num}\` specified!`).then(mmm=>mmm.delete(3000));
              }
              tempmsg.delete();
              return m.delete().catch(_=>_);
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
            return tempmsg;
          }
          case 'ℹ':{
            this.setPage('help');
          }
        }
      });

      this.collector.on('end', () => this.shutdown());

      let btns = 0;
      try{
        if(this.help) await sentMsg.react('ℹ');
        for(;btns<this.buttons.length;++btns)
          await sentMsg.react(e);

        if(btns !== this.buttons.length) throw new Error('Not all default buttons reacted!');
      }catch(err){
        rej(err);
      }
      if(this.lockToggle)
        if(!this.locked) await sentMsg.react('🔒');
        else await sentMsg.react('🔓');
      await sentMsg.react('⏏');

      res(true);
    });
  }

  toggleLock(setting, requester) {
    if(!this.lockToggle)
      return this._msg.channel.send('The paginator controls may not be locked or unlocked!').then(mm=>mm.delete(3000));

    if(setting) {
      if(this.locked)
        return this._msg.channel.send('The paginator controls are already locked!').then(mm=>mm.delete(3000));
      else if(this._msg.author.id === requester.id) {
        this.locked = true;
        this.sentMsg.react('🔓');
        return this._msg.reply('Only you can operate paginator controls now!').then(mm=>mm.delete(3000));
      } else
        return this._msg.channel.send('You cannot lock the paginator controls!').then(mm=>mm.delete(3000));
    }

    if(!this.locked)
      return this._msg.channel.send('The paginator controls are already unlocked!').then(mm=>mm.delete(3000));
    else if(this._msg.author.id === requester.id) {
      this.locked = true;
      this.sentMsg.react('🔒');
      return this._msg.reply('Everyone can operate the paginator controls now!').then(mm=>mm.delete(3000));
    } else
      return this._msg.channel.send('You cannot unlock the paginator controls!').then(mm=>mm.delete(3000));
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
      if(num!=='help'){
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
      }else{
        this.updateInternal('help');
        await this.updateView();
      }
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
