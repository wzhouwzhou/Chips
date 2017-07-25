const download = require("url-download");
const fs = require("fs");
const jsonfile = require("jsonfile");
const file = "servers.json";
let info = [];
exports.getServers = function() {
  download('http://lb.diep.io/v2/find_servers', './', {outputName:'servers.txt'})
    .on('done', function () {
    let data = fs.readFileSync('servers.txt', 'utf8');
    let servers = data.match(/[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\:[0-9]*\W[a-z]*\W[a-z]*\:[a-z0-9]*\:/gim);
    if(!fs.existsSync("./"+file)){
      servers.forEach(function(element) {
        let server = element.replace("\u0000"," ");
        let ip = server.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gi)[0];
        const port = '443';
        server = server.match(/([a-z]{1,})\-([a-z]{1,})\:([a-z0-9]{1,})/gi)[0];
        let host = server.match(/[a-z0-9]{1,}/gi)[0];
        let location = server.match(/[a-z0-9]{1,}/gi)[1];
        let gamemode = server.match(/[a-z0-9]{1,}/gi)[2];
        info.push({"ip":ip,"port":port,"host":host,"gamemode":gamemode,"location":location});
      });
      jsonfile.writeFileSync(file, info, {spaces:2});
    }
    if(fs.existsSync("./"+file)){
      info = jsonfile.readFileSync(file);
      servers.forEach(function(element) {
        let server = element.replace("\u0000"," ");
        let ip = server.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gi)[0];
        const port = '443';
        server = server.match(/([a-z]{1,})\-([a-z]{1,})\:([a-z0-9]{1,})/gi)[0];
        let host = server.match(/[a-z0-9]{1,}/gi)[0];
        let location = server.match(/[a-z0-9]{1,}/gi)[1];
        let gamemode = server.match(/[a-z0-9]{1,}/gi)[2];
        if(info.indexOf({"ip":ip,"port":port,"host":host,"gamemode":gamemode,"location":location})!==-1)
          info.push({"ip":ip,"port":port,"host":host,"gamemode":gamemode,"location":location});
      });
      jsonfile.writeFileSync(file, info, {spaces:2});
    }
    fs.unlinkSync("./servers.txt");
    })
  .on('invalid', function (e) {
      console.log(e.url + 'Unable to fetch server list.');
    flag = true;
    });
};

exports.getInfo = function(partylink) {
  let code = partylink.toUpperCase().match(/\b[a-f0-9]{10,}/gi)&&partylink.toUpperCase().match(/\b[a-f0-9]{10,}/gi)[0];
  if(code==null)return;
  let ip = getIP(code.substring(0,code.indexOf("BB30")));
  const port = '443';
  exports.getServers();
  var servers = jsonfile.readFileSync(file);
  servers.forEach(function(element) {
    if(element.ip === ip)
    {
      info = {"link":"http://diep.io/#"+code,"code":code,"ip":ip,"port":port,"host":element.host,"gamemode":element.gamemode,"location":element.location};
    }
    });
  return info;
};

function getIP(iptext){
  let IPhex = iptext.match(/[a-z0-9]{1,2}/giy);
  let address = "";
  IPhex.forEach(function(element) {
    address+=" "+parseInt(reverseString(element),16);
  });
  return address.trim().replace(/\ /gi,'.');
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
