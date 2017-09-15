'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = () => time =>
    time && time.replace(/(0?(\d+)(:\d+:\d+))/, (a, ...e)=> +e[1]<13?`${e[0]} AM`:`${+e[1]-12}${e[2]} PM`)
;
