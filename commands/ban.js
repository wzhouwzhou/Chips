const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
	name:'ban',
  perm:'global.server.ban',
	async func(msg, { send, reply, member, author, content, args, channel, doEval, gMember }) {
    let memberToUse;
    try{ //get mention:
      console.log("Trying to find user by mention..");
      if(!args[0]) return reply("Please specify a user to ban!");
      let target = args[0].match(Constants.patterns.MENTION)[1];
      if(!target) return reply("Please specify a valid user to ban!");
      memberToUse = gMember(target);
      if(memberToUse==null)
        return reply("Invalid member!");
      if(member.id == memberToUse.id)
        return reply("I can't let you ban yourself >.>");
    }catch(err){  //gMember failed:
      console.log(err);
      return reply("I like chips.");
    }

    let reason;
    if(args[1])
      reason = content.substring(content.indexOf(args[1]));

    const embed = new Discord.RichEmbed();
    embed
      .setAuthor(`Ban confirmation - Banning ${memberToUse.user.tag}`, memberToUse.user.displayAvatarURL)
      .setColor("RED")
      .setDescription(reason || "No reason")
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = "Are you sure you want to ban this member?\nThis will expire in 10 seconds. Type __y__es or __n__o.`";
    send(question, {embed: embed});
    let confirmed = false, agreed=false;

    let collector = channel.createMessageCollector(
      m => {
        if(/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)){
          if(m.author.id==author.id) m.reply("Choice accepted. Now processing...");
          //else return m.reply ("Denied");
          confirmed = true;
          agreed = /^(?:y(?:es)?)$/i.test(m.content);
          setTimeout(_=>collector.stop(), 1000);
          return true;
        }
      },
      { time: EXPIRE }
    );
    collector.on('message', m => {
      if(confirmed) return collector.stop();
    });
    collector.on('end', collected => {
      if(!confirmed) return reply('Ban timed out');
      else{
        let m = collected.first();
        console.log(`[Ban]: Collected ${m.content}`);
        if(m.author.id!=author.id) return;
        if(agreed){
          console.log("[Ban] Banning...");
          m.reply("Banning! (jk we're just testing)");
          //member.ban()
        }else{
          console.log("[Ban] cancelled");
          m.reply("Ok, ban cancelled!");
        }
      }
    });
  }
};
/*
global.prompt = async ({msg, question, invalidMsg, filter, timeout = AMBIGUITY_EXPIRE, cancel = true, options = {} }) => {
  let cancelled = false;
  let satisfied = null;
  const filterToUse = (msg2) => {
    if (msg2.content == "cancel" && cancel) {
      return (cancelled = true);
    }
    console.log(msg2.content);
    const result = filter(msg2);
    if (result !== false && result != null) {
      satisfied = msg2;
      console.log("SATISFIED");
      return true;
    }
    return false;
  };
  const sentmsg = await msg.channel.send(question, options || {});
  for (let i = 0; i < 5; i++) {
    try {
      const msgs = await sentmsg.channel.awaitMessages(filterToUse, { time: timeout, maxMatches: 1, errors: ["time"] });
      console.log("msgs: " + msgs.array().join(" "));
      if (!satisfied) {
        if (i < 5) {
          msg.channel.send(invalidMsg);
        }
        continue;
      }
      if (cancelled) {
        console.log("cancelled");
        break;
      }
      if (satisfied) {
        console.log("Satisfied content: "+ satisfied.content);
        return satisfied.content;
      }
    }
    catch (err) {
      break;
    }
  }
  msg.channel.send("Command cancelled.");
  return "";
};

global.promptAmbig = async (members, pluralName = "members") => {
  let satisfied = false;
  let cancelled = false;
  let currentOptions = [];
  const getTag = (gm) => {
    if (gm instanceof Discord.User) {
      return gm.tag;
    }
    else if (gm instanceof Discord.GuildMember) {
      return gm.user.tag;
    }
    else {
      return gm.toString();
    }
  };
  members.forEach((gm) => currentOptions.push(gm));
  const filter = (msg2) => {
    const options = currentOptions;
    if (msg2.author.id !== msg.author.id) {
      return false;
    }
    if (msg2.content == "cancel" || msg2.content == "`cancel`") {
      cancelled = true;
      return true;
    }
    const tagOptions = options.map((gm) => getTag(gm));
    if (tagOptions.includes(msg2.content)) {
      satisfied = true;
      currentOptions = [options[tagOptions.indexOf(msg2.content)]];
      return true;
    }
    const collOptions = new Discord.Collection();
    options.forEach((gm) => {
      collOptions.set((gm instanceof Discord.GuildMember || gm instanceof Discord.User) ? gm.id : gm.toString(), gm);
    });
    const searcher2 = new Searcher.default({ members: collOptions });
    const resultingMembers = searcher2.searchMember(msg2.content);
    if (resultingMembers.length < 1) {
      return true;
    }
    if (resultingMembers.length > 1) {
      currentOptions = resultingMembers;
      return true;
    }
    satisfied = true;
    currentOptions = resultingMembers;
    return true;
  };
  reply(`Multiple ${pluralName} have matched that search. Please specify one.
This command will automatically cancel after 30 seconds. Type \`cancel\` to cancel.
**Members Matched**:
  \`${currentOptions.map((gm) => getTag(gm)).join("`,`")}\``);
  for (let i = 0; i < MAX_PROMPT; i++) {
    try {
      const result = await channel.awaitMessages(filter, {
        time: AMBIGUITY_EXPIRE, maxMatches: 1,
        errors: ["time"],
      });
      if (satisfied) {
        return {
          member: currentOptions[0],
          cancelled: false,
        };
      }
      if (cancelled) {
        msg.channel.send("Command cancelled.");
        return {
          member: null,
          cancelled: true,
        };
      }
      if (i < 5) {
        reply(`Multiple ${pluralName} have matched that search. Please specify one.
This command will automatically cancel after 30 seconds. Type \`cancel\` to cancel.
**Members Matched**:
        \`${currentOptions.map((gm) => getTag(gm)).join("`,`")}\``);
      }
    }
    catch (err) {
      console.log(`Error: At PromptAmbig: ${err}`);
      msg.channel.send("Command cancelled.");
      return {
        member: null,
        cancelled: true,
      };
    }
  }
  msg.channel.send("Automatically cancelled command.");
  return {
    member: null,
    cancelled: true,
  };
};
*/
