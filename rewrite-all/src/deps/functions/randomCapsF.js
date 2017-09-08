'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = () => s =>
  s.replace(/[a-z]/gi, e=> !~~(2*Math.random()) ? e.toLowerCase() : e.toUpperCase())
;
