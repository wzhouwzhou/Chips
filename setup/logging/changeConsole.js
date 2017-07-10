Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("chalk");
function editConsole(isMng, shardIDObj) {
    console.oldLog = console.log;
    console.log = function () {
        const args = Array.from(arguments);
        args.unshift(colors.bgYellow.bold(isMng ? `[MNG]` : `[S${shardIDObj.id == null ? "?" : shardIDObj.id}]`) + " ");
        return console.oldLog.apply({}, args);
    };
    console.oldError = console.error;
    console.error = function () {
        const args = Array.from(arguments);
        args.unshift(colors.bgYellow.bold(isMng ? `[MNG]` : `[S${shardIDObj.id == null ? "?" : shardIDObj.id}]`) + " ");
        return console.oldError.apply({}, args);
    };
    colors.enabled = true;
}
exports.default = editConsole;
