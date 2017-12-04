/* eslint complexity: "off" */
const _ = require('lodash');
const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

const handleSend = data => {
  const { dbUser, embed, send, member, guild, client } = data;
  // User is not ranked:
  if (!dbUser || !dbUser.pts === 0) {
    const lastPlace = Array.from(client.database.sinxUsers.values())
      .filter(e => !!+e.rnk && +e.pts > 0)
      .reverse()[0];
    const lastPlacePts = lastPlace.pts;
    const lastPlaceName = lastPlace.unm;
    const lastPlaceRnk = +lastPlace.rnk;
    embed.setTitle(member.user.tag).setColor(member.displayColor);
    embed.addField(`Ranked ${lastPlaceRnk + 1}`, lastPlaceRnk.rnk_2 || '---');
    embed.addField(`0 points!`,
      `${lastPlacePts} points to catch up to ${lastPlaceName} (ranked ${lastPlaceRnk})!`);
    return send(embed);
  }

  const theMember = guild.members.get(dbUser.uid);
  embed.setTitle(theMember ? theMember.user.tag : dbUser.unm);
  embed.setColor(theMember ? theMember.displayColor : member.displayColor);

  // User is ranked first:
  if (+dbUser.rnk === 1) {
    embed.addField(`Ranked #1`, dbUser.rnk_2);
    embed.addField(`${dbUser.pts} points!`, 'Already the most points!');
    return send(embed);
  }

  embed.addField(`Ranked #${dbUser.rnk}`, `${dbUser.rnk_2}`);

  const firstPlace = Array.from(client.database.sinxUsers.values())[0];

  const nextUser = Array.from(client.database.sinxUsers.values())
    .filter(e => !!+e.rnk && +e.pts > +dbUser.pts)
    .sort((a, b) => +a.pts - +b.pts)[0];
  let str = '';

  const looper = [firstPlace, nextUser];
  looper.length = Math.min(looper.length, +dbUser.rnk - 1);
  for (const other of looper) {
    const name = other.unm;
    const pointsUntil = +other.pts - +dbUser.pts;
    const rank = other.rnk;
    str += `${pointsUntil} ${
      pointsUntil === 1 ? 'point' : 'points'
    } to go to catch up to ${_.escapeRegExp(name).replace(/([_`])/g, '\\$1')}(${rank})\n`;
  }

  embed.addField(`${dbUser.pts} ${+dbUser.pts === 1 ? 'point' : 'points'}`, str);
  return send(embed);
};

exports.name = 'points';

exports.func = async(msg, ctx) => {
  const { Constants, send, member, author, content, guild, args, gMember, reply, prefix, Discord, client } = ctx;

  if (!guild || (guild.id !== '257889450850254848' && guild.id !== '302983444009451541')) return true;
  const used = member || author;
  await client.database.loadSBKGS();
  let dbUser = client.database.sinxUsers.get(used.id);

  let embed = new Discord.MessageEmbed;
  if (args[0]) {
    let target = content.substring(`${prefix}points `.length);
    // Await send(`[Debug]Target: ${target}`);
    const searcher = new Searcher(guild);
    let mem;
    try {
      let t = target.match(Constants.patterns.MENTION)[1];
      mem = gMember(t);
    } catch (err) {
      let list = searcher.searchMember(target);

      if (list.length > 1) await send('Multiple matches found, using the first...');
      else if (list.length < 1) return send(`User [${target}] not found!`);
      mem = list[0];
    }
    // Await send(`[Debug] memid: ${mem?mem.id:'none'}`);
    // console.log("Target: "+target);
    if (!mem) return reply(`User [${target}] was not found in this server`);
    dbUser = client.database.sinxUsers.get(mem.id);
  }

  return handleSend(Object.assign({}, ctx, { dbUser, embed }));
};

/* If(args[0]=="add"){
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
}else
*/
