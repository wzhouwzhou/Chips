module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {      
    let InfoMenu = (`**{}discordstatus** to get the current status of discord. \n
    **{}help** for this help message. \n
    **{}ping** for ping pong. \n
    **{}stats** to show my stats. \n
    **{}support** for chips' support server. \n
    **{}info** for some information! \n
        **channel** to get information on the channel that you request! \n
        **role** to get information on the role that you request! \n
        **server** to get information on the server! \n
        **user** to get information on the user that you request!`.replace(/{}/g, prefix));
    let ModMenu = (`**{}ban** to ban someone. \n
    **{}clear** to clear some messages. (up to 99) \n
    **{}hackban** to ban someone by their ID \n
    **{}kick** to kick someone. \n
    **{}pmute** to give someone a muted role! (Disclaimer: this does not create a Muted role)`.replace(/{}/g, prefix));
    let FunMenu = (`**{}aboose** for aboose. \n
    **{}-ban** to ban people (Disclaimer: This is a fake ban). \n
    **{}-calc** to calculate some equations! \n
    **{}cat** to create a cat. \n
    **{}coinflip** to flip a coin. \n
    **{}dog** to create a dog. \n
    **{}exposed** for exposed. \n
    **{}eat** for your own bag of chips. \n
    **{}happy** (credits to Tani) \n
    **{}lenny** to make a lenny face. \n
    **{}nsfw** to get NSFW commands \n
    **{}quote** to get a quote of a message. \n
    **{}rekt** to make some people get rekt. \n
    **{}roll** to roll some dice.`.replace(/{}/g, prefix));
      const embed = new Discord.RichEmbed()
          .setAuthor('This is the Chips Bot Help Menu!', "http://www.mkrfoodproducts.com/images/gallery/image_11.jpg")
          .setTitle('')
          .setDescription('')
          .setColor(1);
          .setTimestamp()
          .addField("**Main commands**", "We apologize for any inconveniences at this time, we are doing a permissions rewrite that may interfere with daily usage.")
          .addBlankField(true)
          .addField("**Informative commands**", InfoMenu, true);
          .addBlankField(true)
          .addField("**Moderation Commands**", ModMenu, true);
          .addBlankField(true)
          .addField("**Fun Commands**", FunMenu, true);
            send({embed: embed});
              }
        };
