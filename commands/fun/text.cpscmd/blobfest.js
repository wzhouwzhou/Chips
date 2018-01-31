const a = require('nodecpp-test').arrays;

const blobparty = () => [...new Array(6)].map(() => [...new Array(9)].map(() => a.sample(blobs)).join('')).join('\n');

const mul = 10, sp = 2;
const blobs = [...`<a:b1:408050388911128576> <a:b2:408050487804297236> <a:b3:408050510906654720> <a:b4:408050547191447582>
<a:b5:408050575524233238> <a:b6:408050591567183883> <a:b7:408050615135240194> <a:b8:408050638552039424>`.repeat(mul).split(/\s+/),
...[...new Array(sp * mul)].map(() => '\u200B \t '), '<a:loading:393852367751086090>'];

module.exports = {
  name: 'blobfest',
  func(msg, { send }) {
    return send(blobparty());
  },
};
