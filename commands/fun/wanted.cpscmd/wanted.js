const JR = require('util').promisify(require('jimp').read); 
const [a_, b_, c_, d_, e_, f_] = [612, 860, 348, 132, 272, 2048];

const mm = (await JR('https://imgur.com/a/696eq')).resize(a_, b_); 

module.exports = {
  name: 'wanted',
  async func(msg, { member, send, client }) {
    const ava = (await JR((msg.mentions.users.first() || author).displayAvatarURL({ format: 'jpg', size: f_ }))).resize(c_, c_);  
    const photo = await mm.clone().blit(ava, d_, e_); 
    const f = `${author.id}|${channel.id}.${Date.now()}.wanted.png`;
    return new Promise(r => photo.write(f,
      () => r(send(new Discord.MessageEmbed()
        .attachFiles([f])
        .setImage('attachment://'+f)
        .setTitle('Wanted')
        .setColor(member ? member.displayColor : 1349842)
        ).then(()=>fs.unlinkSync(f)))
      ));
  },
};