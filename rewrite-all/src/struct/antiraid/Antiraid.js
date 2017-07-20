const Jimp = require('jimp');

const ARStore = new Map();

const LOW = 1, MEDIUM = 2, HIGH = 3, INSANE = 4;
const PASS = 11, FAIL = 12;

const AR = class ChipsAntiraid {
  /**
   * Construct a default antiraid for a guild
   */
  constructor( guildid, client ) {
    this.id = guildid;
    this.guild = client.guilds.get(guildid);
    this.enabled = false;
    if ( this.guild ) {
      this.blacklistedAvatars = [
        '179efa3239c9cafdd4bdf70f7190fd6a',
        'd099bd2863449670ab2a902c7c6e47de',
        '4a53b8a2e3e58ab3e81fd2b4da20cc02',
      ];
      this.blacklistAvatars = false;
      this.maxMemberMention = 0;
      this.maxRoleMention = 0;
      this.security = MEDIUM;
    }
    ARStore.set( this.id , this );
  }

  setSecurity ( newS ) {
    this.security = newS;
  }

  updateAvatarBlacklist ( opts ) {
    if(typeof opts === 'object'){
      if(!opts.avatar) return false;

      if(opts.action == null) this.blacklistedAvatars.add(opts.avatar);

      if(opts.action === 'remove')
        this.blacklistedAvatars.delete(opts.avatar);

    }else if(typeof opts === 'string')
      this.blacklistedAvatars.add(opts);
    else return false;

    return true;
  }

  setUC ( unverifiedChannelID ) {
    this.ucID = unverifiedChannelID;
    this.uc = this.guild.channels.get (this.ucID);
    if(!this.uc) return false;
    return true;
  }

  setUR ( unverifiedRoleID ) {
    this.urID = unverifiedRoleID;
    this.ur = this.guild.roles.get (this.urID);
    if(!this.ur) return false;
    return true;
  }

  setMaxMentions ( options ) {
    if ( !options ) return false;
    if ( options.member){
      if( typeof options.member !== 'number' || options.member|0 !== options.member ) return false;
      this.maxMemberMention = options.member;
    }
    if ( options.role ){
      if( typeof options.role !== 'number' || options.role|0 !== options.role ) return false;
      this.maxRoleMention = options.role;
    }
    if ( options.all ){
      if( typeof options.all !== 'number' || options.all|0 !== options.all ) return false;
      this.maxAllMention = options.all;
    }
    return true;
  }

  setAntiraidWelcome ( newmsg ) {
    if (!newmsg) return false;
    this.wcmsg = newmsg;
  }

  toggle ( override ) {
    if(!override) this.enabled = !this.enabled;
    else if ( typeof override !== 'boolean' ) return false;
    this.enabled = override;
    return true;
  }

  handleJoin ( newM ) {
    return new Promise ( async res => {
      try{
        if(!this.enabled) res(true);

        if (this.handleDefaultMemberAction (newM) == FAIL)
          handleFailJoinB (newM);

        if (this.security >= HIGH){

          if(this.security >= INSANE || this.panic)
            if(this.handleUsername (newM) == FAIL || this.handleAvatar (newM) == FAIL)
              return res (handleFailJoinA (newM) == PASS);

          if (await this.handleCaptcha (newM) == FAIL)
            return res (handleFailJoinB (newM) == PASS);
        }

        if ( this.handleWelcome (newM) == PASS )
          return res(true);
        return res(false);
      }catch(err){
        return res(false);
      }
    });
  }

  handleUsername ( mem ) {
    if(!this.enabled) return PASS;
    if(!this.usernameThresh || this.usernameThresh == 0) return PASS;

    const name = mem.user.username;
    let matched = name.length>=this.usernameThresh?name.match(new RegExp(`[a-z]{${this.usernameThresh},}`,'gi')):name.match(/[a-z]+/i);
    if(matched&&matched[0]?matched[0].length>=THRESHOLD:false)
      return PASS;
    return FAIL;
  }

  handleDefaultMemberAction ( mem ) {
    if(!this.enabled) return PASS;
    if(!this.ur) return PASS;
    mem.addRole(ur);
    return PASS;
  }

  handleAvatar ( mem ) {
    if(!this.enabled) return true;
    if(!this.blacklistAvatars) return true;
    let hash = mem.avatar;
    if(~this.blacklistedAvatars.indexOf(hash))
      return this.AvatarAction ( m );
    return true;
  }

  handleWelcome ( mem ) {
    if(!this.enabled) return true;

    return true;
  }

  handleCaptcha ( mem ) {
    // Random character captchaText


    // Math captcha


  }

  handleFailJoinA ( mem ) {

  }

  handleFailJoinB ( mem ) {

  }

  handleMsg ( m ) {
    if(!this.enabled) return true;
    if(this.uc && m.channel.id === this.ucID)
      this.handleWelcomeMsg();
    this.handleMentions ( m );
  }

  handleMentions ( m ) {
    let channel = m.channel;
    let perms = channel.permissionsFor(m.member);
    let canEveryone = false;
    if(perms)
      canEveryone = perms.serialize()['MENTION_EVERYONE'];

    let allmentionid = [];

    m.mentions.roles.forEach(role=>{
      role.members.forEach(mem=>{
        allmentionid.push(mem.id);
      });
    });

    m.mentions.members.forEach(mem=>{
      allmentionid.push(mem.id);
    });

    let uniqueUserCount = (removeDupls(allmentionid)||[]).length;

    if(canEveryone && m.content.match(/@(everyone|here)/g))
      uniqueUserCount = m.channel.members.size;

    if(
      this.maxRoleMention   && (m.mentions.roles  ||new Map()).size > this.maxRoleMention   ||
      this.maxMemberMention && (m.mentions.members||new Map()).size > this.maxMemberMention ||
      this.maxAllMention    && uniqueUserCount                      > this.maxAllMention
    )
      return this.mentionAction ( m );
    return true;
  }

  static serialize ( ARObj ) {
    const serialized = {};
    serialized.id = ARObj.id;
    serialized.enabld = ARObj.enabled;
    serialized.ucID = ARObj.ucID;
    serialized.ucName = ARObj.uc?ARObj.uc.name:null;
    serialized.urID = ARObj.urID;
    serialized.urName = ARObj.ur?ARObj.ur.name:null;

    serialized.usernameThresh = this.usernameThresh||0;

  }

  static handleMember ( newM ) {
    if(!ARStore.has(newM.guild.id)) return true;

    let theObj = ARStore.get(newM.guild.id);
    if(!theObj.enabled) return true;

    return theObj.handlejoin ( newM );
  }
};

module.exports = AR;
