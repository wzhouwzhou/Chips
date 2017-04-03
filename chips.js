const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

//route loading
const index = require("./routes/index");

app.engine("html", require("express-ejs-extend"));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//routes
app.use('/', index);

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
  request("http://chipsbot.herokuapp.com/", _=>_);
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

let sequelize = new Sequelize('botdata', null , null , {
  dialect: 'sqlite',
  host: "localhost",
  storage: "botdata.sqlite",
  logging(query) {
    fs.appendFile("sqlLog.log", "\n[SQL] " + query, (err)=>{
        if (err) return console.error("[SQL] Error at logging query: " + err);
    });
  },
  sync: { force: true },
} );

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

client.on("ready", _ => {
  if (client.channels.get("296414980679532544") == null) console.error("ERRR");
  console.log('Chips is ready!');
  client.user.setStatus("online");
  client.user.setGame("Do -help");
});

const stdin = process.openStdin();
client.on("debug", console.log);
let d = "";

let monitorMode = false;

let testC;
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
  ":Thonkang:": "<:Thonkang:279512732892659713>"
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

client.on("message", message => {
  if (!message.guild) return;
  if (message.guild.id === "252525368865456130") {
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
  }
  if (message.author.bot) return;

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC) {
    console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.member.displayName + "] Msg content: " + message.content));
  }

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const c = message.channel;
  CommandHandler(message, prefix);
});
client.login(process.env.TOKEN);
