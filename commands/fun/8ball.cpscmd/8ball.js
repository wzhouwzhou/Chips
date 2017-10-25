const args1 = [
  "-_-",
  "Go away.",
  "Give up.",
  "Stop hoping."
];

const args2 = [
    "What?",
    "Did you say something?",
    "Uhm..",
    "Yes? No?",
    "I don't know."
];

const args3 = [
    "Yes!",
    "Sure.",
    "Never.",
    "Why don't you?",
    "Are you sure about that?",
    "Not even think about it..",
    "Rethink.",
    "Error 404: Ask again."
];    

module.exports = {
  name: "8ball",
  async func(msg, { send, args }) {
    
    if (!args[0])
      return send('Do you have a question?');
    
    if (args[0])
      return send(args1[~~(args1.length*Math.random())]);

    if (args[1])
      return send(args2[~~(args2.length*Math.random())]);

    if (args[2])
      return send(args3[~~(args3.length*Math.random())]);


  }
};
