const Jimp = require('jimp');
global.SBKWC = true;
const algebra = require('../../handlers/algebra-0.2.6.min');
const fs = require('fs');
const _ = require('lodash');
module.exports = () => {
  global.client.on('guildMemberAdd', async member => {
    let memberguild = member.guild;
    let userid = member.user.id;

    if (handleAutoKickOrBan(memberguild.id, member)) {
      handleAutoRole(memberguild.id, member);

      if (client.memberjoin.captcha[memberguild.id]) {
        try {
          // _.random(0,1);
          let choose = false;
          let results;
          if (!choose) results = await antiraidCaptcha(member);
          else results = await antiraidCaptcha2(member);

          console.log(`Captcha success results: ${results}`);
        } catch (fail) {
          console.log(`Captcha failure results: ${fail}`);

          if (fail[1] && (fail[1] == 'failed captcha' || fail[1] == 'timeout')) await fail[0].kick();
        }
      }
      try {
        if (memberguild.id == '257889450850254848') {
          setTimeout(async () => {

            await member.addRole(memberguild.roles.get('305302877641900052') ||
              memberguild.roles.find('name', 'Unverified'));

            let welcomeC = memberguild.channels.get('314407824568614913') || memberguild.channels.find('name', 'unverified');
            if (SBKWC) {
              const embed = new Discord.MessageEmbed();
              embed.setDescription([
                '1. If you got our invite online **send link** to webpage (not invite link) or **show us a photo** where ' +
                  'you got our discord invite.\nIf you got it from a friend, please tell us who like so: ' +
                  '**SomebodyHere#1234**.',

                '2. Please read <#404992099478405122>; will you follow the rules and agree to the bot TOS?',

                '3. What is your favourite diep.io tank?',
              ].join('\n')).setTitle('Please answer these here and wait for staff to verify you.');
              welcomeC.send(`${member.user}, Welcome to Sinbadx Knights!`, { embed });
            }
          }, 1700);
        } else if (memberguild.id == '250801092143611905') {
          setTimeout(() => {
            console.log('[DColony] adding role...');
            let therole = memberguild.roles.get('329716599399514113') || memberguild.roles.find('name', 'Unverified');
            if (!therole) return;

            member.addRole(therole);
            console.log('[DColony] sending welcome msg...');
            let welcomeC = memberguild.channels.get('329717427707576320') || memberguild.channels.find('name', 'unverified');
            welcomeC.send(`<@${userid}>, Welcome! Please read <#250801092143611905> and wait for a staff member to verify you to be able to speak in other channels!`);
          }, 1000);
        }else if (memberguild.id == '384976959500845057') {
          setTimeout(() => {
            console.log('[Anxiety🔞] sending welcome msg...');
            let welcomeC = memberguild.channels.get('384976960138248193') || memberguild.channels.find('name', 'public');
            welcomeC.send(`<@${userid}>, Welcome to Anxiety🔞! Have a great time here!`);
          }, 1000);
        } else if (memberguild.id == '315891125825044482') {
          setTimeout(() => {
            console.log('[SUCKX2] adding role...');
            member.addRole(memberguild.roles.get('316017088160595970') || memberguild.roles.find('name', 'unverified'));
            console.log('[SUCKX2] sending welcome msg...');
            let welcomeC = client.channels.get('307342989783728131') || memberguild.channels.find('name', 'unverified');
            welcomeC.send(`<@${userid}>, Welcome to Sunk Nights! **If you would like to get verified and be able to speak in the other channels, please answer the following questions!**
              1. How did you hear about this server?
              2. Why did you join this server?
              3. Do you promise to read <#316019707276820483>?
              4. What is your favorite diep.io tank?
              (you can answer these with just a sentence or two, no need to write an essay!)`).then(console.log('[SUCKX2] Welcome msg sent'));
          }, 500);
        } else if (memberguild.id == '315502587111669772') {
          setTimeout(() => {
            console.log('Changing nick...');
            member.setNickname(`(♤)${member.user.username}`.substring(0, Math.min(member.user.username + `(♤)`.length, 32)));
          }, 500);
        } else if (memberguild.id === '339930093042532363') {
          setTimeout(() => {
            //console.log('[HH] adding role...');
            //member.addRole(memberguild.roles.get('378216052351565834') || memberguild.roles.find('name', 'unverified'));
            console.log('[HH] sending welcome msg...');
            let welcomeC = client.channels.get('378216458314055710') || memberguild.channels.find('name', 'unverified');
            if (welcomeC) welcomeC.send(`<@${userid}>, Welcome to ${memberguild.name}! Please check your dms!`);
          }, 500);
        } else if (memberguild.id == '291558782755012610') {
          setTimeout(() => {
            console.log('Changing nick for sm...');
            member.setNickname(`[SM] ${member.user.username}`.substring(0, 32));
            member.addRole(memberguild.roles.get('385865868417957888') || memberguild.roles.find('name', 'Unverified'));
            let welcomeC = client.channels.get('385851855084978176') || memberguild.channels.find('name', 'unverified');
            if (welcomeC) welcomeC.send(`${member.user + []}, Welcome to ${memberguild.name}! Make SURE to read the <#366505552752148481> and <#312224217967886336>!\nPlease wait for staff to verify you with __\`-vs ok ${member.user + []}__!`);
          }, 1500);
        } else if (memberguild.id === '373481656134270986') {
          setTimeout(() => {
            const embed = new Discord.MessageEmbed();
            embed.setTitle('Woah, Hi there!');
            embed.setImage('https://cdn.discordapp.com/attachments/378182532459397121/378632645187338250/Baka-World.png');
            embed.addField('I am Chips Bot, and Welcome to Baka World!!',
              [
                'Baka World is a community for gamers, youtubers, streamers, and everything anime!',
                'Check out <#385987386804404224> for more info, and if you have any questions, staff are always ready to answer them!',
                'Use https://guilds.chipsbot.me/baka_world if you want to invite your friends!\n_ _',
              ].join`\n`);
            if(member.id !== '252541269602074635') embed.addField('About me',
              [
                'I am a Discord bot with lots of fun and games like Chess you can play against someone or the bot, Connect Four, Image Generation and Memes.',
                "There's 24/7 music, hundreds of commands for  utilities, info, nsfw, and backup moderation in case your main mod bot is down.",
                "Work is being done on a cleverbot as well as a webpanel right now that's pretty cool: https://i.imgur.com/Rtj9G1P.png",
                'We encourage you to visit [my website](https://chipsbot.me:2087/) or join the support server https://discord.gg/jj5FzF7 !',
                '\nAlmost 1.7 thousand servers use Chips! To add me to your server, click on [this invite link](https://invite.chipsbot.me/) and select your server in the dropdown',
              ].join`\n`);

            member.send(embed);
          }, 1500);
        }
      } catch (err) {
        console.log('could not add unverified role or set nick');
      }
    }
  });
  require('./ChannelUpdate')();
};

const handleAutoKickOrBan = (gid, mem) => {
  const guild = mem.guild, uid = mem.id;
  if (memberjoin.panics[gid] && memberjoin.panicKick[gid]) {
    setTimeout(async() => {
      let oldmem = await mem.kick();

      while (mem.guild.members.get(oldmem.id)) {
        try {
          oldmem = await oldmem.kick();
        } catch (err) {
          console.log(`[Autokick for guild ${mem.guild.id}]: Failed to kick ${oldmem.id}..trying again.`);
        }
      }
    }, 3000);
    return false;
  } else if (memberjoin.panics[gid] && memberjoin.panicBan[gid]) {
    setTimeout(async() => {
      if (!mem.bannable) return;
      let oldmem = await mem.ban('AntiRaid');
      let max = 30, i = 0;
      while ((await guild.fetchBans()).get(uid) == null) {
        try {
          oldmem = await oldmem.ban('AntiRaid');
          if (++i <= max) break;
        } catch (err) {
          console.log(`[Autoban for guild ${mem.guild.id}]: Failed to ban ${oldmem.id}..trying again... \n\tError was: ${err}`);
        }
      }
    }, 3000);
    return false;
  }
  return true;
};

const handleAutoRole = (gid, mem) => {
  if (client.memberjoin.autorole[gid] && mem.guild.roles.get(client.memberjoin.autorole[gid])) mem.addRole(mem.guild.roles.get(client.memberjoin.autorole[gid]));
};

const noconfusion = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
  'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];

const antiraidCaptcha = mem => new Promise((res, rej) => {
  mem.died = false;
  let guild = mem.guild;
  let timestamp = process.hrtime();
  let captchaText = Math.random().toString(36).replace(/[^a-z,\d]+/g, '')
    .substring(1, 8)
    .toUpperCase()
    .replace(/I/g, 'L')
    .replace(/U/g, 'V')
    .replace(/[O0]/g, () => _.sample(noconfusion));

  let image = new Jimp(256, 256);
  let filepath = `${mem.id}.captcha.${timestamp}.${image.getExtension()}`;

  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
    for (const letterInd in captchaText.split('')) image.print(font, 10 + Math.floor(5 * Math.random()) + 30 * letterInd, 112 + Math.floor(40 * Math.random()), captchaText[letterInd]);
    image.blur(2);

    image.write(filepath, async() => {
      let sentmsg = await mem.user.send(
        [`${mem}, Hello! You just joined the server \`\`${guild.name}\`\` which has an antiraid enabled.`,
          '**To start the verification process, please respond with the letters and numbers you see ',
          'in this image (not case sensitive):**'].join``,
        { files: [filepath] });
      fs.unlinkSync(filepath);

      let thisDmC = sentmsg.channel;

      let memIsBlind = 0;
      const filter = m => {
        if (m.author.id !== mem.id) return false;

        if (m.content.toUpperCase() === captchaText) {
          return true;
        } else {
          if (mem.died === false) {
            memIsBlind++;
            thisDmC.send(`Incorrect! (${3 - memIsBlind > 0 ? `${3 - memIsBlind} tries left, please try again!` :
              'Sorry, you have failed the captcha too many times'})`);
            if (memIsBlind >= 3) {
              mem.died = true;
              rej([mem, 'failed captcha']);
              return true;
            }
          }
          return false;
        }
      };
      thisDmC.awaitMessages(filter, { max: 1, time: 60 * 1000, errors: ['time'] })
        .then(collected => {
          if (!mem.died) {
            console.log(collected.size);
            thisDmC.send('Successfully verified with captcha!');
            mem.died = false;
            res([mem, 'success']);
          }
        }).catch(collected => {
          if (collected.size == 0 && mem.died == false) {
            thisDmC.send('You did not respond in time! You can join back and solve a new captcha to be verified.');
            console.log(`After 5 minutes, the user did not respond.`);
            mem.died = true;
            rej([mem, 'timeout']);
          } else {
            thisDmC.send('Uh oh, something went wrong with your verification!');
          }
        });
    });
  });
});

const antiraidCaptcha2 = mem => new Promise((res, rej) => {
  mem.died2 = false;
  let guild = mem.guild;
  let timestamp = process.hrtime();
  let captchaText, answer;
  do {
    captchaText = `${_.random(1, 9)}`;
    let l = 2;
    let operators = ['+', '-', 'x', '/'];
    let lastUsed = '';
    for (let i = 0; i < l; i++) {
      let temp;
      do {
        temp = operators[_.random(0, operators.length - 1)];
      } while (temp === lastUsed);
      lastUsed = temp;
      captchaText += `${lastUsed}${_.random(1, 9)}`;
    }
    answer = new algebra.parse(captchaText.replace(/x/g, '*')).toString();
    console.log(`Answer: ${answer}`);
  } while (isNaN(+answer) || ~~+answer !== +answer || +answer < 0);

  captchaText += '=?';

  let image = new Jimp(256, 256);
  let filepath = `${mem.id}.captcha2.${timestamp}.${image.getExtension()}`;

  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
    for (const letterInd in captchaText.split('')) image.print(font, 10 + Math.floor(5 * Math.random()) + 30 * letterInd, 112 + Math.floor(25 * Math.random()), captchaText[letterInd]);
    image.blur(2);
    console.log('Creating image...');
    image.write(filepath, async() => {
      let sentmsg = await mem.user.send(`${mem}, Hello! You just joined the server \`\`${guild.name}\`\` which has an antiraid enabled.
          **To start the verification process, please respond by solving the simple math problem here (order of operations apply):** `,
        { files: [filepath] });
      fs.unlinkSync(filepath);

      let thisDmC = sentmsg.channel;

      let memIsBlind = 0;
      console.log('Creating filter...');
      const filter2 = m => {
        console.log('m received');
        if (m.author.id != mem.id) return false;
        let u;
        try {
          u = algebra.parse(m.content.toLowerCase()).toString();
        } catch (err) {
          console.error(err);
        }
        console.log('Checking answer');
        if (~~+answer === +u) {
          console.log(m.content);
          return true;
        } else {
          if (mem.died2 == false) {
            memIsBlind++;
            thisDmC.send(`Incorrect! (${3 - memIsBlind > 0 ? `${3 - memIsBlind} tries left, please try again!` : 'Sorry, you have failed the captcha too many times'})`);
            if (memIsBlind >= 3) {
              mem.died2 = true;
              rej([mem, 'failed captcha']);
              return true;
            }
          }
          return false;
        }
      };
      console.log(`Awaiting messages..${thisDmC.type}`);
      let mCol = thisDmC.createMessageCollector(filter2, { max: 1, time: 5 * 60 * 1000, errors: ['time'] });
      mCol.on('end', collected => {
        if (collected.size == 0 && mem.died == false) {
          console.log(`After 5 minutes, the user did not respond.`);
          mem.died2 = true;
          return res([mem, 'timeout']);
        } else if (!mem.died2) {
          console.log(`Success${collected.size}`);
          thisDmC.send('Successfully verified with captcha!');
          mem.died2 = false;
          return res([mem, 'success']);
        } else {
          console.log(collected);
          return thisDmC.send('Uh oh, something went wrong with your verification!');
        }
      });
    });
  });
});
