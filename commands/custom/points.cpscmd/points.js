const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

module.exports = {
  name: "points",
  async func(msg, { send, member, author, content, guild, args, gMember, reply, prefix, Discord, client }) {
    if(!guild||(guild.id!="257889450850254848"&&guild.id!="302983444009451541")) return;
    const used = member || author;
    await client.database.loadSBKGS();
    let dbUser = client.database.sinxUsers.get(used.id);

    let embed = new Discord.MessageEmbed;
    if(args[0]==null){
      if(dbUser!=null&&dbUser.pts!=0){
        const theMember = guild.members.get(dbUser.uid);
        embed.setTitle(theMember?theMember.user.tag:dbUser.unm);
        embed.setColor(theMember?theMember.displayColor:member.displayColor);
        embed.addField(`Ranked #${dbUser.rnk}`,`${dbUser.rnk_2}`);

        let nextUser2, nextUser, temp = [], ind = -1;

        Array.from(client.database.sinxUsers).forEach(e=>temp.push([e[1],+e[1].rnk]));
        temp.sort( (a,b) => a[1]-b[1]);
        console.log('tempsize'+temp.length);
        nextUser = temp[0][0];
        ind = temp.findIndex(a=> a[1]==+dbUser.rnk);
        console.log('ind'+ind);
        while(!0){
          if(ind<0){
            ind=0;
            break;
          }
          if(temp[ind][1]<+dbUser.rnk)break;
          --ind;
          console.log('newind' + ind);
        }
        nextUser2 = temp[ind][0];
        diffP = temp[ind][0].pts-+dbUser.pts;

        let str2 = `${
        +dbUser.rnk==1
          ?
            'You have the most points'
          :
            (((+nextUser.pts)-(+dbUser.pts))+' ')
            +(((+nextUser.pts)-(+dbUser.pts))=='1'?'point':'points')
            +' to go to catch up to ' + nextUser.unm +'(#1)'
            +'\n'+
            diffP+' '+(diffP==1?'point':'points')+
            ' to go to catch up to '+
            nextUser2.unm+'(#'+nextUser2.rnk+')'}`;

        embed.addField(`${dbUser.pts} ${dbUser.pts==1?'point':'points'}`,str2);
        return reply('', {embed});
      }else{
        let temp = [], firstPlace, lowest, diffP;
        Array.from(client.database.sinxUsers).forEach(e=>temp.push([e[1],(+e[1].pts)]));
        temp.sort( (a,b) => a[1]-b[1]);
        firstPlace = temp[0][0];
        lowest = temp[temp.length-1][0];
        diffP = lowest.pts;

        embed.setTitle(member.user.tag);
        embed.setColor(member.displayColor);
        embed.addField(`Ranked #${+firstPlace.rnk+1}`,`---`);

        let stats1 =`${Array.from(client.database.sinxUsers).every(e=>{
          if(e&&e[1]&&e[1].pts)
            return e.pts == '0';
          else return true;
        })
        ?'You have the most points somehow'
        :(firstPlace.pts+' ') +(firstPlace.pts>1?'points':'point')+' to go to catch up to ' + firstPlace.unm+'(#'+firstPlace.rnk+')'}
${diffP} points to go to catch up to ${lowest.unm} (#${lowest.rnk})`;

        embed.addField(`0 points`,
        stats1);
        return reply('Your points stats', {embed});
      }
    }else
    /*if(args[0]=="add"){
      if(!used.hasPermission("KICK_MEMBERS")){
        switch (used.id) {
          case Constants.users.WILLYZ:
          case Constants.users.PGSUPER:
          case Constants.users.ZALGO:
          case Constants.users.XZLQ:
          case Constants.users.KONEKO:
          case Constants.users.NELYN:
          case Constants.users.LOAF:
          case Constants.users.ARX:
            break;
          default:
            return reply('You must have ``KICK_MEMBERS`` perms to use this command!');
        }
      }

      if(args[2]==null)return reply(`Please specify the amount of points to add: \`\`-points add @/mention/ 123\`\``);
      let pts = parseInt(args[2]);
      if (pts.toString() != args[2]) return reply(`Please enter a valid number of points.`);

      let target, us;
      try{
        target = args[1].match(Constants.patterns.MENTION)[1];
      }catch(err){
        target=args[1];
      }

      if(target!=args[1]){
        try{
          const mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          database.sheets['members'].addRow({userid: mem.id, username: mem.user.username, points: pts, managerid: author.id, pointsrank: "", time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')});
          console.log(`New pts action for user: <@${mem.user.id}>, ${pts} points, approved by: <@${author.id}>`);
          if(database.sinxUsers.get(mem.id)==null){
            database.sinxUsers.set(mem.id, {userid: mem.id, username: mem.user.username, points: pts, managerid: author.id,  pointsrank: "", time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')});
            us = database.sinxUsers.get(mem.id);
          }else{
            us.points=parseInt(us.points,10)+pts;
          }
          if(us.points!=0)
            return reply(`[${mem.displayName}] now has: ${us.points} points`);
          else
            return reply(`[${mem.displayName}] now has no points`);
        }catch(err){
          console.log(err);
          //return reply(err);
          return reply(`Errored! Are you sure target user is in Sinbad Knights?`);
        }
      }else{
        return reply(`Errored.`);
      }
    }else
    if(args[0]=="set"){
      if(args[2]==null)return reply(`Please specify the amount of points to add: \`\`-points add @/mention/ 123\`\``);
      let pts = parseInt(args[2]);
      if (pts.toString() != args[2]) return reply(`Please enter a valid number of points.`);

      let target, us;
      try{
        target = args[1].match(Constants.patterns.MENTION)[1];
      }catch(err){
        target=args[1];
      }
      // console.log("Target: "+target);
      if(target!=args[1]){
        try{
          let mem = gMember(target);
          us = database.sinxUsers.get(mem.id);

          if(database.sinxUsers.get(mem.id)==null){
            database.sinxUsers.set(mem.id, {userid: mem.id, username: mem.user.username, points: pts, managerid: author.id, pointsrank: "", time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')});
            us = database.sinxUsers.get(mem.id);
          }else{
            database.sheets['members'].addRow({userid: mem.id, username: mem.user.username, points: -parseInt(us.points), pointsrank: "", managerid: author.id, time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')});
            us.points=pts;
          }
          database.sheets['members'].addRow({userid: mem.id, username: mem.user.username, points: pts, pointsrank: "", managerid: author.id, time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')});
          console.log(`New pts action for user: <@${mem.user.id}>, ${pts} points, approved by: <@${author.id}>`);

          if(us.points!=0)
            return reply(`[${mem.displayName}] now has: ${us.points} points`);
          else
            return reply(`[${mem.displayName}] now has no points`);
        }catch(err){
          return reply(`Are you sure target user is in Sinbad Knights?`);
        }
      }//  time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')
    }else*/{
      let target = content.substring((`${prefix}points `).length);
      //await send(`[Debug]Target: ${target}`);
      searchers[guild.id] = new Searcher( guild );
      let mem;
      try{
        let t = target.match(Constants.patterns.MENTION)[1];
        mem = gMember(t);
      }catch(err){
        let list = searchers[guild.id].searchMember(target);

        if(list.length>1) await send('Multiple matches found, using the first...');
        else if(list.length<1) return await send(`User [${target}] not found!`);
        mem = list[0];
      }
      // await send(`[Debug] memid: ${mem?mem.id:'none'}`);
      // console.log("Target: "+target);
      if(mem==null) return reply(`User [${target}] was not found in this server`);
      let dbUser = client.database.sinxUsers.get(mem.id);

      if(dbUser&&dbUser.pts!=0){
        const theMember = guild.members.get(dbUser.uid);
        embed.setTitle(theMember?theMember.user.tag:dbUser.unm);
        embed.setColor(theMember?theMember.displayColor:member.displayColor);
        embed.addField(`Ranked #${dbUser.rnk}`,`${dbUser.rnk_2}`);

        let nextUser, nextUser2, temp = [], ind = -1;

        Array.from(client.database.sinxUsers).forEach(e=>temp.push([e[1],+e[1].rnk]));
        temp.sort( (a,b) => a[1]-b[1]);
        console.log('tempsize'+temp.length);
        nextUser = temp[0][0];
        ind = temp.findIndex(a=> a[1]==+dbUser.rnk);
        console.log('ind'+ind);
        while(!0){
          if(ind<0){
            ind=0;
            break;
          }
          if(temp[ind][1]<+dbUser.rnk)break;
          --ind;
          console.log('newind' + ind);
        }
        nextUser2 = temp[ind][0];
        diffP = temp[ind][0].pts-+dbUser.pts;

        let str2 = `${
        +dbUser.rnk==1
          ?
            (used.id==dbUser.uid?'You have':'has') +' the most points'
          :
            (((+nextUser.pts)-(+dbUser.pts))+' ')
            +(((+nextUser.pts)-(+dbUser.pts))=='1'?'point':'points')
            +' to go to catch up to ' + nextUser.unm +'(#1)'
            +'\n'+
            diffP+' '+(diffP==1?'point':'points')+
            ' to go to catch up to '+
            nextUser2.unm+'(#'+nextUser2.rnk+')'}`;

        embed.addField(`${dbUser.pts} ${dbUser.pts==1?'point':'points'}`,str2);
        return reply(`Stats for ${target}`, {embed});
      }else{
        const arr = Array.from(client.database.sinxUsers);
        let lowest;
        arr.forEach(e=>{
          if(e&&e[1]&&e[1].rnk){
            if(lowest==null) lowest = e[1];
            else if(lowest.rnk&&(+e[1].rnk)>=(+lowest.rnk)) lowest = e[1];
          }
        });
        embed.setTitle(mem.user.tag);
        embed.setColor(mem.displayColor);
        embed.addField(`Ranked #${+lowest.rnk+1}`,`---`);
        let nextUser;// = Array.from(client.database.sinxUsers).find(e=>e[1].rnk==lowest.rnk-1);

        Array.from(client.database.sinxUsers).forEach(e=>{
          if(!nextUser) nextUser = e[1];
          else if(e[1].pts>0&&e[1].rnk>=nextUser.rnk-1)nextUser = e[1];
        });
        embed.addField(`0 points`,`${arr.every(e=>{
          if(e&&e[1]&&e[1].pts)
            return e.pts == '0';
          else return true;
        })?'You have the most points somehow':lowest.pts+' '+(lowest.pts=='1'?'point':'points') +' to go to catch up to ' + nextUser.unm}`);
        return reply(`Stats for ${target}`, {embed});
      }
    }
  }
};
