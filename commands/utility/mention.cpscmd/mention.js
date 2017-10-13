
const _ = require('lodash');
const chunk = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({_});
const grammarJoin = require('../../../rewrite-all/src/deps/functions/grammarJoinF').default({_});
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');
exports.name = 'mention';
const inmention = new Map;
const whitelist = [];
const STARTCONFIRM = '{prefix}select';
const CANCEL = 'cancel/stop';

exports.func = async (msg, {guild, member, send, author, channel, suffix, Discord, prefix}) => {
  if(!suffix || suffix === '') return send('You must give me a role to mention!');
  if(!guild) return send('You must use this command in a server.');

  if(!member.hasPermission('BAN_MEMBERS')&&!member.hasPermission('MANAGE_ROLES'))
    if(!~whitelist.indexOf(member.id))
      return send('You do not have permission to use this command!');
  if(inmention.get(author.id)) return send(`Type ${CANCEL} to leave the mention menu`);
  inmention.set(author.id, true);
  const preRList = suffix.split(/,/g).map(e=>e.trim());
  let exact = new Set;
  let fuzzy = new Set;
  preRList.forEach(preRole => {
    const rid = (preRole.match(/<?@?&?(\d+)>?/)||[null,null])[1];
    if(rid===null||rid==='') {
      for(const [,role] of guild.roles)
        if(new RegExp(`^${_.escapeRegExp(preRole)}$`,'i').test(role.name)){
          exact.add(role.id);
          //console.debug.mention(role.id);
        }
    }else {
      for(const [id, role] of guild.roles)
        if(rid === id)
          exact.add(role.id);
    }
  });
  preRList.forEach(preRole => {
    const rid = (preRole.match(/<?@?&?(\d+)>?/)||[null,null])[1];
    if(rid===null||rid==='') {
      for(const [, role] of guild.roles)
        if(new RegExp(_.escapeRegExp(preRole),'i').test(role.name)){
          fuzzy.add(role.id);
          //console.debug.mention(role.id);
        }
    }else {
      for(const [id,role] of guild.roles)
      if(new RegExp(rid).test(id))
        fuzzy.add(role.id);
    }
  });
  let roles = Array.from(new Set([...Array.from(exact).map(rrid=>guild.roles.get(rrid)).sort((a,b)=>b.position - a.position), ...Array.from(fuzzy).map(rrid=>guild.roles.get(rrid)).sort((a,b)=>b.position - a.position)]));
  //console.debug('Roles ' + roles);
  if(roles.length === 0) {
    inmention.set(author.id, false);
    return send('No roles found, make sure you are separating your roles with commas if mentioning multiple');
  }
  let totalroles = _.clone(roles);
  //console.debug('totalroles: '+totalroles);
  let totalroleids = totalroles.map(e=>e.id);
  roles = chunk(roles, {chunksize: 10});

  const p = new Paginator ( msg,  {
    type:'paged',
    embedding: true,
    fielding: false,
    title: 'Role Chooser',
    text: `Type __${_.escapeRegExp(prefix)}select__ followed by the number(s) next to the roles you want to mention, separated by commas, or __${CANCEL}__ to cancel`,
    pages:
    [
      ...roles.map((r,p)=>[`Roles (p${p+1})`, r.map(e => `**${totalroleids.indexOf(e.id)+1}.** ${e.name}`).join('\n')])
    ],
    }, Discord
  );
  try{
    await p.sendFirst();
  }catch(err){
    console.error(err);
    inmention.set(author.id, false);
    return send ('Something went wrong...');
  }

  let tocancel = true, matcher;
  const startFilter = (m) => {
    if(m.author.id !== author.id) return false;
    const prematch = m.content.match(/((?:,?\d+,?)+)/g);
    if(new RegExp(`${CANCEL.split(/\//).map(e=>_.escapeRegExp(e)).join('|')}`,'i').test(m.content)){
      //console.debug.mention('Cancelled');
      inmention.set(author.id, false);
      return true;
    }else if (new RegExp(`^${STARTCONFIRM.replace(/{prefix}/g,prefix)}`,'i').test(m.content)&&prematch){
      matcher = prematch.join('').split(/,/g).filter(e=>e&&e.length>0);
      //console.debug.mention('matcher: '+matcher);
      //console.debug.mention('matcher instance: '+ matcher.constructor.name);
      tocancel = false;
      return true;
    }

    return false;
  };
  let startCol;
  try{
    startCol = await channel.awaitMessages(startFilter, { max: 1, time: 200000, errors: ['time'] });
  }catch(startCCollected){
    p.collector.stop();
    inmention.set(author.id, false);
    return send('Timed out').then(m=>m.delete({timeout: 3000}));
  }
  startCol.first().delete();
  p.collector.stop();
  if(tocancel){
    inmention.set(author.id, false);
    return send('Cancelled').then(m=>m.delete({timeout: 3000}));
  }
  //console.debug.mention(`matcher prematch ${matcher}`);
  matcher = matcher.map(e=>+e).filter(e=>!isNaN(e));
  //console.debug.mention(`matcher postfilter ${matcher}`);
  //console.debug.mention('postf matcher: '+matcher);
  //console.debug.mention('postf matcher instance: '+ matcher.constructor.name);

  if(matcher.every(e=>!totalroleids[e-1])) {
    inmention.set(author.id, false);
    //console.debug.mention('Every: '+matcher.every(e=>!totalroleids[e-1]));
    return send('You specified no valid roles to mention');
  }

  let mentStr = `${author} just mentioned `;
  let rtoment = [], mModified = [];
  for(const i of matcher) {
    let wasment = totalroles[i-1].mentionable;
    if(!wasment){
      const theR = guild.roles.get(totalroleids[i-1]);
      try{
        mModified.push(await theR.setMentionable(true, `${prefix}mention executed by ${author.tag}`));
      }catch(err){
        //;
      }
    }
    rtoment.push(totalroles[i-1]+[]);
    //console.debug.mention('Added role '+totalroles[i-1]);
  }
  await send(mentStr+grammarJoin(rtoment,'and'));
  mModified.forEach(r=>r.setMentionable(false, `Restoring previous settings after ${author.tag}'s mentioning`));
  inmention.set(author.id, false);
};
