const algebra = require('../../../handlers/algebra-0.2.6.min');
const EXPIRE = 10000;
module.exports = {
  name: "-calc",
  async func(msg, { member, author, content, channel, args, Discord, reply}) {
    if((content.match(/=/g)||[]).length > 1) return reply("Invalid equation entered");
    let query;
    let start = process.hrtime();
    try{
      query = new algebra.parse(args.join(' '));
    }catch(err){
      query = "";
      //if(query=="") return reply("Please enter a valid equation or expression!");
    }
    let hrTime = process.hrtime(start);
    let µs = false;
    end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
    if(end<1){
      µs = true;
      end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
    }
    µs ? end += 'µs' : end += 'ms';

    if((content.match(/=/g)||[]).length == 0) {
      if(query=="") return reply("Please enter a valid equation or expression!");
      emb = new Discord.RichEmbed().setTimestamp(new Date());
      emb.setAuthor(`New Expression Calculation`).setColor(member.displayColor);
      emb.addField("Result: ", query?`${query.toString()+'\n'+'≈'+eval(query.toString())}`:`Calculation could not be completed`);
      emb.setTimestamp(new Date());
      emb.setFooter(`--Expression Calculation Attempt took ${(end)}.--`);
      return reply("Results:", {embed: emb});
    }else if((content.match(/=/g)||[]).length == 1){ //we got an equation
      let ans;
      let emb = new Discord.RichEmbed();
      emb.setAuthor(`New Equation Calculation`).setColor(member.displayColor);
      emb.setTimestamp(new Date());

      if((content.match(/,\s*/g)||[]).length == 1){
        let truecontent = args.join(' ');
        console.log("True content: " + truecontent);
        query=new algebra.parse(truecontent.substring(0,truecontent.indexOf(',')));
        console.log("Query: " + query);
        try{
          ans = query.solveFor(truecontent.substring(truecontent.indexOf(',')+1).replace(/\s+/,''));
        }catch(err){
          //ans = "I am not able to do this calculation!";//console.log(err);
        }
        let hrTime = process.hrtime(start);
        let µs = false;
        end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
        if(end<1){
          µs = true;
          end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
        }
        µs ? end += 'µs' : end += 'ms';

        ans = (!ans)?"I am not able to do this calculation!":ans.toString()+'\n≈'+eval(ans.toString());
        console.log("Result: " + ans.toString());
        emb.addField(query.toString(),"=" + ans);
        emb.setFooter(`--Expression Calculation Attempt took ${(end)}.--`);
        return reply("Result:", {embed: emb});
      }
      if(query=="") return reply("Please enter a valid equation or expression!");
      emb.setDescription(query.toString());
      //if a variable is not specified prompt from the user.
      let prompt = `What variable are we solving for?\nThis expires in 10 seconds`;
      await reply(prompt, {embed: emb});
      let confirmed = false;
      let sentmsg;
      let collector = channel.createMessageCollector(
        m=> {
          if(m.author.id==author.id){
            m.reply("Choice accepted. Now processing...").then(m=>{sentmsg=m;});
            confirmed = true;
            setTimeout(_=>{collector.stop(); sentmsg.delete();}, 1000);
            return true;
          }//else return false;
        },
        { time: EXPIRE }
      );

      collector.on('collect', _=>_);
      collector.on('end', collected =>{
        let m = collected.first();
        if(!confirmed) return reply ('Calc timed out');
        else{
          let variable = collected.first();
          console.log("Solving for variable " + variable.content);
          if(m.author.id!=author.id) return; //safety
          let ans;
          let start = process.hrtime();
          try{
            ans = query.solveFor(variable.content);
          }catch(err){
            //ans = "I am not able to do this calculation!";//console.log(err);
          }
          let hrTime = process.hrtime(start);
          let µs = false;
          let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
          if(end<1){
            µs = true;
            end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
          }
          µs ? end += 'µs' : end += 'ms';
          ans = (!ans)?"I am not able to do this calculation!":ans;
          console.log("Result: " + ans.toString());
          emb = new Discord.RichEmbed();
          emb.setAuthor(`New Equation Calculation`).setColor(member.displayColor);
          emb.addField(query.toString(), ans?`${variable.content} = ${ans.toString()}`:"/Calculation could not be completed");
          emb.setFooter(`--Equation Calculation Attempt took ${(end)}.--`);
          emb.setTimestamp(new Date());
          return reply("Result:", {embed: emb});
        }
      });
    }
  }
};
