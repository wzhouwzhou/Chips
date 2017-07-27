const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: "help",
  async func(msg, { prefix, Discord }) {
    const InfoMenu = ([
      '**{}help** for this help message.',
      '**{}ping** for more info about ping than you could ever want.',
      '**{}stats** to show my stats.',
      '**{}support** for chips\' support server.',
      '**{}invite** for my invite link',
      '**{}info** for some information!',
      '\t**channel** to get information on the channel that you request!',
      '\t**role** to get information on the role that you request!',
      '\t**server** to get information on the server!',
      '\t**user** to get information on the user that you request!',
      '**${}quote msgid** to quote what someone said in the channel you use the command in.',
      '**{}discordstatus** to get the current status of discord.',
      ].join('\n').replace(/{}/g, prefix));
    const ModMenu = ([
    '**{}ban** to ban someone.',
    '**{}clear** to clear some messages. (up to 99)',
    '**{}hackban** to ban someone by their ID',
    '**{}kick** to kick someone.',
    '**{}pmute** to give someone a muted role! (Disclaimer: this does not create a Muted role)',
    '**{}chipsprefix on** to begin custom prefix setup, use **{}chipsprefix off** to turn off custom prefix',
    ].join('\n').replace(/{}/g, prefix));

    const FunMenu = ([
    '**{}aboose** for aboose.',
    '**{}-ban** to ban people (Disclaimer: This is a fake ban).',
    '**{}-calc** to calculate some equations!',
    '**{}translate text** or **{}translate text targetlang:spanish** to translate some text',
    '**{}cat** to create a cat.',
    '**{}coinflip** to flip a coin.',
    '**{}dog** to create a dog.',
    '**{}exposed** for exposed.',
    '**{}confoosed** for confoosed',
    '**{}eat** for your own bag of chips.',
    '**{}happy** (credits to Tani)',
    '**{}lenny** to make a lenny face.',
    '**{}nsfw** to get NSFW commands',
    '**{}quote** to get a quote of a message.',
    '**{}rekt** to make some people get rekt.',
    '**{}roll** to roll some dice.',
    '**{}3d text** convert some text to 3d (1minute cooldown)',
    '**{}3d2 text** convert some text to 3d in another font (1minute cooldown)',
    '**{}ascii help** to see how to asciify some text.',
    '**{}reverse text** to reverse your text',
    '**{}randomcaps text** to make your text look weird',
    '**{}spooky text** to spread your letters out',
    '**{}big emoji1, emoji2** to enlarge one or more emojis',
    '**{}rotate / text** *and* **{}rotate \ text** to push your text around',
    ''
    ].join('\n').replace(/{}/g, prefix));

    const p = new Paginator ( msg,  {
      type:'paged',
      embedding: true,
      fielding: true,
      title: 'Chips commands',
      text: 'As you can see we are doing a gui overhaul, we apologize if some commands are not working or listed',
      pages:
      [[
        ['Informative commands',InfoMenu],
      ],[
        ['Moderation commands',ModMenu],
      ],[
        ['Fun commands',FunMenu],
      ]],
      }, Discord
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
