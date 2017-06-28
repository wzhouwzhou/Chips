const UPGRADEPTS = 33;
const PATHS = 8;
let smasher = [0,1,2,7];
let MAX1=8;
let MAX2=10;
module.exports = {
  name: "randombuild",
  async func(msg, { reply, content }) {
    let build = new Array(PATHS).fill(0);
    let smasher = content.toLowerCase().indexOf('smasher')>-1;
    let auto = content.toLowerCase().indexOf('auto')>-1;
    for(let i = 0; i < UPGRADEPTS; i++){
      let ind = (smasher&&!auto)?_.sample(smasher):_.random(0,build.length-1);
      if(smasher&&build[ind]>=MAX2||!smasher&&build[ind]>=MAX1) --i;
      else ++build[ind];
    }

    return reply(build.join('/'));
  }
};
