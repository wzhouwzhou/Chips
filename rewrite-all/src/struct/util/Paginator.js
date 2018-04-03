/* eslint complexity: 'off' */
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const DEFAULTCOLOR = 143526;
const PAGEBTNS = '⏮ ⬅ ➡ ⏭ 🔢 ⏏'.split(' ');
const TIME = 864e5;
const TIME2 = 60e3;
const Paginator = class Paginator {
  constructor(msg, data, Discord = require('discord.js')) {
    this._msg = msg;
    this.embed = new Discord.MessageEmbed();
    if (data) this.loadData(data);
    this.currentPage = 0;
  }

  loadData(data) {
    if (this.stopped) return null;
    if (!data.type) throw new Error('No data type!');
    if (!~['paged'].indexOf(data.type)) throw new Error(`${data.type} datatype not supported (yet)`);
    if (data.type === 'paged') this.pages = data.pages;
    // Else if (data.type === 'pagedfn') pagedfn(this);
    else if (data.type === 'rawtext') this.pages = data.raw.split(data.splitter || /\s+/);

    this.embedding = true;
    this.fielding = data.fielding;
    this.title = data.title;
    this.footer = data.footer;
    this.color = data.color || (this._msg.member ? this._msg.member.displayColor : DEFAULTCOLOR);
    this.text = data.text;
    this.author = data.author;
    this.image = data.image;
    if (!this.pages && this.image) this.pages = new Array(this.image.length > 1 ? this.image.length : 1).fill(' ');
    if (!this.title) this.title = new Array(this.pages.length > 1 ? this.pages.length : 1).fill(' ');
    if (!this.text) this.text = new Array(this.pages.length > 1 ? this.pages.length : 1).fill(' ');
    this.thumbnail = data.thumbnail;
    this.buttons = this.pages.length === 1 ? ['⏏'] : data.buttons || PAGEBTNS;
    this.prebuttons = data.prebuttons || [];
    this.help = data.help;
    this.locked = 'locked' in data ? data.locked : !0;
    this.lockToggle = !!data.lockToggle;
    this.description = data.description;

    return this;
  }

  sendFirstGetMsg() {
    return new Promise(async(res, rej) => {
      if (this.stopped) res(null);
      await this.updateInternal(0);
      try {
        await this.updateView(false);
        res(this.sentMsg);
      } catch (err) {
        rej(err);
      }
    });
  }

  sendFirst() {
    return new Promise(async(res, rej) => {
      if (this.stopped) res(null);
      this.updateInternal(0);
      try {
        await this.updateView();
        res(this.sentMsg);
      } catch (err) {
        rej(err);
      }
    });
  }

  updateInternal(pageNum, Discord = require('discord.js')) {
    if (this.stopped) return null;
    if (this.embedding) {
      this.embed = new Discord.MessageEmbed();
      this.currentTitle = this.title ?
        typeof this.title === 'string' ?
          this.title :
          this.title[pageNum] ?
            this.title[pageNum] :
            ' ' :
        null;

      this.embed.setTitle(this.currentTitle)
        .setFooter(this.footer ?
          typeof this.footer === 'string' ?
            this.footer
              .replace(/{pagenum}/gi, pageNum + 1)
              .replace(/{totalpages}/gi, this.pages.length) :
            this.footer[pageNum] ?
              this.footer[pageNum]
                .replace(/{pagenum}/gi, pageNum + 1)
                .replace(/{totalpages}/gi, this.pages.length) :
              `Page ${pageNum + 1} of ${this.pages.length}` :
          `Page ${pageNum + 1} of ${this.pages.length}`
        )
        .setColor(this.color || DEFAULTCOLOR);
      if (this.author) {
        this.embed.setAuthor(typeof this.author === 'string' ? this.author : this.author[pageNum] || ' ');
      }

      if (this.fielding) {
        for (const fieldp of this.pages[pageNum]) this.embed = this.embed.addField(...fieldp, false);
        if (this.description) {
          this.embed
            .setDescription(typeof this.description === 'string' ?
              this.description :
              this.description[pageNum] || ' ');
        }
      } else {
        this.embed.setDescription(this.pages[pageNum]);
      }
      this.currentImage = this.image ? typeof this.image === 'string' ? this.image : this.image[pageNum] : null;
      if (this.currentImage) this.embed.setImage(this.currentImage);
      this.currentThumbnail = this.thumbnail ?
        typeof this.thumbnail === 'string' ?
          this.thumbnail :
          this.thumbnail[pageNum] :
        null;
      if (this.currentThumbnail) this.embed.setThumbnail(this.currentThumbnail);
    }
    return true;
  }

  updateView(waitforbuttons = true) {
    return new Promise(async(res, rej) => {
      if (this.stopped) return res(null);
      try {
        this.currentText = typeof this.text === 'string' ?
                                               this.text :
                                               this.text[this.currentPage] ?
                                                 this.text[this.currentPage] :
                                                 ' ';
        if (!this.sentMsg) {
          if (this.replying) this.sentMsg = await this._msg.reply(this.currentText, { embed: this.embed });
          else this.sentMsg = await this._msg.channel.send(this.currentText, { embed: this.embed });
          if (waitforbuttons) await this.pageButtons(this.sentMsg);
        } else if (this.replying) {
          this.sentMsg = await this.sentMsg.edit(this._msg.author + this.currentText, { embed: this.embed });
        } else {
          this.sentMsg = await this.sentMsg.edit(this.currentText, { embed: this.embed });
        }
      } catch (err) {
        return rej(err);
      }

      return res(this);
    });
  }

  pageButtons(sentMsg = this.sentMsg) {
    return new Promise(async(res, rej) => {
      if (this.stopped) return res(null);
      let nextUser;
      this.collector = sentMsg.createReactionCollector((reaction, user) => {
        if (user.id === '296855425255473154') return false;
        if (this._msg.author.id !== user.id && this.locked) return false;
        if (!!~this.buttons.indexOf(reaction.emoji.toString()) ||
        ['ℹ', '🔒', '🔓'].some(e => e === reaction.emoji.toString())) {
          if (reaction.emoji.toString() === '🔢' && this._msg.author.id !== user.id) return false;
          reaction.remove(user)
            .catch(() => console.log(`g${this._msg.guild ?
                                          this._msg.guild.id :
                                          ':dm'} [Paginator] could not remove reactions`));
          nextUser = user;
          return true;
        }
        return false;
      },
      { time: TIME }
      );
      this.collector.on('collect', async r => {
        switch (r.emoji.toString()) {
          case '⏮': {
            return this.setPage(0);
          }
          case '⏭': {
            return this.setPage(this.pages.length - 1);
          }
          case '⬅': {
            return this.prevPage().catch(_ => _);
          }
          case '➡': {
            return this.nextPage().catch(_ => _);
          }
          case '⏏': {
            return this.collector.stop();
          }
          case '🔒': {
            return this.toggleLock(!0, nextUser, r);
          }
          case '🔓': {
            return this.toggleLock(!1, nextUser, r);
          }
          case '🔢': {
            let tempmsg;
            const mCol = sentMsg.channel.createMessageCollector(
              query => (query.author.id !== '296855425255473154') &&
                !!query.content.match(/(\d+|cancel)/i) &&
                query.author.id === (nextUser ?
                                      nextUser.id :
                                      this._msg.author.id),
              { max: 1, time: TIME2, errors: ['time'] }
            );

            mCol.on('collect', async m => {
              if (!m.content) return false;
              if (/^cancel$/i.test(m.content)) mCol.stop();

              const num = m.content.match(/\d+/) ? m.content.match(/\d+/)[0] : 0;
              try {
                await this.setPage(+num - 1);
              } catch (err) {
                m.channel.send(`${nextUser || this._msg.author}, Invalid page number of \`${+num}\` specified!`)
                .then(mmm => mmm.delete({ timeout: 3000 }));
              }
              tempmsg.delete();
              return m.delete().catch(_ => _);
            });

            mCol.on('end', collected => {
              if (collected.size === 0) {
                return this._msg.channel.send(`${nextUser || this._msg.author}, Timed out`).then(m2 => {
                  setTimeout(() => {
                    tempmsg.delete();
                    m2.delete();
                  }, 3000);
                });
              }
              return false;
            });
            tempmsg = await this._msg.channel.send(
              `${nextUser || this._msg.author}, Please enter a number to jump to, or __cancel__ to cancel`
            );
            return tempmsg;
          }
          case 'ℹ': {
            return this.setPage('help');
          }
          default: {
            return false;
          }
        }
      });

      this.collector.on('end', () => this.shutdown());

      let btns = 0;
      try {
        if (this.help) await sentMsg.react('ℹ');
        for (const pbtn of this.prebuttons) await sentMsg.react(pbtn);
        for (;btns < this.buttons.length; ++btns) await sentMsg.react(this.buttons[btns]);

        if (btns + 1 < this.buttons.length) throw new Error('Not all default buttons reacted!');
      } catch (err) {
        return rej(err);
      }
      if (this.lockToggle) {
        if (!this.locked) await sentMsg.react('🔒');
        else await sentMsg.react('🔓');
      }

      return res(this);
    });
  }

  toggleLock(setting, requester, r) {
    if (!this.lockToggle) {
      return this._msg.channel.send('The paginator controls may not be locked or unlocked!')
      .then(mm => mm.delete({ timeout: 3000 }));
    }

    if (setting) {
      if (this.locked) {
        return this._msg.channel.send('The paginator controls are already locked!')
        .then(mm => mm.delete({ timeout: 3000 }));
      } else if (this._msg.author.id === requester.id) {
        this.locked = true;
        r.remove('296855425255473154');
        this.sentMsg.react('🔓');
        return this._msg.reply('Only you can operate paginator controls now!').then(mm => mm.delete({ timeout: 3000 }));
      } else {
        return this._msg.channel.send(`${requester}, you cannot lock the paginator controls!`)
        .then(mm => mm.delete({ timeout: 3000 }));
      }
    }

    if (!this.locked) {
      return this._msg.channel.send('The paginator controls are already unlocked!')
      .then(mm => mm.delete({ timeout: 3000 }));
    } else if (this._msg.author.id === requester.id) {
      this.locked = false;
      this.sentMsg.react('🔒');
      r.remove('296855425255473154');
      return this._msg.reply('Everyone can operate the paginator controls now!')
      .then(mm => mm.delete({ timeout: 3000 }));
    } else {
      return this._msg.channel.send(`${requester}, you cannot unlock the paginator controls!`)
      .then(mm => mm.delete({ timeout: 3000 }));
    }
  }

  nextPage() {
    if (this.stopped) return null;
    return this.setPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.stopped) return null;
    return this.setPage(this.currentPage - 1);
  }

  setPage(num) {
    return new Promise(async(res, rej) => {
      if (num !== 'help') {
        if (this.stopped) return res(null);
        try {
          if (!this.validateUpdatePage(num)) return rej('Invalid page');
          this.currentPage = num;
          this.updateInternal(this.currentPage);
          await this.updateView();
        } catch (err) {
          return rej(err);
        }
        return res(true);
      } else {
        this.updateInternal('help');
        return this.updateView();
      }
    });
  }

  validateUpdatePage(direction) {
    if (this.stopped) return false;
    if (typeof direction === 'string') {
      if (+direction + this.currentPage < this.pages.length) return true;
    } else if (typeof direction === 'number') {
      if (direction > -1 && direction < this.pages.length && direction !== this.currentPage) return true;
    }
    return false;
  }

  shutdown() {
    return new Promise(async(res, rej) => {
      if (this.stopped) res(true);
      this.stopped = true;
      try {
        await this.sentMsg.delete();
        this.sentMsg = null;
      } catch (err) {
        rej(err);
      }
      res(true);
    });
  }
};

exports.Paginator = Paginator;
