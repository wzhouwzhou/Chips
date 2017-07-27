'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const DEFAULTCOLOR = 143526;
const PAGEBTNS = '⏮ ⬅ ➡ ⏭ 🔢 ⏏'.split(' ');

const Paginator = class Paginator {
  constructor(msg, data, Discord = require('discord.js')) {
    this._msg = msg;
    this.embed = new Discord.RichEmbed();
    if(data) this.loadData (data);
    this.currentPage = 0;
  }

  loadData ( data ) {
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
  }

  sendFirst () {
    return new Promise( async (res, rej) => {
      if(this.embedding){
        this.embed.setTitle(this.title||'').setFooter(this.footer||'').setColor(this.color||DEFAULTCOLOR).setAuthor(this.author);

        if(this.fielding){
          this.pages[0].forEach(field=>this.embed.addField(...field));
        }else{
          this.embed.setDescription(this.pages[0]);
        }
      }

      this.updateView().catch(rej);
      res(true);
    });
  }

  updateView () {
    return new Promise ( async (res, rej) =>{
      try{
        if(!this.sentMsg){
          if(this.replying)
            this.sentMsg = await this._msg.reply(this.text, { embed: this.embed });
          else
            this.sentMsg = await this._msg.channel.send(this.text, { embed: this.embed });
          await this.pageButtons(this.sentMsg);
        }else{
          if(this.replying)
            this.sentMsg = await this.sentMsg.edit(this._msg.author+this.text, { embed: this.embed });
          else
            this.sentMsg = await this.sentMsg.edit(this.text, { embed: this.embed });
        }
      }catch(err){
        rej(err);
      }
    });
  }

  pageButtons (sentMsg) {
    return new Promise( async (res, rej) => {
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
    });
  }

  nextPage () {
    return this.setPage(this.currentPage+1);
  }

  prevPage () {
    return this.setPage(this.currentPage-1);
  }

  setPage (num) {
    return new Promise( async (res, rej) => {
      try{
        if(!this.validateUpdatePage(num)) rej('Invalid page');
        this.currentPage = num;
        await this.updateView();
      }catch(err){
        rej(err);
      }
      res(true);
    });
  }

  validateUpdatePage (direction) {
    if(typeof direction === 'string'){
      if(+direction+this.currentPage < this.pages.length) return true;
    }else if(typeof direction === 'number')
      if(0<direction&direction<this.pages.length&&direction!==this.currentPage) return true;
    return false;
  }
};

exports.Paginator = Paginator;
