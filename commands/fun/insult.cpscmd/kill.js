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

  `{{first}} pours acid over {{second}}. *"Well well well, don't you look pretty right now?"*`,

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
    "[@dead person] steps on a land mine and is horrifically blown to multiple pieces as the device explodes,",
    "[@dead person]'s entrails and body parts flying up and splattering all around was as if someone had thrown a",
    "watermelon onto the ground from the top of a multiple story building."].join(' '),

  [
    '{{second}} is killed instantly as the top half of his head is blown off by a rogue sniper armed with a',
    "bolt action rifle, {{second}}'s brains splatter everywhere in a horrific fashion"].join(' '),

  // Next 6 by 聖なる人#0663
  [
    '{{first}} made {{second}} love {{first}} by stalking him/her for a long time to find out what {{second}} likes.',
    'A month later {{first}} is breaking up with {{second}} and broke their heart.',
    'Back at home {{second}} cut themselves to death.'].join(' '),

  [
    '{{first}} invited {{second}} to join in for a sightseeing-tour in Japan.',
    "At the end of the trip, watching the sunset from the tokyo-skytree, {{first}} grabs {{second}}'s feet and",
    'throws them over the railing.'].join(' '),

  [
    "{{first}} grabs a candy cane and uses {{second}}'s confusion to grab the knife hidden in the cane.",
    "as {{first}} is slowly cutting {{second}}'s stomach open and filling it with all kinds of chocolate-santas",
    'that once were chocolate easter bunnys, {{second}} is screaming in pain trying to stop {{first}},',
    'but is unable to move properly due to the pain.'].join(' '),

  [
    '{{second}} wakes up bound to a chair, not able to move and the mouth kept open by some sort of device.',
    'soon {{second}} noticed that he/she got captured by {{first}}.',
    "{{first}} is slowly coming closer and starts pouring something in {{second}} 's mouth.",
    "{{second}} is feeling an awful strong pain running through his/her body as he/she's",
    'able to see how the skin is turning black from the toes slowly up to the head.',
    "That's where everything got black... and never came back."].join(' '),

  [
    'Not knowing where they are or what they did, {{second}} finds themselves locked in a room with some sort of gun',
    `on the ground. there's a note on the gun: "interdimensional gun. your only chance to escape is what I already put`,
    `in as location. You won't be able to see through it so just try to stick your head in there.   ~{{first}}"`,
    '{{second}} takes the gun and shoots at a wall. A green sort of portal opens up but nothing can be seen on the',
    'other side. {{second}} takes a deep breath and jumps into the portal, leaving the gun behind.',
    '"blender dimension" is written on the back of the note.'].join(' '),

  [
    '[@dead person] was visiting an old pizzeria with [@killer].',
    'After eating some pizza that actually tasted pretty good,',
    '[@dead person] wanted to take a look at the things on the stage.',
    "But as soon as [@dead person] came close to them, one of them suddenly started to run in [@deadperson]'s direction.",
    'It looked like a pure red fox with a hook, but, in the moment,',
    '[@dead person] noticed that their head was already inside the mouth of the fox as it got tighter and tighter.'].join(' '),
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
      .replace(new RegExp(_.escapeRegExp('[@dead person]'), 'gi'), first)
      .replace(new RegExp(_.escapeRegExp('[@killer]'), 'gi'), second)
    );
  },
};
