const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: "help",
  async func(msg, { prefix, Discord }) {
    const IntroMenu1 = ([
      'Chips is a multipurpose bot under heavy development!',
      "We're working on a gui update and structural rewrite right now, so apologies if some commands are not listed",
    ].join('\n'));

    const IntroMenu2 = ([
      'You can use the arrow button reactions to navigate the help menu as well as other features of the bot that support it!',
      'The 🔢 button will let you jump to a specific page number.',
      'The ⏏ button will close this menu!',
      "Each command will update with your server's custom prefix!",
      `The prefix for your server is ${_.escapeRegExp(prefix)}`,
    ].join('\n'));

    const Table = ([
      ['1_     _','Introductions'],
      ['2_     _','Table of Contents'],
      ['3_     _','Informative commands'],
      ['4_     _','Moderation commands'],
      ['5/6' ,'Fun/Games'],
      ['7_     _','Utility commands'],
      ['8_     _','(Experimental) Music information'],
      ['9_     _','Additional bot information'],
    ].map(e=>`**P. ${e[0]}**¬\n\t${e[1]}`).join('\n'));

    const InfoMenu = ([
      '**{}help** for this help message.',
      '**{}ping** for more info about ping than you could ever want.',
      '**{}stats** to show my stats.',
      '**{}support** for chips\' support server.',
      '**{}invite** for my invite link',
      '**{}info** for some information!',
      '\t**channel [channel link, name or id]** to get information on the channel that you request!',
      '\t**role [role mention, name or id]** to get information on the role that you request!',
      '\t**server** to get information on the server!',
      '\t**user [user mention, name or id]** to get information on the user that you request!',
      '**{}quote [msgid]** to quote what someone said in the channel you use the command in.',
      '**{}discordstatus** to get the current status of discord.',
      ].join('\n').replace(/{}/g, prefix));

    const ModMenu = ([
      '**{}ban [mention user]** to ban someone.',
      '**{}clear [amount]** to clear some messages. (up to 99)',
      '**{}botclear [amount]** to delete bot-related messages. (up to the last 100 messages are checked)',
      '**{}hackban [user id]** to ban someone by their ID',
      '**{}kick [mention user]** to kick someone.',
      '**{}silence [mention user]** to server-mute someone.',
      '**{}deafen [mention user]** to deafen someone.',
      '**{}unsilence [mention user]** to unserver-mute someone.',
      '**{}undeafen [mention user]** to undeafen someone.',
      '**{}pmute [mention user]** to give someone a muted role! (Disclaimer: this does not create a Muted role, manually remove the mute role to unmute)',
      '**{}chipsprefix on** to begin custom prefix setup, use **{}chipsprefix off** to turn off custom prefix',
    ].join('\n').replace(/{}/g, prefix));

    const FunMenu = ([
      '**{}con4 length width** to play connect four (beta).',
      'For example, **{}con4 12 6** will create a 12x6 board with 6 columns and 12 rows',
      '**{}aboose** for aboose.',
      '**{}-ban [mention user]** to ban people (Disclaimer: This is a fake ban).',
      '**{}cat** to create a cat.',
      '**{}coinflip** to flip a coin.',
      '**{}dog** to create a dog.',
      '**{}exposed** for exposed.',
      '**{}confoosed** for confoosed',
      '**{}everyone** for when someone pings everyone',
      '**{}eat** for your own bag of chips.',
      '**{}happy** (credits to Tani)',
      '**{}lenny** to make a lenny face.',
    ].join('\n').replace(/{}/g, prefix));

    const FunMenu2 = ([
      '**{}nsfw** to get NSFW commands',
      '**{}rekt** to make some people get rekt.',
      '**{}everyone** to get some at everyone pictures!',
      '**{}roll** to roll some dice.',
      '**{}3d [text]** convert some text to 3d (1minute cooldown)',
      '**{}3d2 [text]** convert some text to 3d in another font (1minute cooldown)',
      '**{}ascii help** to see how to asciify some text.',
      '**{}reverse [text]** to reverse your text',
      '**{}randomcaps [text]** to make your text look weird',
      '**{}spooky [text]** to spread your letters out',
      '**{}big [emoji1, emoji2]** to enlarge one or more emojis',
      '**{}rotate [/ text]** *and* **{}rotate [\\ text]** to push your text around',
      '**{}derp [text]** to make your text derpy (capitalises every other letter)',
    ].join('\n').replace(/{}/g, prefix));

    const UtilityMenu = ([
      '**{}-calc [equation or expression]** to calculate some things! The equation solver can only solve basic algebra up to cubics',
      '**{}urban [text]** To search up something in the urban dictionary. Add __--allownsfw__ somewhere in your search query to turn off the censor',
      '**{}translate [text]** or **{}translate text targetlang:spanish** to translate some text',
      '**{}stoptyping** for if a chips command errored and is stuck "typing" in the channel.',
      '**{}password (length) (numerical/alphanumeric/hex/unicode)** to generate a cryptographically strong password!',
    ].join('\n').replace(/{}/g,prefix));

    const MusicMenu = ([
      '**{}music demo** to begin the music demo.',
      '__This **Open Beta** feature is still being heavily developed and is not necessarily stable at all times__. We apologize in advance.',
      'Mention me once demo is activated for music commands: __@Chips music help__',
      'Server specific prefixes do not work. The only prefix usable with Chips music is mentioning chips',
    ]).join('\n').replace(/{}/g,prefix);

    const AdditionalSht = ([
      ['Invite Link:',`[Click Here!](${Constants.BOTINVITE})`],
      ['Support Server:', `[Click Here](${Constants.SUPPORTINVITE})`],
      ['Official Website: (currently down right now...sorry!)',`[${Constants.WEBSITE}](${Constants.WEBSITE})`],
      ["Feeling generous? Donate here to help us pay for hosting and keep our bot updated constantly!", "[https://www.paypal.me/wzhouwzhou](https://www.paypal.me/wzhouwzhou)"]
    ]);

    const p = new Paginator ( msg,  {
      type:'paged',
      embedding: true,
      fielding: true,
      title: 'The Chips Help Menu',
      text: ' ',
      pages:
      [[
        ['Introductions', IntroMenu1],
        ['How to', IntroMenu2],
      ],[
        ['Table of Contents', Table],
      ],[
        ['Informative commands',InfoMenu],
      ],[
        ['Moderation commands',ModMenu],
      ],[
        ['Fun commands (page 1)',FunMenu],
      ],[
        ['Fun commands (page 2)', FunMenu2],
      ],[
        ['Utility commands',UtilityMenu],
      ],[
        ['Music commands (Open beta)',MusicMenu],
      ],[
        ...AdditionalSht,
      ]],
      image: [
        ...new Array(8).fill(null),
        'https://cdn.discordapp.com/attachments/307625096078426123/314201502669471744/Chips.jpg',
      ],
      footer: [
        ...new Array(8).fill(null),
        'Image made by @xdlf#6477.'
      ]}, Discord
    );
    try{
      return await p.sendFirst();
    }catch(err){
      console.error(err);
      return reply ('Something went wrong...');
    }
    /*
    const embed = new Discord.RichEmbed()
      .setAuthor('This is the Chips Bot Help Menu!', "http://www.mkrfoodproducts.com/images/gallery/image_11.jpg")
      .setTitle('')
      .setDescription('')
      .setColor(1)
      .addField("Main commands", "We apologize for any inconveniences at this time, we are doing a permissions rewrite that may interfere with daily usage.")
      .addField("Informative commands", InfoMenu, true)
      .addBlankField()
      .addField("Moderation Commands", ModMenu, true)
      .addBlankField()
      .addField("Fun Commands", FunMenu, true)
      .setTimestamp((new Date));
    send(' ', {embed});*/
  }
};
