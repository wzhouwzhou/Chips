const _ = require('lodash');

const killerMan = [
  [
    "{{first}} shoves a double barreled shotgun into {{second}}'s mouth and squeezes the trigger of the gun,",
    "causing {{second}}'s head to horrifically explode like a ripe pimple, splattering the young person's brain",
    'matter, gore, and bone fragments all over the walls and painting it a crimson red.'].join(' '),
  [
    'Screaming in sheer terror and agony, {{second}} is horrifically dragged into the darkness by unseen forces,',
    'leaving nothing but bloody fingernails and a trail of scratch marks in the ground from which the young person',
    'had attempted to halt the dragging process.'].join(' '),

  '{{first}} takes a machette and starts hacking away at {{second}}, chopping {{second}} into dozens of pieces.',

  `{{first}} pours acid over {{second}}. *"Well well well, don't you look pretty right now?`,

  [
    "{{second}} screams in terror as a giant creature with huge muscular arms grabs {{second}}'s head;",
    "{{second}}'s screams of terror are cut off as the creature tears off the head with a sickening crunching sound.",
    "{{second}}'s spinal cord, which is still attached to the dismembered head, is used by the creature as a makeshift",
    "sword to slice a perfect asymmetrical line down {{second}}'s body, causing organs to spill out as the two halves",
    'fall to their respective sides.'].join(' '),
  [
    "{{first}} grabs {{second}}'s head and tears it off with superhuman speed and efficiency.",
    "Using {{second}}'s head as a makeshift basketball, {{first}} expertly slam dunks it into the basketball hoop,",
    'much to the applause of the audience watching the gruesome scene.'].join(' '),

  [
    '{{first}} uses a shiv to horrifically stab {{second}} multiple times in the chest and throat,',
    'causing {{second}} to gurgle up blood as the young person horrifically dies.'].join(' '),

  [
    '{{second}} screams as Pyramid Head lifts Sarcen up using his superhuman strength.',
    'Before {{second}} can even utter a scream of terror, Pyramid Head uses his superhuman',
    'strength to horrifically tear {{second}} into two halves; {{second}} stares at the monstrosity',
    'in shock and disbelief as {{second}} gurgles up blood, the upper body organs spilling out of the',
    'dismembered torso, before the eyes roll backward into the skull.'].join(' '),

  [
    '{{second}} steps on a land mine and is horrifically blown to multiple pieces as the device explodes,',
    "the {{second}}'s entrails and body parts flying up and splattering all around as if someone had thrown",
    'a watermelon onto the ground from the top of a multiple story building.'].join(' '),

  [
    '{{second}} is killed instantly as the top half of his head is blown off by a Red Army sniper armed with a',
    "Mosin Nagant, {{second}}'s brains splatter everywhere in a horrific fashion"].join(' '),
];

module.exports = {
  name: 'kill',
  func(msg, { send, author, args, guild }) {
    if (!guild) return send('This command can only be used in a server');

    if (!args) return msg.reply('Please mention someone to kill!');

    const first = author + [];
    let second = msg.mentions.members.first();
    if (!second) return msg.reply('Please mention a user to murder!');
    second += [];
    const comment = _.sample(killerMan);
    return send(comment
      .replace(new RegExp(_.escapeRegExp('{{first}}'), 'gi'), first)
      .replace(new RegExp(_.escapeRegExp('{{second}}'), 'gi'), second)
    );
  },
};
