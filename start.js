Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');

const SHARDCOUNT = 2;

const Discord = require("discord.js");
let nodefile=["./chips.js"];
//setup + start
require("./setup/AppSetup")(); //website start
const colors = require("chalk");

const changeConsole_1 = require("./setup/logging/changeConsole");
changeConsole_1.default(true);
let Manager;

const start = () => {
  console.log('Master process is running.');
  Manager = new Discord.ShardingManager(nodefile[0], {
    totalShards: SHARDCOUNT,
  });
  Manager.spawn(SHARDCOUNT, 11000).then((shards) => {
    exports.shards=shards;
    console.log("Spawned", colors.cyan(shards.size.toString()), "shards!");
  });
};
exports.start = start;
start();

const app = express();
const router = express.Router();
const port = 2469;

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.use('/api/guildcount', (req,res) => {
  Manager.broadcastEval(`this.guilds.size`).then(results=>
    res.send(JSON.stringify({count: results.reduce((p,v) => p+v, 0)}))
  ).catch(err=>{
    console.error(err);
    return res.send(JSON.stringify({error: err}));
  });
});

router.use('/api/membercount', (req,res) => {
  Manager.broadcastEval(`let m = 0; this.guilds.forEach(g=>m+=g.members.size); m`)
  .then(results =>
    res.send(JSON.stringify({count: results.reduce((p,v) => p+v, 0)}))
  ).catch(err=>{
    console.error(err);
    return res.send(JSON.stringify({error: err}));
  });
});

router.use('/api/inGuild', (req, res) => {
  if (!req.headers.guildid) return res.send(JSON.stringify({error: 'guildid missing from header'}));
  Manager.broadcastEval(`this.guilds.has("${req.headers.guildid}")`).then(results => {
    if (~results.indexOf(true))
      return res.send(JSON.stringify({in: true}));
    else
      return res.send(JSON.stringify({in: false}));
  }).catch(err=>{
    console.error(err);
    return res.send(JSON.stringify({error: err}));
  });
});

app.use("/", router);
app.listen(port, () => {
  console.log("2469 api listening on port " + port);
});

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const stdProxy = httpProxy.createProxyServer();

const apiRedirect = express();
const apiOpen = express.Router();

const stdRedirect = express();
const stdOpen = express.Router();

const apiPort = 8880;
const stdPort = 80;

apiOpen.get('*',function(req,res){
  apiProxy.web(req, res, {target: 'http://localhost:2469'});
  console.log('Redirected from 8880 to 2469');
  //res.redirect('http://chipsbot.tk:2469'+req.url);
});

stdOpen.get('/api', function(req,res){
  console.log('Redirecting api from 80 to 8880');
  stdProxy.web(req, res, {target: 'http://localhost:8880'});
});

stdOpen.get('/', function(req,res){
  console.log('Redirecting / from 80 to 8080');
  stdProxy.web(req,res, {target: 'http://localhost:8080'});
});

apiRedirect.use('/', apiOpen);
apiRedirect.listen(apiPort, () => {
  console.log('api proxy listening on port' + apiPort);
});

stdRedirect.use('/', stdOpen);
stdRedirect.listen(stdPort, () => {
  console.log('std proxy listening on port' + stdPort);
});
