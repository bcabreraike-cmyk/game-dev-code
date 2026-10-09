"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextCommand = void 0;
const commander_1 = require("commander");
exports.contextCommand = new commander_1.Command('context')
    .description('Command for context')
    .action(async () => {
    console.log(`The context command is not yet implemented.`);
});
//# sourceMappingURL=index.js.map