
module.exports = function() {
  client.on("messageReactionAdd", (react, user) => {
    if(user.id == client.user.id || react.message.author.id != client.user.id) return;

    console.log("Reaction detected");
    if (react.message.channel.type != 'dm') {
      console.console.log("Not in DM");
      return;
    }

    console.log("DM channel emoji: " + react.emoji);
    react.message.channel.sendMessage(`The emoji used is ${react.emoji}`);

    console.log("userid: " + user.id);
    console.log(`The emoji used is ${react.emoji}`);
    if(react.emoji.toString()=="1⃣"){react.message.channel.sendMessage("Hi: one (nothing to see here yet)");}
    else if(react.emoji.toString()=="2⃣"){react.message.channel.sendMessage("Hi: two");}
    else if(react.emoji.toString()==":three:"){react.message.channel.sendMessage("Hi: three");}
    react.message.delete();
  });
};

async function reactOptions(message) {
  let stepNum = submStep[`${message.author.id}`];
  let text = steps[stepNum][0];
  let numChoices = steps[stepNum][1];
  await message.channel.send("You are on step " + stepNum);
  const msg = await message.channel.send(text);
  if (isNaN(numChoices)) throw new TypeError("Number of choices must be a number.");
  if (numChoices > 9) numChoices = 9;
  await msg.react("⬅");
  let index=1;
  do
    await msg.react(Constants.CHOICES[index]);
  while(++index<numChoices+1);
  await msg.react("❌");
}

async function isntMe(react){
  return react.me;
}
