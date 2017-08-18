Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const pmx = require('pmx').init({
  network       : true,
  ports         : true,
});
const startprobe = pmx.probe();

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
    res.json({count: results.reduce((p,v) => p+v, 0)})
  ).catch(err=>{
    console.error(err);
    return res.json({error: err});
  });
});

router.use('/api/membercount', (req,res) => {
  Manager.broadcastEval(`let m = 0; this.guilds.forEach(g=>m+=g.members.size); m`)
  .then(results =>
    res.json({count: results.reduce((p,v) => p+v, 0)})
  ).catch(err=>{
    console.error(err);
    return res.json({error: err});
  });
});

const usercount = startprobe.metric({
  name    : 'Total Users',
});
setInterval( async ()=> {
  usercount.set((await Manager.broadcastEval(`let m = 0; this.guilds.forEach(g=>m+=g.members.size); m`)).reduce((p,v)=>p+v,0));
}, 5000);

const histogram = startprobe.histogram({
  name        : 'cpuavg',
  measurement : 'mean'
});

let latency = 0;

setInterval(async()=> {
  latency = (await Manager.broadcastEval(`Math.ceil(require('os').loadavg()[1] * 1000) / 100`)).reduce((p,v)=>p+v,0);
  histogram.update(latency);
}, 2000);

const memused = startprobe.metric({
  name: 'internalMUsed',
});
setInterval(async()=> {
  memused.set (await Manager.broadcastEval(`process.memoryUsage().heapUsed / 1024 / 1024`)).reduce((p,v)=>p+v,0);
}, 750);

const memallo = startprobe.metric({
  name: 'internalMAllo',
});
setInterval(async()=> {
  memallo.set (await Manager.broadcastEval(`process.memoryUsage().heapTotal / 1024 / 1024`)).reduce((p,v)=>p+v,0);
}, 750);

router.use('/api/inGuild', (req, res) => {
  if (!req.headers.guildid) return res.json({error: 'guildid missing from header'});
  Manager.broadcastEval(`this.guilds.has("${req.headers.guildid}")`).then(results => {
    if (~results.indexOf(true))
      return res.json({in: true});
    else
      return res.json({in: false});
  }).catch(err=>{
    console.error(err);
    return res.json({error: err});
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
/*stdRedirect.listen(stdPort, () => {
  console.log('std proxy listening on port' + stdPort);
});
*/
