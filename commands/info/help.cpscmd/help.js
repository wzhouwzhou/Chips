const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: "help",
  async func(msg, { prefix, Discord }) {
    const InfoMenu = ([
      '**{}discordstatus** to get the current status of discord.',
      '**{}help** for this help message.',
      '**{}ping** for ping pong.',
      '**{}stats** to show my stats.',
      '**{}support** for chips\' support server.',
      '**{}info** for some information!',
      '\t**channel** to get information on the channel that you request!',
      '\t**role** to get information on the role that you request!',
      '\t**server** to get information on the server!',
      '\t**user** to get information on the user that you request!'].join('\n').replace(/{}/g, prefix));
    const ModMenu = ([
    '**{}ban** to ban someone.',
    '**{}clear** to clear some messages. (up to 99)',
    '**{}hackban** to ban someone by their ID',
    '**{}kick** to kick someone.',
    '**{}pmute** to give someone a muted role! (Disclaimer: this does not create a Muted role)'].join('\n').replace(/{}/g, prefix));

    const FunMenu = ([
    '**{}aboose** for aboose.',
    '**{}-ban** to ban people (Disclaimer: This is a fake ban).',
    '**{}-calc** to calculate some equations!',
    '**{}cat** to create a cat.',
    '**{}coinflip** to flip a coin.',
    '**{}dog** to create a dog.',
    '**{}exposed** for exposed.',
    '**{}eat** for your own bag of chips.',
    '**{}happy** (credits to Tani)',
    '**{}lenny** to make a lenny face.',
    '**{}nsfw** to get NSFW commands',
    '**{}quote** to get a quote of a message.',
    '**{}rekt** to make some people get rekt.',
    '**{}roll** to roll some dice.'].join('\n').replace(/{}/g, prefix));

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
