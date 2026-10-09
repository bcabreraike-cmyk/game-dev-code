"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpCommand = void 0;
const commander_1 = require("commander");
exports.helpCommand = new commander_1.Command('help')
    .alias('h')
    .description('display help for command')
    .action(() => {
});
//# sourceMappingURL=help.js.map