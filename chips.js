global.Constants = require("./Constants");
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('./lib').Strategy;
const fs = require('fs');
const request = require('request');
const app = express();
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const moment = require('moment');

//route loading
const index = require("./routes/index");
const login = require("./routes/login");
const useroverview = require("./routes/useroverview");

app.engine(Constants.express.ENGINE, require("express-ejs-extend"));
app.set('view engine', Constants.express.ENGINE);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var scopes = ['identify', 'guilds'];

passport.use(new Strategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: 'https://chipsbot.herokuapp.com/user/',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/user',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) {
      //if (req.query.hasOwnProperty('guild_id'))
        res.redirect('/useroverview');
    } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// routes
app.use('/', index);
app.use('/login',login);
app.use('/useroverview',useroverview);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { type: err.status || 500 });
  if (!err.status || err.status == 500) console.error("Internal error: " + err);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function selfping() {
  request("https://chipsbot.herokuapp.com/", _=>_);
}
setInterval(selfping, 1000*60*10);

const Discord = require("discord.js");

const client = new Discord.Client();
global._ = require("lodash");
global.chalk = require("chalk");
global.Messager = new (require("events"));
global.Command = require("./Command");
global.CommandHandler = require("./CommandHandler")(Discord, client);
const readline = require('readline');

Messager.on("eval", ({ evalContent, vars, timestamp }) => {
  const { msg, message, channel, guild, send, reply, content, noprefix, prefix, c, author, member } = vars;
  console.log("Messager received some eval of " + evalContent);
  try {
    console.log("Messager part: dideval" + timestamp);
    Messager.emit("dideval" + timestamp, {
      result: eval(evalContent),
      err: false
    });
  } catch(err) {
    console.log("Error at eval Messager: " + err);
    Messager.emit("dideval" + timestamp, {
      result: err,
      err: true
    });
  }
});

client.commands = {};
fs.readdirSync("./commands").map(f => {
  if (/\.js/.test(f)) {
    const precmd = require(`./commands/${f}`);
    client.commands[precmd.name] = new Command(precmd);
  }
});

const prefix = "-";
let testC, dmC;

client.on("ready", _ => {
  if (client.channels.get(Constants.channels.TEST) == null || client.channels.get(Constants.channels.DMS) == null) console.error("ERRR");
  else {
    testC = client.channels.get(Constants.channels.TEST);
    dmC = client.channels.get(Constants.channels.DMS);
  }
  console.log('Chips is ready!');
  client.user.setStatus("online");
  client.user.setGame("Do -help");
});

const stdin = process.openStdin();
client.on("debug", console.log);
let d = "";

let monitorMode = false;

let consoleTyping = false;
stdin.addListener('data', d => {
    if (testC == null) {
      console.log("YOU HAVEN'T DEFINED AN OUTPUT CHANNEL");
      return;
    }
    if (consoleTyping == false) {
      //d + = d.toString();
      consoleTyping = true;

      rl.question("\x1b[1mInput? \x1b[0m", txt => {
        console.log("\x1b[0m", "\tConsole input:", txt);
        if (txt == "") {
          consoleTyping = false;
        } else {
          evalConsoleCommand(txt);
          //rl.close();
          consoleTyping = false;
        }
      });
    }

  /*if (d.toString() == "botoff") {
    //console.log(content);
    //client.channels.get("296420294678020107").sendMessage(content);
    send(content.substring(1), testC);
    content = "";
    console.log("\n");
  }
  content + = d.toString();*/
});

const pastes = {
  "/shrug": "¯\\_(ツ)_/¯",
  "/tableflip": "(╯°□°）╯︵ ┻━┻",
  "/unflip": "┬─┬﻿ ノ( ゜-゜ノ)",
  ":Thoughts:": "<:Thoughts:278104583501381632>",
  ":Thonkang:": "<:Thonkang:279512732892659713>",
  ":chips:": "<:chips:298308614022627329>",
  ":PagChomp:": "<:PagChomp:280631029960802305>"
};

global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const send = (message, c) => {
  c.sendMessage(message);
};

const evalConsoleCommand = txt => {
  txt = detectPastes(txt);
  if (txt == "monitor") {
    monitorMode = true;
    console.log("\tActivating Monitor Mode");
  } else if (txt == "unmon") {
    monitorMode = false;
    console.log("\tDeactivating Monitor Mode");
  } else {
    send(txt, testC);
  }
};

const detectPastes = txt => {
  const pairPastes = _.toPairs(pastes);
  for (const i in pairPastes) {
    if (txt == pairPastes[i][0]) {
      console.log("paste " + i + " found!");
      return pairPastes[i][1];
    }
  }
  return txt;
};
let msgSent=0;

async function dmHandle (message) {
  if(dmC==null)return;
  if(message.author.id==client.user.id) return;
  //{{{
    msgSent++;
    let mEmbeds=[];

    let main = new Discord.RichEmbed()
      .setAuthor("**DM Received!**: " + message.author.username+"#"+message.author.discriminator+"\tID: "+message.author.id)
      .setColor(205)
      .addField("message id:", `(${message.id})`,true)
      .setThumbnail(message.author.displayAvatarURL)
      .setTitle(moment(message.timestamp).format('ddd, Do of MMM @ HH:mm:ss'));

    if(message.cleanContent=="")
      main.addField(message.author.username, "[ERR]--No Content in Message--");
    else
      main.addField(message.author.username, message.cleanContent);

    if(message.attachments.first()!=null)
      main.addField("Attachment URL: ", message.attachments.first().url);

    mEmbeds.push(main);

    let msgembeds=message.embeds;
    msgembeds.forEach(function (item){
      mEmbeds.push(item);
    });

    for(var i=0;i<mEmbeds.length;i++)
      dmC.sendEmbed(mEmbeds.shift());

  //}}}
  if(message.content.startsWith(prefix+"helppt")){
    message.react('one').then(() => message.react('two')).then(() => message.react('three')).then(() => message.react('four'));
  }
}

client.on("message", message => {
  if (!message.guild){
    dmHandle(message);
  } //return;
  /*if (message.guild.id === "252525368865456130") {
    try {
      let me = message.guild.members.get("259209114268336129");
      //if (me.roles.get("252531631468969984") != null)
      //me.removeRole("252531631468969984");
      if (me.roles.has("252534386300289024")) {
        me.removeRole("252534386300289024");
        console.log("Unmuted");
      }
      if (me.nickname != 'Chips is bae') me.setNickname('Chips is bae');
      me = message.guild.members.get("296855425255473154");
      if (me.nickname != 'Chips (-help)') me.setNickname('Chips (-help)');

      if (me.roles.has("252534386300289024")) {
        me.removeRole("252534386300289024");
        console.log("Removed role");
      }

      if (!me.roles.has("297592116354482186")) {
        me.addRole("297592116354482186");
        console.log("Added role");
      }
      if (!me.roles.has("297634979704340481"))
      me.addRole("297634979704340481");

    } catch(err) { _.noop(); } //console.log("Couldn't set nickname or unmute");}
  }*/
  if (message.author.bot) return;

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC) {
    console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.author.userName + "] message content: " + message.content));
  }

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const c = message.channel;
  CommandHandler(message, prefix);
});

let submStep = {id0: "-1"};
const step1 = {id0: "1"};

async function isntMe(react){
  return react.me;
}

client.on("messageReactionAdd", (react, user) => {
  if(user.id==client.user.id)return;
  console.log("Reaction detected");
  if (react.message.channel.type != 'dm') {
    console.console.log("Not in DM");
    return;
  }
  console.log("DM channel emoji: " + react.emoji);
  react.message.channel.sendMessage(`The emoji used is ${react.emoji}`);

  console.log(user.id);
  user.sendMessage(`The emoji used is ${react.emoji}`);
  console.log(`The emoji used is ${react.emoji}`);
  if(react.emoji.toString()=="one"){react.message.channel.sendMessage("Hi");}
});

client.login(process.env.TOKEN);
