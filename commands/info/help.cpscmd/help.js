const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;
const _ = require('lodash');
const gJ = require('../../../rewrite-all/src/deps/functions/grammarJoinF').default({ _ });
const IntroMenu1 = [
  'Chips is a multipurpose bot under heavy development!',
  "We're working on a gui update and structural rewrite right now, so apologies if some commands are not listed",
].join('\n');

const _IntroMenu2 = [
  'Use the arrow button reactions to navigate the help menu and other features of the bot that support it!',
  'The 🔢 button will let you jump to a specific page number.',
  'The ⏏ button will close this menu!',
  "Each command will update with your server's custom prefix!",
  `The prefix for your server is **{}**`,
].join('\n');
/*
const Table = [
  ['1_     _', 'Introductions'],
  ['2_     _', 'Table of Contents'],
  ['3/4', 'Informative commands'],
  ['5_     _', 'Moderation commands'],
  ['6/7', 'Fun/Games'],
  ['8_     _', 'Utility commands'],
  ['9_     _', '(Experimental) Music information'],
  ['10 _   _', 'Additional bot information'],
].map(e => `**P. ${e[0]}**¬\n\t${e[1]}`).join('\n');*/

const _InfoMenu = [
  `\`{}help\` Gives this menu`,
  `\`{}ping\` Gives ping for various actions with chips, and also rates a weighted average!`,
  `\`{}stats\` Gives stats for chips including guild/user count, cpu usage, and more!`,
  "`{}support` for chips' support server.",
  '`{}invite` for my invite link',
  '`{}info` for some information!',
  '`{}quote [msgid]` to quote what someone said in the channel you use the command in.',
  '`{}discordstatus` to get the current status of discord.',
  '`{}memberstatus/{}ms help` to see how you can use it.',
  '`{}lastmessageid/{}lmid` to get last sent message ID.',
  '`{}channelid/{}cid` to get the channel\'s ID',
  "`{}avatar [user mention]` to get someone's avatar",
].join('\n');

const _InfoMenu2 = [
  '`{}serverid/{}sid/{}gid` to get the server\'s ID.',
  '`{}channeltopic/{}ct` to get the channel topic.',
  '`{}membercount/{}mc` to get amount of people in the server.',
  '`{}rolecount/{}rc` to get the amount of roles in the server.',
  '`{}channelcount/{}cc` to get the amount of channels in the server.',
].join('\n');

const _ModMenu = [
  'ban',
  // '`{}ban [mention user]` to ban someone.',
  'clear',
  'botclear',
  'hackban',
  'softban',
  'instaban',
  'unban',
  '`{}kick [mention user]` to kick someone.',
  '`{}botnick/{}bn [text]` to change Chips\' nick.',
  '`{}silence [mention user]` to server-mute someone.',
  '`{}deafen [mention user]` to deafen someone.',
  '`{}unsilence [mention user]` to unserver-mute someone.',
  '`{}undeafen [mention user]` to undeafen someone.',
  '`{}rmute [mention user]` to give someone a muted role! ',
  '\t(Disclaimer: this does not create a Muted role, manually remove the mute role to unmute)',
  '`{}chipsprefix on` to begin custom prefix setup, use `{}chipsprefix off` to turn off custom prefix',
];

const _FunMenu = [
  '`{}con4 length width` to play connect four.',
  '\tFor example, `{}con4 12 6` will create a 12x6 board with 6 columns and 12 rows',
  '`{}chess help` *__New™ (beta)__* to see how to play a chess game!',
  '\tand Yes, _you can even invite Chips to play with you!_',
  '`{}aboose` for aboose.',
  '`{}-ban [mention user]` to ban people (Disclaimer: This is a fake ban).',
  '`{}cat` to create a cat.',
  '`{}coinflip` to flip a coin.',
  '`{}dog` to see a dog.',
  '`{}exposed` for exposed.',
  '`{}confoosed` for confoosed',
  '`{}eat` for your own bag of chips.',
  '`{}happy` for some gifs(credits to Tani)',
  '`{}lenny` to make a lenny face.',
  '`{}ship [mention user]` to ship some people.',
].join('\n');

const _FunMenu2 = [
  '`{}nsfw` to get NSFW commands',
  '`{}rekt` to make some people get rekt.',
  '`{}everyone` to get some at everyone pictures!',
  '`{}roll` to roll some dice.',
  '`{}3d [text]` convert some text to 3d (1minute cooldown)',
  '`{}3d2 [text]` convert some text to 3d in another font (1minute cooldown)',
  '`{}ascii help` to see how to asciify some text.',
  '`{}reverse [text]` to reverse your text',
  '`{}randomcaps [text]` to make your text look weird',
  '`{}spooky [text]` to spread your letters out',
  '`{}big [emoji1, emoji2]` to enlarge one or more emojis',
  '`{}rotate [/ or \\] [text]` to push your text around' +
    '(the slashes dictate the direction and are required)',
  '`{}derp [text]` to make your text derpy (capitalises every other letter)',
].join('\n');

const _UtilityMenu = [
  '`{}-calc [equation or expression]` to calculate some things!',
  '\tThe equation solver can only solve basic algebra up to cubics',
  '`{}urban [text]` To search up something in the urban dictionary.',
  '\tAdd __--allownsfw__ to the end of your search query to turn off the censor',
  '`{}translate [text]` or `{}translate text targetlang:spanish` to translate some text',
  '`{}stoptyping` for if a chips command errored and is stuck "typing" in the channel.',
  '`{}password (length) (numerical/alphanumeric/hex/unicode)` to generate a cryptographically strong password!',
  '`{}settopic/st [newtopic]` to set the channel topic',
].join('\n');

const _MusicMenu = [
  //'`{}music demo` to begin the music demo.',
  //'__This **Beta** feature is still being heavily developed and is not necessarily stable at all times__, sorry!',
  //'Mention me once demo is activated for music commands: __@Chips music help__',
  // 'Server specific prefixes do not work. The only prefix usable with Chips music is mentioning chips',
  'Music module is disabled/undergoing severe maintenance. Apologies for the inconvenience.'
].join('\n');

module.exports = {
  name: 'help',
  async func(msg, { prefix, Discord, reply, member, Constants, args, suffix, send, client }) {
    if (!args[0] || args[0] === 'all') {
      // _.escapeRegExp(prefix).replace(/`/g, '\\`'));
      const IntroMenu2 = _IntroMenu2.replace(/{}/g, _.escapeRegExp(prefix).replace(/`/g, '\\`'));

      const InfoMenu = _InfoMenu.replace(/{}/g, _.escapeRegExp(prefix).replace(/`/g, '\\`'));

      const InfoMenu2 = _InfoMenu2.replace(/{}/g, _.escapeRegExp(prefix).replace(/`/g, '\\`'));

      const ModMenu = _ModMenu.map(e => {
        if (e.includes('{}') || e.includes('\t')) return e;
        const cmdm = client.commands[e].metadata;
        return `\`${cmdm.usage}\` ${cmdm.description}`;
      }).join('\n').replace(/{}/g, '');

      const FunMenu = _FunMenu.replace(/{}/g, '');

      const FunMenu2 = _FunMenu2.replace(/{}/g, '');

      const UtilityMenu = _UtilityMenu.replace(/{}/g, '');

      const MusicMenu = _MusicMenu.replace(/{}/g, '');

      const Additional_Info = [
        ['Custom commands for our patrons:', `Type **${_.escapeRegExp(prefix)}patrons**`],
        ['Invite Link:',
          `[Click Here!](${Constants.BOTINVITE})`],
        ['Support Server:',
          `[Click Here](${Constants.SUPPORTINVITE})`],
        ['Official Website:',
          `[${Constants.WEBSITE}](${Constants.WEBSITE})`],
        ['Feeling generous? Donate here to help us pay for hosting and keep our bot updated constantly!',
          '[https://www.paypal.me/wzhouwzhou](https://www.paypal.me/wzhouwzhou)'],
      ];

      const p = new Paginator(msg, {
        type: 'paged',
        embedding: true,
        fielding: true,
        title: 'The Chips Help Menu',
        text: ' ',
        pages:
        [[
          ['Introductions', IntroMenu1],
          ['How to', IntroMenu2],
        ],/* [
          ['Table of Contents', Table],
        ],*/ [
          ['Informative commands (1)', InfoMenu],
        ], [
          ['Informative commands (2)', InfoMenu2],
        ], [
          ['Moderation commands', ModMenu],
        ], [
          ['Fun commands (1)', FunMenu],
        ], [
          ['Fun commands (2)', FunMenu2],
        ], [
          ['Utility commands', UtilityMenu],
        ], [
          ['Music commands (Open beta)', MusicMenu],
        ], [
          ...Additional_Info,
        ]],
        image: [
          ...new Array(9).fill(null),
          'https://cdn.discordapp.com/attachments/307625096078426123/314201502669471744/Chips.jpg',
        ],
        footer: [
          ...new Array(9).fill(null),
          'Image made by @xdlf#6477.',
        ] }, Discord
      );
      try {
        return await p.sendFirst();
      } catch (err) {
        reply('Something went wrong...');
        throw err;
      }
    }
    const preHelp = Object.entries(client.commands)
      .find(([c]) => c.toLowerCase() === suffix.toLowerCase().replace(new RegExp(_.escapeRegExp(prefix), 'gi'), ''));
    if (!preHelp) return send(`No command with the name "${suffix}" found`);
    const embed = new Discord.MessageEmbed()
      .setColor(member ?
        member.displayColor :
        `#${((1 << 24) * Math.random() | 0).toString(16)}`
      );
    embed.setTitle(`${prefix}${preHelp[0]}`);
    const meta = preHelp[1].metadata;
    embed.setDescription(meta.description || 'No description was found!')
      .addField(`Usage: ${prefix}${meta.usage}`, `Example: ${prefix}${meta.example}`)
      .addField(`Permissions required: ${gJ(_.flatten(meta.perm))}`,
        `Bypass Discord permissions: ${gJ(_.flatten(meta.customperm || ['None'])) || 'None'}`)
      .setFooter(`Category: ${meta.category.replace(/(\w)(\w+)/, (a, b, c) => b.toUpperCase() + c) || 'Default'}`);
    return send(embed);
  },
};
