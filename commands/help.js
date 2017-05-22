module.exports = {
  name: "help",
  perm: ["server.help"],
  async func(msg, { send, prefix }) {
    send(`**Main commands:**
We apologize for any inconveniences at this time, we are doing a permissions rewrite that may interfere with daily usage.
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Informative commands***
	  **{}help** for this help message.
      **{}support** for chips' support server.
      **{}ping** for ping pong.
      **{}stats** to show my stats.
	  **{}discordstatus** to get the current status of discord.
	  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Moderation Commands***
	  **{}kick** to kick someone.
	  **{}ban** to ban someone.
	  **{}pmute** to give someone a muted role! (Disclaimer: this does not create a Muted role)
	  **{}clear** to clear some messages. (up to 99)
	  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
	  ***Fun Commands***
	  **{}aboose** for aboose.
      **{}exposed** for exposed.
      **{}happy** (new command, credits to Tani)
      **{}eat** for your own bag of chips.
	  **{}lenny** to make a lenny face.
	  **{}cat** to create a cat.
	  **{}dog** to create a dog.
	  **{}rekt** to make some people get rekt.
	  **{}-calc** to calculate some equations!
	  **{}quote** to get a quote of a message.
	  **{}coinflip** to flip a coin.
	  **{}roll** to roll some dice.
	  **{}-ban** to ban people (Disclaimer: This is a fake ban).
	  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      ***Restricted/Whitelisted commands***
      {}emojiban to external-emoji ban someone.
      {}botpanic to force shutdown (Auto restart)`.replace(/{}/g, prefix));
  }
};
