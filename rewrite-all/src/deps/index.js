'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const rrequire = (m) => {
  delete require.cache[require.resolve(m)];
  return require(m);
};
exports.rrequire = rrequire;

const Discord = rrequire('discord.js');
exports.Discord = Discord;
exports.djs = Discord;

const fs = rrequire('fs');
exports.fs = fs;

const _ = rrequire('lodash');
exports._ = _;
exports.lodash = _;

const path = rrequire('path');
exports.path = path;

const bodyParser = rrequire('body-parser');
exports.bodyParser = bodyParser;

const cookieParser = rrequire('cookie-parser');
exports.cookieParser = cookieParser;

const express = rrequire('express');
exports.express = express;

const session = rrequire('express-session');
exports.session = session;

const flash = rrequire("connect-flash");
exports.flash = flash;

const morgan = rrequire('morgan');
exports.morgan = morgan;

const rfs = rrequire('rotating-file-stream');
exports.rfs = rfs;
exports.rotating_file_stream = rfs;
