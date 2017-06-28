const UPGRADEPTS = 33;
const PATHS = 8;
const PATHS2 = [0,1,2,7];
const MAX1=8;
const MAX2=10;
const SMASHERTYPES = ['smasher','spike','landmine'];

module.exports = {
  name: "randombuild",
  async func(msg, { reply, args }) {
    const joinedcontent = args.join('');
    let build = new Array(PATHS).fill(0);
    let smasher = SMASHERTYPES.some(type=>joinedcontent.toLowerCase().indexOf(type) >= 0);
    for(let i = 0; i < UPGRADEPTS; i++){
      let ind = (smasher&&joinedcontent.toLowerCase().indexOf('auto')<0)?_.sample(PATHS2):_.random(0,build.length-1);
      if((smasher&&build[ind]>=MAX2)||((!smasher)&&build[ind]>=MAX1)) --i;
      else build[ind]++;
    }
    return reply(build.join('/'));
  }
};
