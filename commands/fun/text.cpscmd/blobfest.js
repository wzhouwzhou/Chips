const a = require('nodecpp-test').arrays;

module.exports = {
  name: 'blobfest',
  func(msg, { send, suffix }) {
    return send(blobparty());
  },
};

const blobparty = () => {
  const rows = new Array();
  for(let i = 0; i < 6; i++) rows.push([new Array(9)].map(e => a.sample(blobs)).join'');
  return rows.join'\n';
};

const blobs = `<a:b1:408050388911128576> <a:b2:408050487804297236> <a:b3:408050510906654720> <a:b4:408050547191447582>
<a:b5:408050575524233238> <a:b6:408050591567183883> <a:b7:408050615135240194> <a:b8:408050638552039424>`.split(/\s+/)
