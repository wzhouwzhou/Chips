const UPGRADEPTS = 33;
const PATHS = 8;
let smasher = [0,1,2,7];

module.exports = {
  name: "randombuild",
  async func(msg, { reply, content }) {
    let build = new Array(PATHS).fill(0);

    for(let i = 0; i < UPGRADEPTS; i++)
      (~content.toLowerCase().indexOf('smasher')&&(!(~content.toLowerCase().indexOf('auto'))))?build[_.sample(smasher)]++:build[_.random(0,build.length)]++;

    return reply(build.join('/'));
  }
};
