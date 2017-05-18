const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const AMBIGUITY_EXPIRE = 30000;
const MAX_PROMPT = 5;

module.exports = {
	name:'ban',
	async func(msg, { send, member, author, content, channel, doEval, prompt, promptAmbig }) {
    let dummy = {};
    const actions = [
      (dummy.actions && dummy.actions[0]) || "Banning",
      (dummy.actions && dummy.actions[1]) || "Banned",
      (dummy.actions && dummy.actions[2]) || "banned",
      (dummy.actions && dummy.actions[3]) || "Ban",
      (dummy.actions && dummy.actions[4]) || "ban",
    ];
    let memberToUse=member;
    let reason = "hoi";
    const embed = new Discord.RichEmbed();
    embed
      .setAuthor(`${actions[3]} confirmation - ${memberToUse.user.tag}`, memberToUse.user.displayAvatarURL)
      .setColor("RED")
      .setDescription(reason || "No reason")
      .setTimestamp(new Date());
    const result =prompt({
      msg: msg,
      question: `Are you sure you want to ${actions[4]} this member? \
This will expire in 15 seconds. Type __y__es or __n__o.`,
      invalidMsg: "__Y__es or __n__o?",
      filter: (msg2) => {
        console.log(/^(?:y(?:es)?)|(?:no?)$/i.test(msg2.content));
        return /^(?:y(?:es)?)|(?:no?)$/i.test(msg2.content);
      },
      timeout: 15*1000,
      cancel: false,
      options: { embed },
    });
  }
};

global.prompt = async ({msg, question, invalidMsg, filter, timeout = AMBIGUITY_EXPIRE, cancel = true, options = {} }) => {
  let cancelled = false;
  let satisfied = null;
  const filterToUse = (msg2) => {
    if (msg2.content == "cancel" && cancel) {
      return (cancelled = true);
    }
    console.log(msg2.content);
    const result = filter(msg2);
    if (result != false && result != null) {
      satisfied = msg2;
      console.log("SATISFIED");
      return true;
    }
    return false;
  };
  const sentmsg = await msg.channel.send(question, options || {});
  for (let i = 0; i < MAX_PROMPT; i++) {
    try {
      const msgs = await msg.channel.awaitMessages(filterToUse, { time: timeout, maxMatches: 1, errors: ["time"] });
      if (!satisfied) {
        if (i < 5) {
          msg.channel.send(invalidMsg);
        }
        continue;
      }
      if (cancelled) {
        break;
      }
      if (satisfied) {
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
