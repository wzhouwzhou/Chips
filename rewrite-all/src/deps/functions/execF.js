'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = ({ child_process }) => (a,o) => new Promise( (rs,rj) =>
      child_process.exec(a, Object.assign({}, {timeout: 30000}, o), (e, ou, er) =>
        e?rj({ou, er}):rs(ou)
      )
    )
;
