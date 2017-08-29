'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = ({ child_process }) => {
  const exec = (a,o) => {
    return new Promise( (rs,rj) => {
      child_process.exec(a, Object.assign({}, {timeout: 30000}, o), (e, ou, er) => {
        if(e) return rj({ou, er});
        rs(ou);
      });
    });
  };
  return exec;
};
