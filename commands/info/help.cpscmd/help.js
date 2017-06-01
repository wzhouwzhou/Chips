module.exports = {
  name: "help",
  perm: ["server.help"],
  async func(msg, { send, prefix }) {
    send(`**Main commands:**
We apologize for any inconveniences at this time, we are doing a permissions rewrite that may interfere with daily usage.
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Informative commands***
	**{}discordstatus** to get the current status of discord.
	**{}help** for this help message.
	**{}ping** for ping pong.
	**{}stats** to show my stats.
	**{}support** for chips' support server.
	**{}info** for some information!
		**{}channel**
		**{}role**
		**{}server**
		**{}user**
	  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Moderation Commands***
	**{}ban** to ban someone.
	**{}clear** to clear some messages. (up to 99)
	**{}hackban** to ban someone by their ID
	**{}kick** to kick someone.
	**{}pmute** to give someone a muted role! (Disclaimer: this does not create a Muted role)
	  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Fun Commands***
	**{}aboose** for aboose.
	**{}-ban** to ban people (Disclaimer: This is a fake ban).
	**{}-calc** to calculate some equations!
	**{}cat** to create a cat.
	**{}coinflip** to flip a coin.
	**{}dog** to create a dog.
	**{}exposed** for exposed.
	**{}eat** for your own bag of chips.
	**{}happy** (new command, credits to Tani)
	**{}lenny** to make a lenny face.
	**{}-quote** to get a quote of a message.
	**{}rekt** to make some people get rekt.
	**{}roll** to roll some dice.
	**{}nsfw** to get NSFW commands`.replace(/{}/g, prefix));
  }
};
