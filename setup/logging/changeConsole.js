Object.defineProperty(exports, '__esModule', { value: true });
const colors = require('chalk');
const moment = require('moment');
function editConsole(isMng, shardIDObj) {
    console.oldLog = console.log;
    let time = colors.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] | `);
    console.log = function () {
        const args = Array.from(arguments);
        args.unshift(colors.bgYellow.bold(isMng ? `[MNG]` : `[S${shardIDObj.id == null ? '?' : shardIDObj.id}]`) + ' ');
        return console.oldLog.apply({}, [time, ...args]);
    };
    console.oldError = console.error;
    console.error = function () {
        const args = Array.from(arguments);
        args.unshift(colors.bgYellow.bold(isMng ? `[MNG]` : `[S${shardIDObj.id == null ? '?' : shardIDObj.id}]`) + ' ');
        return console.oldError.apply({},[time, ...args]);
    };
    colors.enabled = true;
}
exports.default = editConsole;
