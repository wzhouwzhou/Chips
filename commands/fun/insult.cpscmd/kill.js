module.exports = {
  name: 'kill',
  async func(msg, { send, author, args }) {
  		if(!msg.guild) return send('This command can only be used in a server');
		if(!args) return reply("Please mention someone to kill!");
			const first = author.id;
			const second = msg.mentions.members.first();
			if(!second) return reply("Please mention a user to murder!");
				const killerMan = [
					`<@!${first}> shoves a double barreled shotgun into ${second}\'s mouth and squeezes the trigger of the gun, causing ${second}'s head to horrifically explode like a ripe pimple, splattering the young person's brain matter, gore, and bone fragments all over the walls and painting it a crimson red.`,

					`Screaming in sheer terror and agony, ${second} is horrifically dragged into the darkness by unseen forces, leaving nothing but bloody fingernails and a trail of scratch marks in the ground from which the young person had attempted to halt the dragging process.`,

					`<@!${first}> takes a machette and starts hacking away on ${second}, chopping ${second} into dozens of pieces.`,

					`<@!${first}> pours acid over ${second}. *"Well don't you look pretty right now?"*`,

					`${second} screams in terror as a giant creature with huge muscular arms grab {$second}'s head; ${second}'s screams of terror are cut off as the creature tears off the head with a sickening crunching sound. ${second}'s spinal cord, which is still attached to the dismembered head, is used by the creature as a makeshift sword to slice a perfect asymmetrical line down ${second}'s body, causing the organs to spill out as the two halves fall to their respective sides.`,

					`<@!${first}> grabs ${second}'s head and tears it off with superhuman speed and efficiency. Using ${second}'s head as a makeshift basketball, <@!${first}> expertly slams dunk it into the basketball hoop, much to the applause of the audience watching the gruesome scene.`,

					`<@!${first}> uses a shiv to horrifically stab ${second} multiple times in the chest and throat, causing ${second} to gurgle up blood as the young person horrifically dies.`,

					`${second} screams as Pyramid Head lifts Sarcen up using his superhuman strength. Before ${second} can even utter a scream of terror, Pyramid Head uses his superhuman strength to horrifically tear ${second} into two halves; ${second} stares at the monstrosity in shock and disbelief as ${second} gurgles up blood, the upper body organs spilling out of the dismembered torso, before the eyes roll backward into the skull.`,

					`${second} steps on a land mine and is horrifically blown to multiple pieces as the device explodes, the ${second}'s entrails and gore flying up and splattering all around as if someone had thrown a watermelon onto the ground from the top of a multiple story building.`,

					`${second} is killed instantly as the top half of his head is blown off by a Red Army sniper armed with a Mosin Nagant, ${second}'s brains splattering everywhere in a horrific fashion`
				];
					return send(`${killerMan[Math.floor(killerMan.length*Math.random())]}`);
  }
};
