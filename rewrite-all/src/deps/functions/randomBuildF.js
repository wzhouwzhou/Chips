'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = ({ _ }) => {
  const UPGRADEPTS = 33,
    PATHS1 = 8, PATHS2 = [0, 1, 2, 7],
    MAX1 = 7, MAX2 = 10;
  const SMASHERTYPES = ['smasher', 'spike', 'landmine'];
  const smasherR = new RegExp(`^[^]*(${SMASHERTYPES.map(e => _ ? _.escapeRegExp(e) : e).join('|')})[^]*$`),
    autoR = /^[^]*(auto)[^]*$/;

  const randomBuild = (pts = UPGRADEPTS, tanktype = 'basic') => {
    let build = new Array(PATHS1).fill(0);
    let isSmasher = smasherR.test(tanktype);

    for (let i = 0; i < pts; i++) {
      let ind = isSmasher && !autoR.test(tanktype) ? _.sample(PATHS2) : _.random(0, build.length - 1);
      if ((isSmasher && build[ind] >= MAX2) || (!isSmasher && build[ind] >= MAX1)) --i;
      else build[ind]++;
    }
    return build;
  };
  return randomBuild;
};
