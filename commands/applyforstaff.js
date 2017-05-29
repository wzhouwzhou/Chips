
const EXPIRE = 10000;
const STEP1EXPIRE = (5*60*1000);
temp = {};

ex = {
	name:'applyforstaff',
  perm:['global.server.chips.apply'],
	customperm:['ADMINISTRATOR'],
	async func(msg, { reply, author, guild, channel, member }) {
		if(guild.id!=Constants.servers.SUPPORT) return;
		if(channel.id!=Constants.channels.SUPPORT_STAFFAPPLICATION){
			if(guild.roles.get(Constants.roles.SUPPORT_STAFFAPPLICATIONROLE).members.size==0){
		    let embed = new Discord.RichEmbed();
		    embed
		      .setTitle(`${author.tag}`, author.displayAvatarURL)
		      .setColor(1)
		      .setDescription(`Hi there! You are about to submit a staff application. You will only be able to submit a staff application once. Please type __y__es or react with ${Constants.emojis.CHECK} to continue. Type __n__o to cancel. You can also react with ${Constants.emojis.X} at any point during the application to cancel!`)
		      .setTimestamp(new Date());
		    let details = `Staff application: `;
		    temp.sentmsg = await reply(details, {embed: embed});

		    temp.confirmed = false; temp.agreed=false; temp.rxn = false;

				let rxnCol = temp.sentmsg.createReactionCollector(
					(reaction, user) => {
						if(user.id != author.id) return false;
						if(temp.confirmed||temp.agreed) return false;
						if(reaction.emoji.toString() == Constants.emojis.CHECK){
							reply("Accepted choice " + reaction.emoji.name).then(m=>{
								setTimeout(()=>m.delete(),1000);
							});
							temp.confirmed = true;
							temp.agreed = true;
							temp.rxn = true;
							return true;
						}else if(reaction.emoji.toString() == Constants.emojis.X){
							reply("Accepted choice " + reaction.emoji.name).then(m=>{
								setTimeout(()=>m.delete(),1000);
							});
							temp.confirmed=true;
							temp.rxn = true;
							temp.agreed=false;
							return true;
						}
					},
					{ max: 1, time: EXPIRE, errors: ['time'] }
				);
				let msgCol = channel.createMessageCollector(
					query => {
						if(query.content)
							if(/^(?:y(?:es)?)|(?:no?)$/i.test(query.content))
								if((!temp.confirmed&&!temp.agreed)&&query.author.id==author.id){
									temp.confirmed = true;
									temp.agreed = /^(?:y(?:es)?)$/i.test(query.content);
									reply(`Accepted response, continuing: ${temp.agreed}`).then(m=>{
										setTimeout(()=>m.delete(),1000);
									});
									temp.usedmsg = true;
									msgCol.stop();
									return true;
								}
					},
					{ max: 1, time: EXPIRE, errors: ['time'] }
				);

				await temp.sentmsg.react(`${Constants.emojis.CHECK}`); // or 👌');
				await temp.sentmsg.react(`${Constants.emojis.X}`);

				rxnCol.on('collect', r => {
					console.log(`Collected ${r.emoji.name}`);
					rxnCol.stop();
				});
				rxnCol.on('end', collected => {
					if(temp.agreed&&temp.rxn){
						console.log(collected);
						msgCol.stop();
						return;
					}
				});

				msgCol.on('collect',_=>_);
				msgCol.on('end',async collected => {
					let sentmsg = temp.sentmsg;
					if(temp.usedmsg&&!temp.rxn){
						rxnCol.stop();
					}
					sentmsg.delete();
					console.log(collected);
					if(!temp.confirmed){
						return msg.reply("Application timed out!");
					}
					if(!temp.agreed){
						return msg.reply("Staff application cancelled!");
					}
					await member.addRole(guild.roles.get('318569495486791680'));

					return reply(`Excellent! The information you provide in your application will be confidential. Please head over to <#${Constants.channels.SUPPORT_STAFFAPPLICATION}> and type \`\`${prefix}applyforstaff\`\` to begin!`);
				});
			}else{
				let embed = new Discord.RichEmbed();
		    embed
		      .setTitle(`${author.tag}`, author.displayAvatarURL)
		      .setColor(1)
		      .setDescription(`Hi there! Greatest apologies, someone else is currently submitting an application. To prevent our system from being overloaded you cannot submit an application right now. If you believe this is in error, contact an online staff member!. Please wait a few minutes before trying again, and sorry for the inconvenience!`)
		      .setTimestamp(new Date());
		    let details = `Sorry! `;
		    return reply(details, {embed: embed});
			}
		}else{
			let embed = new Discord.RichEmbed();
	    embed
	      .setTitle(`${author.tag}`, author.displayAvatarURL)
	      .setColor(101010)
	      .setDescription(`"Please enter some details about yourself, where you're from/timezone, how old you are, etc. Provide as much or as little information as you'd like, it just helps us get to know you better."`)
	      .setTimestamp(new Date());
	    let details = `Staff application (Part 1): `;
	    temp.sentmsg = await reply(details, {embed: embed});
			temp.confirmed = false; temp.next=true; temp.rxn = false;
			temp.usedmsg = false;
			let step1Col = channel.createMessageCollector(
				_=>{temp.next=true;return true;},
				{ max: 1, time: STEP1EXPIRE, errors: ['time'] }
			);
			let step1rxnCol = temp.sentmsg.createReactionCollector(
				(reaction, user) => {
					if(user.id != author.id) return false;
					if(temp.confirmed||!temp.next) return false;
					if(reaction.emoji.toString() == Constants.emojis.X){
						reply("Accepted choice " + reaction.emoji.name);
						temp.confirmed=true;
						temp.next=false;
						temp.rxn = true;
						return true;
					}
				},{ max: 1, time: STEP1EXPIRE, errors: ['time'] }
			);
			step1rxnCol.on('collect', _=>_);
			step1rxnCol.on('end', collected => {
				if(temp.confirmed&&temp.rxn){
					console.log("Stopping step1 msg collector, " + collected);
					step1Col.stop();
					return;
				}
			});
			await temp.sentmsg.react(`${Constants.emojis.X}`);
			step1Col.on('collect',_=>_);
			step1Col.on('end',async collected => {
				let sentmsg = temp.sentmsg;
				if(!temp.rxn){
					step1rxnCol.stop();
				}
				sentmsg.delete();
				console.log(collected);
				if(!temp.confirmed){
					return msg.reply("Application timed out!");
				}
				if(!temp.next){
					msg.reply("Staff application cancelled!");
					setTimeout(async ()=>{
						try{
							let msgs = await channel.fetchMessages({limit: 100});
							await channel.bulkDelete(msgs);
						}catch(err){
							return reply(`Uh oh, could not end your staff application, please let an online staff know about this!`);
						}
						await member.removeRole(guild.roles.get(Constants.roles.SUPPORT_STAFFAPPLICATION));
					},5000);
				}
			});
		}
	}
};

module.exports = ex;
