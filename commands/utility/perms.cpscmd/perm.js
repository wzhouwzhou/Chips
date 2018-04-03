module.exports = {
  name: 'perm',
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord, reply, bot }) {
    // If(!guild||(guild.id!="257889450850254848"&&guild.id!="302983444009451541")) return;
    const used = member || author;
    if (true) return;
    if (args[0] == null) {
      return reply('Please specify an action');
    } else if (args[0] == 'add') {
      permissions.checkPermission(msg, 'global.server.permissions').then(info => {

      }).catch(err => {

      });

      if (args[2] == null) return reply(`Please specify the amount of points to add: \`\`-points add @/mention/ 123\`\``);
      let pts = parseInt(args[2]);
      if (pts.toString() != args[2]) return reply(`Please enter a valid number of points.`);

      let target, us;
      try {
        target = args[1].match(Constants.patterns.MENTION)[1];
      } catch (err) {
        target = args[1];
      }

      if (target != args[1]) {
        try {
          const mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          database.sheets.members.addRow({ userid: mem.id, username: mem.user.username, points: pts, managerid: author.id, pointsrank: '', time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS') });
          console.log(`New pts action for user: <@${mem.user.id}>, ${pts} points, approved by: <@${author.id}>`);
          if (database.sinxUsers.get(mem.id) == null) {
            database.sinxUsers.set(mem.id, { userid: mem.id, username: mem.user.username, points: pts, managerid: author.id, pointsrank: '', time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS') });
            us = database.sinxUsers.get(mem.id);
          } else {
            us.points = parseInt(us.points, 10) + pts;
          }
          if (us.points != 0) return reply(`[${mem.displayName}] now has: ${us.points} points`);
          else return reply(`[${mem.displayName}] now has no points`);
        } catch (err) {
          console.log(err);
          // Return reply(err);
          return reply(`Errored! Are you sure target user is in Sinbad Knights?`);
        }
      } else {
        return reply(`Errored.`);
      }
    } else if (args[0] == 'set') {
      if (args[2] == null) return reply(`Please specify the amount of points to add: \`\`-points add @/mention/ 123\`\``);
      let pts = parseInt(args[2]);
      if (pts.toString() != args[2]) return reply(`Please enter a valid number of points.`);

      let target, us;
      try {
        target = args[1].match(Constants.patterns.MENTION)[1];
      } catch (err) {
        target = args[1];
      }
      // Console.log("Target: "+target);
      if (target != args[1]) {
        try {
          let mem = gMember(target);
          us = database.sinxUsers.get(mem.id);

          if (database.sinxUsers.get(mem.id) == null) {
            database.sinxUsers.set(mem.id, { userid: mem.id, username: mem.user.username, points: pts, managerid: author.id, pointsrank: '', time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS') });
            us = database.sinxUsers.get(mem.id);
          } else {
            database.sheets.members.addRow({ userid: mem.id, username: mem.user.username, points: -parseInt(us.points), pointsrank: '', managerid: author.id, time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS') });
            us.points = pts;
          }
          database.sheets.members.addRow({ userid: mem.id, username: mem.user.username, points: pts, pointsrank: '', managerid: author.id, time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS') });
          console.log(`New pts action for user: <@${mem.user.id}>, ${pts} points, approved by: <@${author.id}>`);

          if (us.points != 0) return reply(`[${mem.displayName}] now has: ${us.points} points`);
          else return reply(`[${mem.displayName}] now has no points`);
        } catch (err) {
          return reply(`Are you sure target user is in Sinbad Knights?`);
        }
      }//  Time: moment().format('ddd, Do of MMM @ HH:mm:ss.SSS')
    } else {
      let target, us;
      try {
        target = args[0].match(Constants.patterns.MENTION)[1];
      } catch (err) {
        target = args[0];
      }
      // Console.log("Target: "+target);
      if (target != args[0]) {
        try {
          let mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          if (us == null) return reply(`[${mem.displayName}] has no points`);
          if (us.points != 0) return reply(`[${mem.displayName}] has: ${us.points} points`);
          else return reply(`[${mem.displayName}] has no points`);
        } catch (err) {
          return reply(`Target user is not in Sinbad Knights!`);
        }
      } else {
        // Find by nickname
        target = content.substring(content.indexOf(target));
        let mem = guild.members.find('displayName', target);
        if (mem != null) {
          us = database.sinxUsers.get(mem.id);
          if (us == null) return reply(`[${mem.displayName}] has no points`);
          if (us.points != 0) return reply(`[${mem.displayName}] has: ${us.points} points`);
          else return reply(`[${mem.displayName}] has no points`);
        } else {
          let mem = guild.members.find('username', target);
          if (mem != null) {
            us = database.sinxUsers.get(mem.id);
            if (us == null) return reply(`[${mem.displayName}/${mem.username}] has no points`);
            if (us.points != 0) return reply(`[${mem.displayName}/${mem.username}] has: ${us.points} points`);
            else return reply(`[${mem.displayName}/${mem.username}] has no points`);
          }
          return reply(`Target user ${target} not found in this server!`);
        }
      }
    }
  },
};
