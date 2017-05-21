const algebra = require('../handlers/algebra-0.2.6.min');
const EXPIRE = 10000;
module.exports = {
  name: "-calc",
  perm: ["global.calc"],
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {

    if((content.match(/=/g)||[]).length > 1) return reply("Invalid equation entered");
    let query;
    try{
      query = new algebra.parse(args.join(' '));
    }catch(err){
      query = "";
    }
    if(query=="") return reply("Please enter a valid equation ~~or expression~~(coming soon)!");

    if((content.match(/=/g)||[]).length == 1){ //we got an equation
      let emb = new Discord.RichEmbed();
      emb.setAuthor(`New Equation Calculation`).setColor(member.displayColor);
      emb.setDescription(query.toString());
      emb.setTimestamp(new Date());

      let prompt = `What variable are we solving for?\nThis expires in 10 seconds`;
      await send(prompt, {embed: emb});
      let confirmed = false;
      let collector = channel.createMessageCollector(
        m=> {
          if(m.author.id==author.id){
            m.reply("Choice accepted. Now processing...");
            confirmed = true;
            setTimeout(_=>collector.stop(), 1000);
            return true;
          }//else return false;
        },
        { time: EXPIRE }
      );

      collector.on('collect', m=>{});
      collector.on('end', collected =>{
        let m = collected.first();
        if(!confirmed) return reply ('Calc timed out');
        else{
          let variable = collected.first();
          console.log("Solving for variable " + variable.content);
          if(m.author.id!=author.id) return; //safety
          let ans;
          try{
            ans = query.solveFor(variable.content);
          }catch(err){
            //ans = "I am not able to do this calculation!";//console.log(err);
          }
          ans = (!ans)?"I am not able to do this calculation!":ans;
          console.log("Result: " + ans.toString());
          emb = new Discord.RichEmbed();
          emb.setAuthor(`New Equation Calculation`).setColor(member.displayColor);
          emb.addField(query.toString(), ans?`${variable.content} = ${ans.toString()}`:"/Calculation could not be completed");
          emb.setTimestamp(new Date());
          return reply("Result:", {embed: emb});
        }
      });
    }
  }
};
