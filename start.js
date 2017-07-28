Object.defineProperty(exports, "__esModule", { value: true });
const SHARDCOUNT = 2;

const Discord = require("discord.js");
let nodefile=["./chips.js"];
//setup + start
require("./setup/AppSetup")(); //website start
const colors = require("chalk");

const changeConsole_1 = require("./setup/logging/changeConsole");
changeConsole_1.default(true);

function start() {
  console.log('Master process is running.');
  const Manager = new Discord.ShardingManager(nodefile[0], {
    totalShards: SHARDCOUNT,
  });
  Manager.spawn(SHARDCOUNT, 11000).then((shards) => {
    module.exports.shards=shards;
    console.log("Spawned", colors.cyan(shards.size.toString()), "shards!");
  });
}
start();
